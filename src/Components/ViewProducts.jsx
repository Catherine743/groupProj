import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ViewProducts() {
    const { products, threshold } = useSelector(
        (state) => state.stockReducer
    );
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Products</h2>

            <input
                placeholder="Search product..."
                onChange={(e) => setFilter(e.target.value)}
            />

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Sold</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                {product.stock}
                                {product.stock <= threshold && (
                                    <span style={{ color: "red" }}> (Low Stock!)</span>
                                )}
                            </td>
                            <td>{product.sold}</td>
                            <td>
                                <button onClick={() => navigate("/addsale")}>
                                    Sell
                                </button>
                                <button onClick={() => navigate(`/edit/${product.id}`)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProducts;