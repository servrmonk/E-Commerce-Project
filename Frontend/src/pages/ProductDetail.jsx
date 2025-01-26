import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cart.slice";
import axios from "axios";
import productsData from "../db.json"; // Import data directly



const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL params
  const dispatch = useDispatch(); // Access Redux dispatch function
  const { userData } = useSelector((state) => state.user); // Access user data from Redux state

  console.log("userData ", userData);

  // Find the product from the data
  const product = productsData?.products?.find((prod) => prod.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get userId from Redux state (if user is logged in)
  const userId = userData ? userData._id : null;
  console.log("userdata in productDetails ", userData);

  const handleAddToCart = async () => {
    try {
      // Extract only the necessary fields
      const productWithId = {
        productId: product.id, // Adding productId
        name: product.name,
        image: product.image,
        price: product.price,
        
      };

      // Add to Redux store
      console.log(productWithId)
      dispatch(addToCart(productWithId));

      if (userId) {
        // Send API request to add the product to the user's cart in the database
        await axios.post("http://localhost:3000/api/cart/add-to-cart", {
          userId,
          product: productWithId, // Send the simplified product
        });

      

        console.log("Product added to cart in Redux and database.");
      } else {
        console.log("User not logged in, product added to Redux only.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      
    }
  };

  return (
    <div className="p-9 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-96 h-fit rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <p className="text-lg font-bold text-gray-900 mt-4">${product.price}</p>
        <p className="text-sm text-gray-500 mt-2">
          Rating: {product?.rating?.rate || Math.max(parseFloat((Math.random() * 5).toFixed(1)), 1)} ⭐
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button 
            onClick={handleAddToCart} 
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
          <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
            Buy Now
          </button>
        </div>

        {/* Back to Products Link */}
        <div className="mt-4">
          <Link to="/product" className="text-blue-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
