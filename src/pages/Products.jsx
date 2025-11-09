import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Products.css";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            <button
              onClick={() => handleCart(product)}
              className={`cart-button ${
                cart.some((item) => item.id === product.id) ? "remove" : "add"
              }`}
            >
              {cart.some((item) => item.id === product.id)
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
