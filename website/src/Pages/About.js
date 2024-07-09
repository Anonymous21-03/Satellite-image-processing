import React, { useEffect, useState } from 'react';
import './Styles/About.css';
import { Link } from 'react-router-dom';

const About = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const features = ['Change detection', 'Land cover Classification', 'Vegetation Monitoring'];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('about_us_head')) {
            setHeadingVisible(true);
          }
        } else {
          entry.target.classList.remove('visible');
          if (entry.target.classList.contains('about_us_head')) {
            setHeadingVisible(false);
          }
        }
      });
    }, { threshold: 0.2 });

    const fadeInElements = document.querySelectorAll('.fade-in');
    const slideUpElements = document.querySelectorAll('.slide-up');
    const zoomInElements = document.querySelectorAll('.zoom-in');
    const headingElement = document.querySelector('.about_us_head');

    fadeInElements.forEach((element) => observer.observe(element));
    slideUpElements.forEach((element) => observer.observe(element));
    zoomInElements.forEach((element) => observer.observe(element));
    observer.observe(headingElement);

    return () => {
      fadeInElements.forEach((element) => observer.unobserve(element));
      slideUpElements.forEach((element) => observer.unobserve(element));
      zoomInElements.forEach((element) => observer.unobserve(element));
      observer.unobserve(headingElement);
    };
  }, []);

  const handlePrevCard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCard((currentCard - 1 + features.length) % features.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handleNextCard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCard((currentCard + 1) % features.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="container">
      <div className="about_us_head">About Us</div>
      <div className="subhead fade-in">Unlocking Earth's Insights: Satellite Image Analysis Made Easy</div>
      <div className="mainbod fade-in">
        <div className="text-container">
          <p>
            We are a group of enthusiasts driven by a shared fascination with the potential of satellite image analysis. Witnessing the impact of relevant global issue - e.g., climate change, we became passionate about leveraging this technology to monitor environmental changes. This website showcases our project, which offers functionalities for change detection in satellite imagery and land cover classification. We believe this can be a valuable tool for researchers, environmental organizations, etc.
          </p>
        </div>
      </div>
      <div className="subhead slide-up">The Features we provide</div>
      <div className="feature-card-container">
        <button className="prev-card" onClick={handlePrevCard}>&#8592;</button>
        <div className={`feature-card zoom-in ${isTransitioning ? 'fade-out' : ''}`}>
          <div className="text-container">
            <div className="feature-name">{features[currentCard]}</div>
          </div>
        </div>
        <button className="next-card" onClick={handleNextCard}>&#8594;</button>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-links">
          <Link to='/'>Home</Link>
          <a href="#">About</a>
          <Link to='/contact'>Contact</Link>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/terms'>Terms and Conditions</Link>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} ISMEA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;