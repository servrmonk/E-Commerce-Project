import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import {
  setCartItems,
  removeFromCart,
  clearFromCart,
} from "../redux/slice/cart.slice";

const ShoppingCart = ({ isOpen, toggleCart }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.userData); // Moved this out of useEffect
  const dispatch = useDispatch();

 
  console.log("isLoggedIn, userId ", isLoggedIn, " == ", userId);

  const fetchCart = async () => {
    const idToken = localStorage.getItem("accessToken");
    console.log("idtoken ", idToken);
    console.log("Inside fetch cart");
    try {
      const response = await axios.get(
        `https://e-commerce-project-gb0m.onrender.com/api/cart/getcart`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Pass token in headers
          },
        }
      );
      console.log("response in cart is ", response);
      dispatch(setCartItems(response.data.cart.items)); // Update Redux with fetched data
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]); // Added userId to the dependency array

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        "https://e-commerce-project-gb0m.onrender.com/api/cart/add-to-cart",
        {
          product,
        }
      );
      dispatch(setCartItems(response.data.cart.items)); // Update Redux state
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("Please login first to proceed with checkout.");
      return;
    }

    try {
      const stripe = await loadStripe(
        `pk_test_51QjJ0tLOvsoGjYbbnVbsQxzm5R1AZUVQaRXNM8JGHBaMgeUMtRGoebNCenZy2g3gmhLWvQZlBnwk78MvYjx5JCbT00Yel2lwSJ`
      );

      if (!stripe) {
        throw new Error("Stripe initialization failed.");
      }

      const idToken = localStorage.getItem("accessToken"); // Ensure the token is available
      if (!idToken) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        "https://e-commerce-project-gb0m.onrender.com/api/cart/create-checkout-session",
        { products: cartItems },
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Include token for authentication
          },
        }
      );

      const session = response.data;
      if (!session.id) {
        throw new Error("Invalid session data received from the server.");
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe Checkout error:", result.error.message);
        alert("Something went wrong during checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(
        "An error occurred during checkout. Please check the console for details."
      );
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className="relative z-50"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
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
                              key={item?.productId}
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
                                    ${item.price} x {item.quantity}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="flex items-center">
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className="text-green-500 hover:text-green-700 px-2"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => dispatch(removeFromCart(item))}
                                  className="text-red-500 hover:text-red-700 px-2"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => dispatch(clearFromCart(item))}
                                  className="ml-4 text-red-700 hover:text-red-900 px-2"
                                >
                                  Remove
                                </button>
                              </div> */}
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
                            or{" "}
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
