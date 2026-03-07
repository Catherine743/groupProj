import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slice/stockSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = () => {

    if (!name || !minPrice || !maxPrice || !stock) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addProduct({
        id: Date.now(),
        name,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        stock: Number(stock),
        sold: 0
      })
    );

    // Navigate to products page
    navigate("/products");
  };

  return (
    <div className="card">

      <h3>Add Product</h3>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e)=>setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e)=>setMaxPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Add Product
      </button>

    </div>
  );
}

export default AddProduct;