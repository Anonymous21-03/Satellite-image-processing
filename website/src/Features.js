import './Features.css';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className='container-feature' id='features'>
      <div className='feature'>
        <div className='card'>
          <div className='title'>Land Cover Classification</div>
          <div className='content'>
            <p>
              Land cover classification categorizes Earth's surface into distinct
              types like water, forest, or urban areas. This process, often aided
              by satellite imagery and machine learning, helps us understand and
              monitor land use patterns, analyze environmental changes, and make
              informed decisions about resource management.
            </p>
            <div className='getStarted'>
              <Link to='/landcover'>
                <button>Try Land cover classification</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='feature'>
        <div className='card'>
          <div className='title'>Change Detection</div>
          <div className='content'>
            <p>
              Change detection in satellite imagery analyzes differences between
              images of the same area captured at different times. It helps us
              identify modifications like deforestation, urban expansion, or
              natural disasters. This valuable information supports various
              fields, including environmental monitoring, urban planning, and
              disaster management, allowing us to track changes over time and make
              informed decisions for a sustainable future.
            </p>
            <div className='getStarted'>
              <Link to='/changedetection'>
                <button>Try Change Detection</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='feature'>
        <div className='card'>
          <div className='title'>Vegetation Monitoring</div>
          <div className='content'>
            <p>
              Satellites act as our watchful eyes, monitoring the health of
              Earth's vegetation. From vast forests to local farms, they reveal
              subtle changes in health, like drought stress or deforestation. This
              information empowers us to protect and manage this vital resource.
            </p>
            <div className='getStarted'>
              <Link to='/vegetationmonitoring'>
                <button>Try Vegetation Monitoring</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;