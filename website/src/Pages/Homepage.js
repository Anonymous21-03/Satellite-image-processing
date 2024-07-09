import React, { useRef } from 'react';
import './Homepage.css';
import Features from './Features'; // Make sure the path is correct

const Homepage = () => {
  const featuresRef = useRef(null);

  const scrollToFeatures = (event) => {
    event.preventDefault();
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='intro'>
      <div className='heading'>
        <h1 className='compname'>ISMEA</h1>
        <p className='tagline'>Intelligent Satellite Monitoring & Environmental Analysis</p>
        <p className='description'>
          Revolutionizing satellite imagery understanding through advanced machine learning,
          focusing on vegetation health, soil analysis, and crucial environmental parameters.
        </p>
        <div className='getStarted'>
          <button className='custom-button' onClick={scrollToFeatures}>
            <span className="button-text">Get Started</span>
            <span className="hover-text" aria-hidden="true">Explore Now</span>
          </button>
        </div>
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
    </div>
  );
};

export default Homepage;