import React, { useState } from 'react';
import axios from 'axios';

function VegetationMonitoring() {
  const [file, setFile] = useState(null);
  const [ndviImage, setNdviImage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/calculate-ndvi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNdviImage(`http://localhost:5000/output/${response.data.ndviImage}`);
      setError(null);
    } catch (error) {
      setError('An error occurred while processing the image');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Vegetation Monitoring (NDVI)</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".tif,.tiff" />
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