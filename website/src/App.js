import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image1 || !image2) {
      alert('Please select both images');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);

    try {
      const response = await axios.post('http://localhost:5000/api/detect-change', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Satellite Image Change Detection</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image1">Image 1:</label>
          <input type="file" id="image1" onChange={handleImage1Change} accept="image/*" />
        </div>
        <div>
          <label htmlFor="image2">Image 2:</label>
          <input type="file" id="image2" onChange={handleImage2Change} accept="image/*" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Apply'}
        </button>
      </form>
      {results && (
        <div className="results">
          <h2>Results:</h2>
          <div className="image-container">
            <img src={`http://localhost:5000/output/${results.difference}`} alt="Difference" />
            <p>Difference</p>
          </div>
          <div className="image-container">
            <img src={`http://localhost:5000/output/${results.changeMap}`} alt="Change Map" />
            <p>Change Map</p>
          </div>
          <div className="image-container">
            <img src={`http://localhost:5000/output/${results.closeMap}`} alt="Close Map" />
            <p>Close Map</p>
          </div>
          <div className="image-container">
            <img src={`http://localhost:5000/output/${results.openMap}`} alt="Open Map" />
            <p>Open Map</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;