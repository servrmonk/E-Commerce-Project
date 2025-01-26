const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
  const { userId, product } = req.body;
  console.log("Adding to cart: ", { userId, product });

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log("Creating new cart for user:", userId);
      cart = new Cart({ userId, items: [] });
    }

    const existingProduct = cart.items.find(
      (item) => item.productId === product.productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }

    await cart.save();
    console.log("Cart updated:", cart);
    res
      .status(200)
      .json({ message: "Product added to cart successfully.", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Failed to add product to cart." });
  }
};

const getCartItems = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "No items in the cart." });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items." });
  }
};

const createCheckoutSession = async (req, res) => {
  const userId = req.user._id;
  // console.log("inside createcheckout",req.body)
  // console.log("request is == ",req.user._id)
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert price to smallest currency unit (cents)
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/reject",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};

module.exports = {
  addToCart,
  createCheckoutSession,
  getCartItems,
};
