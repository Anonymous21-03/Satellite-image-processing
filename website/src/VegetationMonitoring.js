import React, { useState } from 'react';
import axios from 'axios';

function VegetationMonitoring() {
  const [redBand, setRedBand] = useState(null);
  const [nirBand, setNirBand] = useState(null);
  const [ndviImage, setNdviImage] = useState(null);
  const [error, setError] = useState(null);

  const handleRedBandChange = (event) => {
    setRedBand(event.target.files[0]);
  };

  const handleNirBandChange = (event) => {
    setNirBand(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!redBand || !nirBand) {
      setError('Please select both red and near-infrared band images');
      return;
    }

    const formData = new FormData();
    formData.append('red_band', redBand);
    formData.append('nir_band', nirBand);

    try {
      const response = await axios.post('http://localhost:5000/api/calculate-ndvi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNdviImage(`http://localhost:5000/output/${response.data.ndviImage}`);
      setError(null);
    } catch (error) {
      setError('An error occurred while processing the images');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Vegetation Monitoring (NDVI)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="red-band">Red Band Image:</label>
          <input type="file" id="red-band" onChange={handleRedBandChange} accept=".tif,.tiff" />
        </div>
        <div>
          <label htmlFor="nir-band">Near-Infrared Band Image:</label>
          <input type="file" id="nir-band" onChange={handleNirBandChange} accept=".tif,.tiff" />
        </div>
        <button type="submit">Calculate NDVI</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ndviImage && (
        <div>
          <h3>NDVI Result:</h3>
          <img src={ndviImage} alt="NDVI" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default VegetationMonitoring;