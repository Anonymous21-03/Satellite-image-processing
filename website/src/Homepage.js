import React from 'react';
import './Homepage.css';

const Homepage = () => {
  const scrollToFeatures = event => {
    event.preventDefault();
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className='body-container'>
      <div className='bg-container'></div>
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
      </div>
      <div className='features-preview'>
        <div className='feature'>
          <i className='icon fas fa-leaf'></i>
          <h3>Vegetation Analysis</h3>
          <p>Advanced algorithms for precise vegetation health assessment</p>
        </div>
        <div className='feature'>
          <i className='icon fas fa-globe'></i>
          <h3>Land Cover Classification</h3>
          <p>Accurate mapping of diverse land cover types</p>
        </div>
        <div className='feature'>
          <i className='icon fas fa-chart-line'></i>
          <h3>Change Detection</h3>
          <p>Identify and analyze environmental changes over time</p>
        </div>
      </div>
    </div>
  )
}

export default Homepage;