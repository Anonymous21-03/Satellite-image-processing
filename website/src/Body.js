  // Body.js
  import React from 'react'
  import './Body.css'

  const Body = () => {
    const scrollToFeatures = event => {
      event.preventDefault() // Prevent default form submission behavior
      const featuresSection = document.getElementById('features')
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }

    return (
      <div className='body-container'>
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
              <button onClick={scrollToFeatures}>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default Body