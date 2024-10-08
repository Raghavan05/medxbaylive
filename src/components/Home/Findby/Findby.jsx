import React, { useState } from "react";
import "./Findby.css";
import doctorimg from '../Assets/doctorimg.png';
import labimg from '../Assets/labimg.png';
import MRIimg from '../Assets/MRIimg.png';
import puzzleimg from '../Assets/puzzleimg.png';
import teethimg from '../Assets/teethimg.png';
import testtubeimg from '../Assets/testtubeimg.png';
import xrayimg from '../Assets/xrayimg.png';
import { FaHeartbeat } from "react-icons/fa";

const FindBy = () => {
  const [isSpeciality, setIsSpeciality] = useState(true);

  const handleToggle = () => {
    setIsSpeciality(!isSpeciality);
  };

  return (
    <div className="findby-section">
      <h3 className="findby-heading">Find By :</h3>
      <div className="findby-category-toggle">
        <span className={`findby-toggle-option ${isSpeciality ? "active" : ""}`}>
          SPECIALITY
        </span>
        <div className="findby-toggle-switch" onClick={handleToggle}>
          <div
            className={`findby-switch-indicator ${isSpeciality ? "left" : "right"}`}
          ></div>
        </div>
        <span className={`findby-toggle-option ${!isSpeciality ? "active" : ""}`}>
          CONDITION
        </span>
      </div>

      <div className="findby-card-container">
        {[
          { name: "Dentistry", img: teethimg },
          { name: "Primary Care", img: doctorimg },
          { name: "Cardiology", icon: <FaHeartbeat className="heartbeat-icon" /> }, // Using FaHeartbeat for Cardiology
          { name: "MRI Resonance", img: MRIimg },
          { name: "Blood Test", img: testtubeimg },
          { name: "Psychologist", img: puzzleimg },
          { name: "Laboratory", img: labimg },
          { name: "X-Ray", img: xrayimg }
        ].map((card, index) => (
          <div key={index} className="findby-card">
            {card.icon ? (
              <div className="findby-card-icon">{card.icon}</div>
            ) : (
              <img
                src={card.img}
                alt={card.name}
                className="findby-card-icon"
              />
            )}
            <div className="findby-card-text">{card.name}</div>
          </div>
        ))}
      </div>

      <div className="findby-view-all-container">
        <button className="findby-view-all-btn">View all</button>
      </div>
    </div>
  );
};

export default FindBy;
