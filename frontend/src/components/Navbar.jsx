import React from "react";
import { FaPlus, FaMoon } from "react-icons/fa"; // Import icons
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Product Store</h1>
      <div className="navbar-buttons">
        {/* Add Button */}
        <button className="navbar-button">
          <FaPlus style={{ marginRight: "5px" }} /> Add
        </button>
        {/* Change Theme Button */}
        <button className="navbar-button">
          <FaMoon style={{ marginRight: "5px" }} /> Theme
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
