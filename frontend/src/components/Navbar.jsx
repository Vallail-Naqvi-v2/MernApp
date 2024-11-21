import React, { useState, useEffect } from "react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Theme state

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Apply theme to the document body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  const handleAddClick = () => {
    navigate("/create"); // Navigate to /create when Add is clicked
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Product Store</h1>
      <div className="navbar-buttons">
        {/* Add Button */}
        <button className="navbar-button" onClick={handleAddClick}>
          <FaPlus style={{ marginRight: "5px" }} /> Add
        </button>
        {/* Change Theme Button */}
        <button className="navbar-button" onClick={toggleTheme}>
          {isDarkTheme ? (
            <>
              <FaSun style={{ marginRight: "5px" }} /> Light Mode
            </>
          ) : (
            <>
              <FaMoon style={{ marginRight: "5px" }} /> Dark Mode
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
