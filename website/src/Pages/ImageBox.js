// ImageBox.js
import React from 'react';
import './Styles/ImageBox.css';

const ImageBox = ({ src, alt }) => {
  return (
    <div className="image-box">
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="placeholder">No image loaded</div>
      )}
    </div>
  );
};

export default ImageBox;