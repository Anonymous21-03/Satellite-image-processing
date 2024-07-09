import React, { useState } from 'react';
import axios from 'axios';
import './Styles/ChangeDetection.css';
import ImageBox from './ImageBox';

function ChangeDetection() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);

    try {
      const response = await axios.post('http://localhost:5000/api/detect-change', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-detection">
      <h2>Change Detection</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image1">Image 1:</label>
          <input type="file" id="image1" onChange={(e) => setImage1(e.target.files[0])} required />
        </div>
        <div>
          <label htmlFor="image2">Image 2:</label>
          <input type="file" id="image2" onChange={(e) => setImage2(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Detect Changes'}
        </button>
      </form>
      {results && (
        <div className="results">
          <h3>Results:</h3>
          <div className="image-grid">
            <div className="image-container">
              <ImageBox src={`http://localhost:5000${results.difference}`} alt="Difference" />
              <p>Difference</p>
            </div>
            <div className="image-container">
              <ImageBox src={`http://localhost:5000${results.changeMap}`} alt="Change Map" />
              <p>Change Map</p>
            </div>
            <div className="image-container">
              <ImageBox src={`http://localhost:5000${results.closeMap}`} alt="Close Map" />
              <p>Close Map</p>
            </div>
            <div className="image-container">
              <ImageBox src={`http://localhost:5000${results.openMap}`} alt="Open Map" />
              <p>Open Map</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeDetection;