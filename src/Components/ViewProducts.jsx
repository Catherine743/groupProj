import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/slice/stockSlice";

function ViewProducts() {
    const { products, threshold } = useSelector(
        (state) => state.stockReducer
    );
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const dispatch = useDispatch();

    const filteredProducts = products.filter(product => {
        const pMin = product.minPrice;
        const pMax = product.maxPrice;
        const fMin = minPrice ? parseInt(minPrice) : 0;
        const fMax = maxPrice ? parseInt(maxPrice) : Infinity;

        // Only include products that **overlap** with the filter range
        const isOverlap = pMax >= fMin && pMin <= fMax;

        // Apply search filter
        const matchesSearch = product.name.toLowerCase().includes(filter.toLowerCase());

        return isOverlap && matchesSearch;
    });

    return (
        <div className="container mt-4">
            <h2>Products</h2>

            <input
                placeholder="Search product..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price Range</th>
                        <th>Stock</th>
                        <th>Sold</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>
                                ₹{product.minPrice} - ₹{product.maxPrice}
                            </td>
                            <td>
                                {product.stock}
                                {product.stock <= threshold && (
                                    <span style={{ color: "red" }}> (Low Stock!)</span>
                                )}
                            </td>
                            <td>{product.sold}</td>
                            <td>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() =>
                                            navigate("/addsale", { state: { productId: product.id } })
                                        }
                                    >
                                        Sell
                                    </button>

                                    <button
                                        onClick={() => navigate(`/edit/${product.id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => dispatch(deleteProduct(product.id))}
                                    >
                                        Delete
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProducts;