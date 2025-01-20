import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { buyPremium } from "../redux/slice/cart.slice"; // Import the Razorpay action

import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'; // Import axios

const ShoppingCart = ({ isOpen, toggleCart }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Handle Razorpay checkout
  // const handleCheckout = () => {
  //   if (cartItems.length > 0) {
  //     dispatch(buyPremium(cartItems)); // Dispatch buyPremium action with cart items
  //   } else {
  //     alert("Your cart is empty.");
  //   }
  // };
  const handleCheckout = async () => {
    // loading the strip module
    const stripe = await loadStripe(
      `pk_test_51QjJ0tLOvsoGjYbbnVbsQxzm5R1AZUVQaRXNM8JGHBaMgeUMtRGoebNCenZy2g3gmhLWvQZlBnwk78MvYjx5JCbT00Yel2lwSJ`
    ); //publishable key

    const body = {
      products: cartItems,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const apiURL = `http://localhost:3000/api/cart/create-checkout-session`;

    try {
      // Use axios to send the POST request
      const response = await axios.post(apiURL, body, { headers });
      const session = response.data;

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div>
      {/* Cart Slide Over */}
      {isOpen && (
        <div
          className="relative z-50"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity z-40"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 overflow-hidden z-50">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping Cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={toggleCart}
                          >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="size-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Cart items */}
                      <div className="mt-6">
                        {cartItems.length === 0 ? (
                          <p className="text-center text-gray-500">
                            Your cart is empty.
                          </p>
                        ) : (
                          cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between border-b py-4"
                            >
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="ml-4">
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    ${item.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Subtotal Section */}
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${getTotalPrice()}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleCheckout}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
