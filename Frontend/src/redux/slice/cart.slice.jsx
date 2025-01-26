import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [], // Array to store items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add new reducer for setting cart items
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If item already exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // Add new item to the cart with quantity 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          // Reduce quantity if more than 1
          itemToRemove.quantity -= 1;
        } else {
          // Remove item from cart if quantity is 1
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    clearFromCart: (state, action) => {
      // Completely remove an item regardless of quantity
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, clearFromCart } = cartSlice.actions;
export default cartSlice.reducer;
