// Layout.js
import React from 'react';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;