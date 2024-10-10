import React from "react";
import './Globalaccess.css'; 
import Globalaccessone from '../Assets/globalaccess-image-one.png';
import Globalaccesssecond from '../Assets/globalaccess-image-second.png';
import Globalaccessthird from '../Assets/globalaccess-image-third.png';
import Globalaccessfour from '../Assets/globalaccess-image-four.png';
function  Globalaccess() {
  return (
    <div className="healthcare-section">
      <div className="images-section">
        <div className="image-row">
          <img src={Globalaccessone} alt="Doctor team" className="image-item" />
          <img src={Globalaccesssecond} alt="Consultation" className="image-item" />
        </div>
        <div className="image-row">
          <img src={Globalaccessthird} alt="Healthcare massage" className="image-item" />
          <img src={Globalaccessfour} alt="Bandage care" className="image-item" />
        </div>
      </div>

      <div className="text-section">
        <h2>Global access to <span className="highlight">Integrated care</span></h2>
        <p>
          MediBray is a global healthcare platform revolutionizing the healthcare experience
          by offering integrated solutions that support patients, providers, and medical
          suppliers across all stages of care. Whether you need access to specialized
          medical services, telehealth consultations, or holistic treatments, MediBray
          ensures seamless, personalized healthcare—anywhere in the world. By uniting
          diverse care modalities into a single digital platform, we simplify healthcare
          delivery, enhance outcomes, and make high-quality care accessible across borders.
        </p>
      </div>
    </div>
  );
}

export default Globalaccess;