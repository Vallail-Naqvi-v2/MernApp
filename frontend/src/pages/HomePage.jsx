import React, { useState, useEffect } from "react";
import axiosInstance from "../aixosConfig";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return; // Prevent deletion if user cancels
    }
    try {
      await axiosInstance.delete(`/products/${productId}`); // Send DELETE request
      setProducts(products.filter((product) => product._id !== productId)); // Update state
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div className="homepage-container">
      <h1 className="homepage-header">Product List</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
