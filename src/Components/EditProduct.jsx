import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../redux/slice/stockSlice";
import { useState } from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.stockReducer.products.find((item) => item.id === Number(id))
  );

  const [minPrice, setMinPrice] = useState(product.minPrice);
  const [maxPrice, setMaxPrice] = useState(product.maxPrice);
  const [stock, setStock] = useState(product.stock);

  const handleUpdate = () => {
    dispatch(
      updateProduct({
        id: product.id,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        stock: Number(stock)
      })
    );
    navigate("/products");
  };

  return (
    <div className="card">
      <h2>Edit Product</h2>

      <label>Product Name</label>
      <input value={product.name} disabled />

      <label>Min Price</label>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <label>Max Price</label>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <label>Update Stock</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button onClick={handleUpdate}>Update Product</button>
    </div>
  );
}

export default EditProduct;