import React from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter wraps everything
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./redux/store/store.jsx"; // Import the store
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routing from "./routes/index.jsx";

function App() {
  return (
    <Provider store={store}> 
      <BrowserRouter>
        <Navbar />
        <Routing />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
