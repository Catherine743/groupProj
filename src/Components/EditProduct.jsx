import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../redux/slice/stockSlice";
import { useState } from "react";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.stockReducer.products.find(
      (item) => item.id === Number(id)
    )
  );

  const [stock, setStock] = useState(product.stock);

  const handleUpdate = () => {

    dispatch(
      updateProduct({
        id: product.id,
        stock: Number(stock)
      })
    );

    alert("✅ Stock Updated Successfully");

    navigate("/");
  };

  return (
    <div className="card">

      <h2>Edit Product</h2>

      <label>Product Name</label>
      <input value={product.name} disabled />

      <label>Category</label>
      <input value={product.category} disabled />

      <label>Price</label>
      <input value={product.price}/>

      <label>Update Stock</label>
      <input
        type="number"
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
      />

      <button onClick={handleUpdate}>Update Stock</button>

    </div>
  );
}

export default EditProduct;