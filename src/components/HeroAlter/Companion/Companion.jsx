import React from 'react';
import './companion.css';
import MentalHealth from '../Assets/MentalHealth.jpeg';

const Companion = () => {
  return (
    <div className='companion-container-whole-section-container'>
      <div className='companion-container-whole-section'>
        <h1>Mental Health <span className="companion-color-high">Companion</span></h1>
        <p className='companion-fingertips'>24/7 support at your fingertips</p>
          
        <div className="companion-container-section">
          <div className="companion-text-section">
            <p className="companion-description">
              Designed for those moments when speaking to someone feels too
              overwhelming. Our AI companion listens to the tone of your voice,
              offering instant support tailored to your needs, helping you manage
              stress or anxiety—no judgment, just comfort.
            </p>
            <p className="companion-description">
              Whether you're feeling down, overwhelmed, or simply need to talk, our
              AI is here 24/7, helping you process your emotions in real time. It's
              like having a supportive friend who understands you, always ready
              when you're not ready for a conversation with a person.
            </p>
            <button className="begin-session-button">Begin session</button>
            <p className="note">Must be a MedxBay member... psst it’s free!</p>
          </div>
          <div className="companion-image-section">
            <img
              src={MentalHealth}
              alt="Person holding a phone"
              className="companion-image"
            />
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Companion;
