import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./slice/stockSlice";

export const store = configureStore({
  reducer: {
    stockReducer: stockSlice
  }
});