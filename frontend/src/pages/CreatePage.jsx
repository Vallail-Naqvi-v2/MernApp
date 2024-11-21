import React, { useState } from "react";
import axios from "axios";
import "./CreatePage.css";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent page reload
    const { name, price, image } = newProduct;

    // Validation
    if (!name || !price || !image) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    if (isNaN(price)) {
      setError("Price must be a valid number");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/products", {
        name,
        price,
        image,
      });

      console.log("Product Added:", response.data);
      setSuccess("Product added successfully!");
      setError("");

      // Reset form
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please try again.");
      setSuccess("");
    }
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div className="container">
      <h1 className="header">
        <span className="highlight">Create</span> a Product
      </h1>

      {/* Card Wrapper */}
      <div className="card">
        <form onSubmit={handleAddProduct} className="form">
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className="field">
            <label htmlFor="name" className="label">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="input"
            />
          </div>

          <div className="field">
            <label htmlFor="price" className="label">
              Price
            </label>
            <input
              id="price"
              type="text"
              placeholder="Enter product price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="input"
            />
          </div>

          <div className="field">
            <label htmlFor="image" className="label">
              Image URL
            </label>
            <input
              id="image"
              type="text"
              placeholder="Enter image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="input"
            />
          </div>

          <button type="submit" className="button">
            Add Product
          </button>
        </form>

        {/* Go Back Button */}
        <button onClick={handleGoBack} className="button back-button">
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
