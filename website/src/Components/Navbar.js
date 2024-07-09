import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../images/download.jpeg"
import GoogleSignIn from './GoogleSignIn';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userObject) => {
    setUser(userObject);
  };

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
          Features
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/change-detection">Change Detection</Link></li>
              <li><Link to="/land-cover-classification">Land Cover Classification</Link></li>
              <li><Link to="/vegetation-monitoring">Vegetation Monitoring</Link></li>
            </ul>
          )}
        </li>
      </ul>
      <div className="navbar-auth">
        {user ? (
          <span className="user-greeting">Welcome, {user.name}</span>
        ) : (
          <>
            <GoogleSignIn onLoginSuccess={handleLoginSuccess} />
            <Link to="/signup" className="auth-link signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;