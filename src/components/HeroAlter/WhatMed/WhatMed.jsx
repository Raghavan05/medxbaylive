import React, { useState, useEffect } from 'react';
import './whatmed.css';
import whatmedimg from '../Assets/whatmedimg.png';

const WhatMed = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  // Update the state based on the screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Initial check and event listener for resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobileView ? (
    <div className="MedxBayInfo-container-section">
      {/* Mobile View */}
      <h1>
        What is{' '}
        <span className="MedxBayInfo-highlight">
          <span className="MedxBayInfo-highlight-1">Med</span>
          <span className="MedxBayInfo-highlight-2">x</span>
          <span className="MedxBayInfo-highlight-1">Bay?</span>
        </span>
      </h1>
      <div className="MedxBayInfo-image-container">
        <img
          src={whatmedimg}
          alt="Smiling person"
          className="MedxBayInfo-image"
        />
      </div>
      <div className="MedxBayInfo-text-container">
        <p>
          MedxBay is the one-stop hub for modern healthcare. We bridge
          traditional, holistic, and digital health practices, offering
          everything from telemedicine to AI-driven tools that help patients
          get more personal, high-quality care. 
        </p>
        <p>
          We’re not just about appointments and records—we’re about empowering people with
          convenient, accurate, and actionable health solutions.
        </p>
      </div>
    </div>
  ) : (
    <div className="MedxBayInfo-container-section">
      {/* Desktop View */}
      <div className="MedxBayInfo-image-container">
        <img
          src={whatmedimg}
          alt="Smiling person"
          className="MedxBayInfo-image"
        />
      </div>
      <div className="MedxBayInfo-text-container">
        <h1>
          What is{' '}
          <span className="MedxBayInfo-highlight">
            <span className="MedxBayInfo-highlight-1">Med</span>
            <span className="MedxBayInfo-highlight-2">x</span>
            <span className="MedxBayInfo-highlight-1">Bay?</span>
          </span>
        </h1>
        <div>
          <p>
            MedxBay is the one-stop hub for modern healthcare. We bridge
            traditional, holistic, and digital health practices, offering
            everything from telemedicine to AI-driven tools that help patients
            get more personal, high-quality care.
          </p>
          <p>
            We’re not just about appointments and records—we’re about empowering people with
            convenient, accurate, and actionable health solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatMed;
