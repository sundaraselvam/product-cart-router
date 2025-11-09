import { useState, useEffect } from "react";
import "../styles/Cart.css";

const Cart = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
    // Apply 10% discount
    setFinalPrice(newTotal * 0.9);
  }, [cart]);

  const updateQuantity = (productId, change) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          // Ensure quantity has a default value of 1 if it's undefined
          const currentQuantity = item.quantity || 1;
          const newQuantity = Math.max(1, currentQuantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  if (cart.length === 0) {
    return <div className="empty-cart">Your cart is empty</div>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p className="item-price">${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <p className="item-total">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="subtotal">
          <p>Subtotal: ${total.toFixed(2)}</p>
          <p>Discount (10%): ${(total * 0.1).toFixed(2)}</p>
          <p className="final-price">Final Price: ${finalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
