const express = require("express");
const {
  addToCart,
  createCheckoutSession,
  getCartItems,
} = require("../controllers/cart.controller");
const router = express.Router();

const { verifyJWT } = require("../middlewares/auth.middleware");

// Route to add an item to the cart
router.post("/add-to-cart", addToCart);

// Route to create a Stripe checkout session
router.post("/create-checkout-session", verifyJWT, createCheckoutSession);

router.get("/getcart", verifyJWT, getCartItems);

module.exports = router;
