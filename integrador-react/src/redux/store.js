import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: cartReducer,
});

export default store;
