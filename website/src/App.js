import React from 'react';
import ChangeDetection from './ChangeDetection';
import LandCoverClassification from './LandCoverClassification';
import VegetationMonitoring from './VegetationMonitoring';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Satellite Image Analysis</h1>
      <ChangeDetection />
      <LandCoverClassification />
      <VegetationMonitoring />
    </div>
  );
}

export default App;