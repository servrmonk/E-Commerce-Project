// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming you're using axios for making API requests

const initialState = {
  cartItems: [], // Array to store items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); // Add item to cart
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      ); // Remove item from cart
    },
    // Add action for Razorpay checkout
    checkout: (state, action) => {
      // You can handle any state changes here, if needed.
      // The actual Razorpay code will be triggered from the UI (ShoppingCart component).
    },
  },
});

export const { addToCart, removeFromCart, checkout } = cartSlice.actions;
export default cartSlice.reducer;

// Function to handle Razorpay payment
export const buyPremium = (cartItems) => async (dispatch) => {
  try {
    // Assuming your backend has an endpoint for Razorpay integration
    const response = await axios.post('/order/premiummembership', {
      items: cartItems, // You can send the cart items as part of the request
    });

    const options = {
      key: response.data.key_id, // Get Razorpay key_id from the response
      order_id: response.data.order.id,
      handler: async function (response) {
        // Update the transaction status after successful payment
        await axios.post(
          "/order/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          }
        );
        alert("Payment successful, you are now a premium user!");
      },
    };

    // Initialize Razorpay
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    // Listen for failed payment
    rzp1.on("payment.failed", (res) => {
      alert("Payment failed, please try again.");
    });
  } catch (error) {
    console.error("Failed to fetch premium", error);
    alert("Something went wrong, please try again.");
  }
};
