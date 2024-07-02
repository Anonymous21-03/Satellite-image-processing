import React, { useState } from 'react';
import axios from 'axios';

const LandCoverClassification = () => {
  const [image, setImage] = useState(null);
  const [classifiedImage, setClassifiedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/land-cover-classification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setClassifiedImage(response.data.classifiedImage);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Land Cover Classification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Classify'}
        </button>
      </form>
      {classifiedImage && (
        <div>
          <h3>Classified Image:</h3>
          <img src={`http://localhost:5000/output/${classifiedImage}?${new Date().getTime()}`} alt="Classified Land Cover" />
        </div>
      )}
    </div>
  );
};

export default LandCoverClassification;