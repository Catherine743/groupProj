import { useDispatch, useSelector } from "react-redux";
import { addSale } from "../redux/slice/stockSlice";
import { useState } from "react";

export default function AddSale() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.stockReducer.products);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const selectedProduct = products.find(
    p => p.id === Number(productId)
  );

  const totalAmount =
    selectedProduct && quantity
      ? selectedProduct.price * Number(quantity)
      : 0;

  const handleSale = () => {
    if (!productId || !quantity) {
      setMessage("⚠ Please select product and enter quantity");
      return;
    }

    if (Number(quantity) > selectedProduct.stock) {
      setMessage("❌ Not enough stock available");
      return;
    }

    dispatch(
      addSale({
        productId: Number(productId),
        quantity: Number(quantity),
        totalAmount: totalAmount,
        date: new Date().toISOString()
      })
    );

    setMessage("✅ Sale recorded successfully!");
    setQuantity("");
    setProductId("");
  };

  return (
    <div className="card">
      <h3>🛒 Record Sale</h3>

      <select
        value={productId}
        onChange={e => {
          setProductId(e.target.value);
          setMessage("");
        }}
      >
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <p>
          Available Stock: {selectedProduct.stock} <br />
          Price: ₹{selectedProduct.price}
        </p>
      )}

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      {quantity && selectedProduct && (
        <p>Total Amount: ₹{totalAmount}</p>
      )}

      <button onClick={handleSale}>Sell</button>

      {message && <p>{message}</p>}
    </div>
  );
}