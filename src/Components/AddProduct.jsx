import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slice/stockSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = () => {

    if (!name || !price || !stock ) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addProduct({
        id: Date.now(),
        name,
        price: Number(price),
        stock: Number(stock),
      })
    );

    alert("Product Added Successfully");

    navigate("/");
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
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Product</button>

    </div>
  );
}

export default AddProduct;