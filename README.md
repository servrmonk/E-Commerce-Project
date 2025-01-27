AI-Powered E-Commerce Platform

Overview

The AI-Powered E-Commerce Platform is a modern, feature-rich e-commerce solution that leverages advanced technologies to deliver seamless shopping experiences. Built using a MERN stack with AI-driven features, this application includes a frontend powered by React and a backend managed with Node.js and Express. The project also incorporates secure authentication, payment gateways, and responsive design for a complete e-commerce solution.

Features

Frontend Features:

State Management: Leveraging @reduxjs/toolkit and react-redux for efficient global state management.

Dynamic Routing: Built with react-router-dom for seamless navigation.

AI-Powered Insights: Future-proof for integrating AI-driven product recommendations and user behavior analytics.

Responsive Design: Styled with Tailwind CSS for mobile-first design.

Notifications: Real-time updates and user notifications using react-hot-toast.

Skeleton Loading: Smooth user experience with react-loading-skeleton during API calls.

Carousel Features: Enhanced UI with react-fast-marquee.

Backend Features:

Authentication: Secure user authentication using jsonwebtoken and password hashing with bcrypt.

Payment Gateway: Integration with Stripe for secure online payments.

API Development: RESTful APIs built with Express and data persistence with Mongoose (MongoDB).

CORS Handling: Cross-origin resource sharing enabled with cors.

Environment Configurations: Secure environment management with dotenv.

Additional Features:

Cookie Management: Handled with cookie-parser and js-cookie for secure user sessions.

Real-time Development: Enhanced developer experience using nodemon.

Linting and Formatting: Code consistency maintained with eslint and prettier.

Tech Stack

Frontend:

React 18

Redux Toolkit

React Router DOM

Tailwind CSS

Vite

Backend:

Node.js

Express.js

MongoDB (Mongoose)

Stripe Payment Gateway

Installation

Prerequisites:

Node.js (v16 or higher)

MongoDB (local or Atlas connection)

Stripe account for payment integration

Clone the Repository:

git clone https://github.com/servrmonk/E-Commerce-Project.git
cd aipoweredecomm

Frontend Setup:

cd frontend
npm install
npm run dev

Backend Setup:

cd backend
npm install
npm run dev

Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the backend directory:

PORT=3000
MONGODB_URI=ur url
ACCESS_TOKEN_SECERT=...
ACCESS_TOKEN_EXPIRY=...
REFRESH_TOKEN_SECRET=...
REFRESH_TOKEN_EXPIRY=10d
CORS_ORIGIN=*
STRIPE_SECRET_KEY=...

Usage

Frontend:

Navigate to the frontend directory and run the development server using npm run dev.

Access the application at http://localhost:5173.

Backend:

Navigate to the backend directory and start the server with npm run dev.

APIs will be served at http://localhost:3000.

Scripts

Frontend:

npm run dev: Starts the development server.

npm run build: Builds the application for production.

npm run preview: Previews the production build.

npm run lint: Lints the codebase.

Backend:

npm run dev: Starts the backend server with hot reload.

Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a feature branch: git checkout -b feature-name.

Commit your changes: git commit -m 'Add some feature'.

Push to the branch: git push origin feature-name.
