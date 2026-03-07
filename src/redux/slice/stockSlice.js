import { createSlice } from "@reduxjs/toolkit";

const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
const storedSales = JSON.parse(localStorage.getItem("sales")) || [];

const initialState = {
  products: storedProducts,
  sales: storedSales,
  threshold: 5,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ ...action.payload, sold: 0 });
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    addSale: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product && product.stock >= quantity) {
        product.stock -= quantity;
        product.sold += quantity;

        const avgPrice = (product.minPrice + product.maxPrice) / 2;
        const totalAmount = quantity * avgPrice;

        state.sales.push({
          id: Date.now(),
          productId,
          quantity,
          totalAmount,
          date: new Date().toISOString(),
        });

        localStorage.setItem("products", JSON.stringify(state.products));
        localStorage.setItem("sales", JSON.stringify(state.sales));
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    clearAll: (state) => {
      state.products = [];
      state.sales = [];
      localStorage.removeItem("products");
      localStorage.removeItem("sales");
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    }
  },
});

export const { addProduct, updateProduct, addSale, deleteProduct, setProducts, clearAll } = stockSlice.actions;

export default stockSlice.reducer;