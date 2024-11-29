import React from 'react';
import './whatmed.css';
import whatmedimg from '../Assets/whatmedimg.png';

const WhatMed = () => {
  return (
    <div className="MedxBayInfo-container-section">
      <div className="MedxBayInfo-image-container">
        <img
          src={whatmedimg}
          alt="Smiling person"
          className="MedxBayInfo-image"
        />
      </div>
      <div className="MedxBayInfo-text-container">
        <h1>
          What is <span className="MedxBayInfo-highlight"><span className="MedxBayInfo-highlight-1" >Med</span><span className="MedxBayInfo-highlight-2">x</span ><span className="MedxBayInfo-highlight-1">Bay ?</span></span>
        </h1>
        <p>
          MedxBay is the one-stop hub for modern healthcare. We bridge
          traditional, holistic, and digital health practices, offering
          everything from telemedicine to AI-driven tools that help patients
          get more personal,high-quality care. We’re not just about
          appointments and records—we’re about empowering people
          with convenient, accurate, and actionable health solutions.
        </p>
      </div>
    </div>
  );
};

export default WhatMed;

