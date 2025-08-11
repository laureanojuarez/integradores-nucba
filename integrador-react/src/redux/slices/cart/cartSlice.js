import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartItems: [],
  hidden: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    toggleHiddenCart: (state) => {
      state.hidden = !state.hidden;
    },
    addToCart: (state, action) => {
      const item = action.payload; // { id, ... }
      const existing = state.cartItems.find((p) => p.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.cartItems.find((p) => p.id === id);
      if (existing) existing.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existing = state.cartItems.find((p) => p.id === id);
      if (!existing) return;
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((p) => p.id !== id);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload?.id ?? action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleHiddenCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
