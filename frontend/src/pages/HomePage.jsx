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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
