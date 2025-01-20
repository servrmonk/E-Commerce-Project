import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/user.slice'; // User slice
import cartReducer from '../slice/cart.slice';  // Cart slice

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer, // Add the cart reducer here
  },
});

export default store;
