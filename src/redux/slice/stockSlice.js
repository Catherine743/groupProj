import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  sales: [],
  threshold: 5, // 🔥 Added threshold
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    // ✅ Add Product
    addProduct: (state, action) => {
      state.products.push({
        ...action.payload,
        sold: 0, // track sold quantity
      });
    },

    // ✅ Update Product (Needed for Edit Page)
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (p) => p.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload,
        };
      }
    },

    // ✅ Add Sale
    addSale: (state, action) => {
      const { productId, quantity } = action.payload;

      const product = state.products.find(
        (p) => p.id === productId
      );

      if (product && product.stock >= quantity) {
        product.stock -= quantity;
        product.sold += quantity; // 🔥 important for dashboard

        const totalAmount = quantity * product.price;

        state.sales.push({
          id: Date.now(),
          productId,
          quantity,
          totalAmount,
          date: new Date().toISOString(),
        });
      }
    },
  },
});

export const {
  addProduct,
  addSale,
  updateProduct,
} = stockSlice.actions;

export default stockSlice.reducer;