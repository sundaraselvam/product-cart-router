import React from "react";

export default function CartModal({
  isOpen,
  onClose,
  cartItems = [],
  removeFromCart,
}) {
  if (!isOpen) return null;
  // calculate total amount (ensure numeric)
  const total = cartItems
    .reduce(
      (sum, p) =>
        sum +
        (typeof p.price === "string"
          ? parseFloat(p.price) || 0
          : Number(p.price || 0)),
      0
    )
    .toFixed(2);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h3>
            Cart ({cartItems.length})
            <span className="modal-total"> — Total: ${total}</span>
          </h3>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {cartItems.map((p) => (
                <li key={p.id} className="cart-item">
                  <img src={p.image} alt={p.title} />
                  <div className="cart-item-info">
                    <div className="ci-title" title={p.title}>
                      {p.title}
                    </div>
                    <div className="ci-meta">
                      <div className="ci-price">${p.price}</div>
                    </div>
                  </div>
                  <button
                    className="remove-icon"
                    onClick={() => removeFromCart(p.id)}
                    aria-label={`Remove ${p.title} from cart`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="modal-footer">
          <div className="pay-row">
            <div className="pay-label">Amount to pay:</div>
            <div className="pay-amount">${total}</div>
          </div>
          <div className="modal-actions">
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
            <button
              className="pay-btn"
              onClick={() => alert(`Proceed to pay $${total}`)}
              disabled={cartItems.length === 0}
            >
              Pay ${total}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
