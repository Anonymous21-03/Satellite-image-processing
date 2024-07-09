import React, { useState } from 'react';
import axios from 'axios';
import './Styles/LandCoverClassification.css';
import ImageBox from './ImageBox';

function LandCoverClassification() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/land-cover-classification', formData, {
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
    <div className="land-cover-classification">
      <h2>Land Cover Classification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Classify Land Cover'}
        </button>
      </form>
      {result && (
        <div className="results">
          <h3>Result:</h3>
          <ImageBox src={`http://localhost:5000${result.classifiedImage}`} alt="Classified Land Cover" />
        </div>
      )}
    </div>
  );
}

export default LandCoverClassification;