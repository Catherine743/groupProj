import { createSlice } from "@reduxjs/toolkit";

const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
const storedSales = JSON.parse(localStorage.getItem("sales")) || [];

const initialState = {
  products: storedProducts,
  sales: storedSales,
  threshold: 5,
};

// Helper to persist products and sales
const persist = (products, sales) => {
  localStorage.setItem("products", JSON.stringify(products));
  if (sales) localStorage.setItem("sales", JSON.stringify(sales));
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ ...action.payload, sold: 0 });
      persist(state.products);
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index === -1) return;
      state.products[index] = { ...state.products[index], ...action.payload };
      persist(state.products);
    },

    addSale: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (!product || product.stock < quantity) return;

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

      persist(state.products, state.sales);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      persist(state.products);
    },

    clearAll: (state) => {
      state.products = [];
      state.sales = [];
      localStorage.removeItem("products");
      localStorage.removeItem("sales");
    },

    setProducts: (state, action) => {
      state.products = action.payload;
      persist(state.products);
    },
  },
});

export const { addProduct, updateProduct, addSale, deleteProduct, setProducts, clearAll } = stockSlice.actions;
export default stockSlice.reducer;