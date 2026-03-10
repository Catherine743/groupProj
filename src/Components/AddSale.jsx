import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addSale } from "../redux/slice/stockSlice";

export default function AddSale() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.stockReducer.products);
  const navigate = useNavigate();
  const location = useLocation();

  const passedProductId = location.state?.productId || "";
  const [productId, setProductId] = useState(passedProductId);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === Number(productId)),
    [productId, products]
  );

  const totalAmount = useMemo(() => 
    (price && quantity ? Number(price) * Number(quantity) : 0),
    [price, quantity]
  );

  const handleSale = () => {
    if (!productId || !quantity || !price) {
      setMessage("⚠ Please fill all fields");
      return;
    }
    if (!selectedProduct) {
      setMessage("Product not found");
      return;
    }
    const qty = Number(quantity);
    const prc = Number(price);
    if (qty > selectedProduct.stock) {
      setMessage("Not enough stock available");
      return;
    }
    if (prc < selectedProduct.minPrice || prc > selectedProduct.maxPrice) {
      setMessage("Price must be within product's price range");
      return;
    }

    dispatch(
      addSale({
        productId: selectedProduct.id,
        quantity: qty,
        totalAmount,
        date: new Date().toISOString(),
      })
    );

    setMessage("Sale recorded successfully!");
    navigate("/products");
  };

  return (
    <div className="card">
      <h3>🛒 Record Sale</h3>

      {passedProductId ? (
        <p>Product: <strong>{selectedProduct?.name || "Unknown"}</strong></p>
      ) : (
        <select
          value={productId}
          onChange={e => { setProductId(e.target.value); setMessage(""); }}
        >
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      )}

      {selectedProduct && (
        <p>
          Available Stock: {selectedProduct.stock} <br />
          Price Range: ₹{selectedProduct.minPrice} - ₹{selectedProduct.maxPrice}
        </p>
      )}

      <input
        type="number"
        placeholder="Selling Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      {price && quantity && <p>Total Amount: ₹{totalAmount}</p>}

      <button onClick={handleSale}>Sell</button>
      {message && <p>{message}</p>}
    </div>
  );
}