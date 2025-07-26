import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartItems: [],
  hidden: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    toggleHiddenCart: (state) => {
      return {
        ...state,
        hidden: !state.hidden,
      };
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {addToCart, removeFromCart, clearCart, toggleHiddenCart} =
  cartSlice.actions;

export default cartSlice.reducer;
