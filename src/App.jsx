// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter wraps everything
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routing from "./routes/index.jsx";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routing /> 
      <Footer />
    </BrowserRouter>
  );
}

export default App;
