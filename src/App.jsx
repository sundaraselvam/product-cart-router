import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios("https://fakestoreapi.com/products");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const exists = cart.some((c) => c.id === product.id);
    if (exists) {
      window.alert("Item already added to the cart");
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <div className="app-container">
      <Navbar cartCount={cart.length} onCartClick={openCart} />
      <main>
        <div className="grid">
          {items.map((ele) => {
            return (
              <div key={ele.id} className="card">
                <h2 className="card-title">{ele.title}</h2>
                <img className="card-image" src={ele.image} alt={ele.title} />
                <p className="card-desc">{ele.description}</p>
                <div className="card-footer">
                  <span className="card-price">${ele.price}</span>
                  <div className="buttons">
                    <button onClick={() => addToCart(ele)}>Add to cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
