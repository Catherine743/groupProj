import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../redux/slice/stockSlice";
import { useState } from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector(state =>
    state.stockReducer.products.find(item => item.id === Number(id))
  );

  // Early return if product not found
  if (!product) return <p>Product not found</p>;

  // Initialize state after ensuring product exists
  const [form, setForm] = useState({
    name: product.name,
    minPrice: product.minPrice,
    maxPrice: product.maxPrice,
    stock: product.stock,
  });

  // Generic handler for input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    dispatch(updateProduct({
      id: product.id,
      name: form.name,
      minPrice: Number(form.minPrice),
      maxPrice: Number(form.maxPrice),
      stock: Number(form.stock),
    }));
    navigate("/products");
  };

  return (
    <div className="card">
      <h2>Edit Product</h2>

      <label>Product Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <label>Min Price</label>
      <input
        type="number"
        name="minPrice"
        value={form.minPrice}
        onChange={handleChange}
      />

      <label>Max Price</label>
      <input
        type="number"
        name="maxPrice"
        value={form.maxPrice}
        onChange={handleChange}
      />

      <label>Stock</label>
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
      />

      <button onClick={handleUpdate}>Update Product</button>
    </div>
  );
}

export default EditProduct;