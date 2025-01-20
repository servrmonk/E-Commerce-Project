import React, { useState } from 'react';

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      ...(isSignIn ? {} : { confirmPassword }), // Only add confirmPassword for sign up
    };

    // Log the form data (you can replace this with actual API calls)
    console.log(isSignIn ? 'Login Details:' : 'Registration Details:', formData);

    // Reset the form after submit (optional)
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <ul className="flex justify-center space-x-4">
            <li>
              <button
                className={`font-semibold text-lg p-2 rounded-md ${
                  isSignIn ? 'bg-gray-800 text-white' : 'text-gray-700'
                }`}
                onClick={toggleForm}
              >
                Sign In
              </button>
            </li>
            <li>
              <button
                className={`font-semibold text-lg p-2 rounded-md ${
                  !isSignIn ? 'bg-gray-800 text-white' : 'text-gray-700'
                }`}
                onClick={toggleForm}
              >
                Sign Up
              </button>
            </li>
          </ul>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isSignIn && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {!isSignIn && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-600">I agree to the terms and conditions</label>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
            >
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center mt-4">
            {isSignIn ? (
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot your password?
              </a>
            ) : null}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              {isSignIn ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
