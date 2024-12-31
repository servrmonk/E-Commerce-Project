import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Test User",
    email: "test@example.com",
  }); // Mock user data
  const [orders, setOrders] = useState([
    {
      _id: "order1",
      products: [
        {
          _id: "product1",
          name: "Product 1",
          rating: 4.5,
          price: 20,
          image: "https://via.placeholder.com/100",
        },
        {
          _id: "product2",
          name: "Product 2",
          rating: 4,
          price: 15,
          image: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      _id: "order2",
      products: [
        {
          _id: "product3",
          name: "Product 3",
          rating: 5,
          price: 30,
          image: "https://via.placeholder.com/100",
        },
      ],
    },
  ]); // Mock order data

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <div className="mb-4">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="flex justify-between">
          <NavLink to="/edit-profile" className="text-blue-500 font-semibold">
            Edit Profile
          </NavLink>
          <NavLink to="/change-password" className="text-blue-500 font-semibold">
            Change Password
          </NavLink>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-gray-100 p-6 mt-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Order History</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div>
            {orders.map((order) => (
              <div key={order._id} className="mb-4">
                <h4 className="font-semibold">Order #{order._id}</h4>
                <div className="flex gap-4">
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <img
                        src={product.image} // Mock product image
                        alt={product.name}
                        className="w-20 h-20 object-cover"
                      />
                      <p className="font-semibold">{product.name}</p>
                      <p>Rating: {product.rating}</p>
                      <p>Price: ${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
