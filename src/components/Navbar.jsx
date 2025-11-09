import React from "react";

export default function Navbar({
  title = "FlashCart — Shop in Color",
  cartCount = 0,
  onCartClick,
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">{title}</div>
        <div className="nav-actions">
          <button
            className="cart-btn"
            onClick={onCartClick}
            aria-label={`Open cart (${cartCount})`}
          >
            Cart
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
