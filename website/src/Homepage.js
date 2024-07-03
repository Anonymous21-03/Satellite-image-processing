import React from 'react';
import './styles/Homepage.css';

const Homepage = () => {
  const scrollToFeatures = event => {
    event.preventDefault();
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='body-container'>
      <div className='bg-container'></div>
      <div className='intro'>
        <div className='heading'>
          <h1 className='compname'>ISMEA</h1>
          <p>
            In the realm of satellite image analysis, conventional approaches
            often categorize features into distinct classes. However, the
            real-world scenarios are often more intricate. This project aims to
            revolutionize the understanding of satellite imagery by employing a
            web-based platform integrated with machine learning, specifically
            focusing on aspects such as vegetation health, soil health, and
            other relevant parameters.
          </p>
          <div className='getStarted'>
            <button className='custom-button' onClick={scrollToFeatures}>
              <span className="button-text">Get Started</span>
              <span className="hover-text" aria-hidden="true">Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;