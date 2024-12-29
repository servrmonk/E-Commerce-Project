import React from 'react';

const UserProfile = () => {
  const user = {
    name: 'Test',
    email: 'test@example.com',
    phone: '+002 088 2222',
    profilePicture: 'https://via.placeholder.com/150',
    orderHistory: [
      { id: 1, productName: 'Product 1', date: '2024-01-10', price: '$100' },
      { id: 2, productName: 'Product 2', date: '2024-02-15', price: '$200' },
    ],
    savedItems: [
      { id: 1, productName: 'Saved Product 1', price: '$50' },
      { id: 2, productName: 'Saved Product 2', price: '$80' },
    ],
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl text-gray-800 font-mono mt-12 text-center mb-4">
          User Profile
        </h1>
        <hr className="my-6" />

        {/* Profile Header */}
        <div className="flex justify-center items-center mb-8">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-blue-500"
          />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
          <p className="text-lg text-gray-600">{user.email}</p>
          <p className="text-lg text-gray-600">{user.phone}</p>
        </div>

        {/* Order History */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center py-4 mb-6">
            Order History
          </h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Product
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Date
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-600">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {user.orderHistory.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 border-b">{order.productName}</td>
                  <td className="px-4 py-2 border-b">{order.date}</td>
                  <td className="px-4 py-2 border-b">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Saved Items */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center py-4 mb-6">
            Saved Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user.savedItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg shadow-md p-4"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.productName}
                </h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
