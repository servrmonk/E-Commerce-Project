const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");

const app = express();

// Specify the frontend origin here, instead of "*"
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Change this to your frontend URL  
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Ensure credentials (cookies) are allowed
  })
);

app.options("*", cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes declaration
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

module.exports = { app };
