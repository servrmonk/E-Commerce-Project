import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import LoginPage from "../pages/LoginRegister";
import ContactUs from "../pages/Contact";
import AboutUs from "../pages/About";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check the user's authentication status
  console.log("Isauthenticated value in routes.index.js", isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function Routing() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Protected Routes (only accessible if authenticated) */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/product"
          element={<PrivateRoute element={<Product />} />}
        />
        <Route
          path="/product/:id"
          element={<PrivateRoute element={<ProductDetail />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />

        {/* If the route doesn't match, redirect to home */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default Routing;
