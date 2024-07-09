import React, { useState } from 'react';
import axios from 'axios';
import './Styles/VegetationMonitoring.css';
import ImageBox from './ImageBox';

function VegetationMonitoring() {
  const [redBand, setRedBand] = useState(null);
  const [nirBand, setNirBand] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('red_band', redBand);
    formData.append('nir_band', nirBand);

    try {
      const response = await axios.post('http://localhost:5000/api/calculate-ndvi', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vegetation-monitoring">
      <h2>Vegetation Monitoring (NDVI)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="redBand">Red Band Image:</label>
          <input type="file" id="redBand" onChange={(e) => setRedBand(e.target.files[0])} required />
        </div>
        <div>
          <label htmlFor="nirBand">NIR Band Image:</label>
          <input type="file" id="nirBand" onChange={(e) => setNirBand(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Calculate NDVI'}
        </button>
      </form>
      {result && (
        <div className="results">
          <h3>NDVI Result:</h3>
          <ImageBox src={`http://localhost:5000${result.ndviImage}`} alt="NDVI" />
        </div>
      )}
    </div>
  );
}

export default VegetationMonitoring;