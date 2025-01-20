const stripe = require("stripe")(
    process.env.STRIPE_SECRET_KEY
);

const express = require('express');
const router = express.Router();
router.post("/create-checkout-session", async (req, res) => {
    console.log("req.body in cart routes ", req.body);

    const { products } = req.body;

    // Make sure to add a quantity to each line item
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
            },
            unit_amount: Math.round(product.price), // Convert price to the smallest currency unit (e.g., cents)
        },
        quantity: product.quantity || 1,  // Set quantity to 1 if not provided
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/reject",
        });

        res.json({
            id: session.id,
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
