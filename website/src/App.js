import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChangeDetection from './Pages/ChangeDetection';
import LandCoverClassification from './Pages/LandCoverClassification';
import VegetationMonitoring from './Pages/VegetationMonitoring';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/change-detection" element={<ChangeDetection />} />
          <Route path="/land-cover-classification" element={<LandCoverClassification />} />
          <Route path="/vegetation-monitoring" element={<VegetationMonitoring />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1>Satellite Image Analysis</h1>
      <ChangeDetection />
      <LandCoverClassification />
      <VegetationMonitoring />
    </>
  );
}

export default App;