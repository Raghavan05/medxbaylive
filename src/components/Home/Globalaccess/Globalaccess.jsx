import React from "react";
import './Globalaccess.css';
import Globalimg from '../Assets/Globalimg.png';

function  Global() {
  return (
   <div className="Global-Access-section">
    <div className="Global-Access-heading">
      <h3>Global access<span className="Global-highlighted-text"> to Integrated care</span></h3>
    </div>
    <div className="Global-Access-image">
    <img src={Globalimg} alt="Global Image" />
    </div>
    <div className="Global-Access-text-content">
      <p>MedxBay is a global healthcare platform revolutionizing the healthcare 
        experience by offering integrated solutions that support patients, providers, 
        and medical suppliers across all stages of care. 
        Whether you need access to specialized medical services, 
        telehealth consultations, or holistic treatments,
        MedxBay ensures seamless, personalized healthcare—anywhere in the world. 
        By uniting diverse care modalities into a single digital platform, 
        we simplify healthcare delivery, enhance outcomes, 
        and make high-quality care accessible across borders.</p>
    </div>
   </div>
  );
}

export default Global;