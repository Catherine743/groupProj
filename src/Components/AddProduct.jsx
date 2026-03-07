import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slice/stockSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const min = Number(minPrice);
    const max = Number(maxPrice);
    const stk = Number(stock);

    if (!trimmedName || !minPrice || !maxPrice || !stock) {
      alert("⚠ Please fill all fields");
      return;
    }

    if (min > max) {
      alert("⚠ Max Price must be greater than or equal to Min Price");
      return;
    }

    if (stk < 0) {
      alert("⚠ Stock cannot be negative");
      return;
    }

    dispatch(
      addProduct({
        id: Date.now(),
        name: trimmedName,
        minPrice: min,
        maxPrice: max,
        stock: stk,
        sold: 0,
      })
    );

    navigate("/products");
  };

  const InputField = ({ placeholder, value, onChange, type = "text" }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );

  return (
    <div className="card">
      <h3>Add Product</h3>

      <InputField placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
      <InputField type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      <InputField type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      <InputField type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}