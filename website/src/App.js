import React from 'react';
import ChangeDetection from './ChangeDetection';
import LandCoverClassification from './LandCoverClassification';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Satellite Image Analysis</h1>
      <ChangeDetection />
      <LandCoverClassification />
    </div>
  );
}

export default App;