import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">Shop</div>
          <div className="nav-links">
            <Link to="/">Products</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Products cart={cart} setCart={setCart} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
