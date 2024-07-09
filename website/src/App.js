import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChangeDetection from './Pages/ChangeDetection';
import LandCoverClassification from './Pages/LandCoverClassification';
import VegetationMonitoring from './Pages/VegetationMonitoring';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="bg-container"></div>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/change-detection" element={<ChangeDetection />} />
          <Route path="/land-cover-classification" element={<LandCoverClassification />} />
          <Route path="/vegetation-monitoring" element={<VegetationMonitoring />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;