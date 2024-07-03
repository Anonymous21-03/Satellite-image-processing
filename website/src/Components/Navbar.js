import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../images/download.jpeg"
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li 
          className="features-dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Link to="/features">Features</Link>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/change-detection">Change Detection</Link></li>
              <li><Link to="/land-cover-classification">Land Cover Classification</Link></li>
              <li><Link to="/vegetation-monitoring">Vegetation Monitoring</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;