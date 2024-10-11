import React, { useState,useEffect } from "react";
import "./Findby.css";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
// SPECIALITY
import doctorimg from "../Assets/doctorimg.png";
import labimg from "../Assets/labimg.png";
import heartbeat from "../Assets/heartbeatimg.png";
import MRIimg from "../Assets/MRIimg.png";
import puzzleimg from "../Assets/puzzleimg.png";
import teethimg from "../Assets/teethimg.png";
import testtubeimg from "../Assets/testtubeimg.png";
import xrayimg from "../Assets/xrayimg.png";

// CONDITION
import HeartDisease from "../Assets/Heart-Disease.png";
import SkinDisease from "../Assets/Skin-Disease.png";
import BloodConditions from "../Assets/Blood-Conditions.png";
import Cancer from "../Assets/Cancer.png";
import Chronicpain from "../Assets/Chronic-pain.png";
import Diabetes from "../Assets/Diabetes.png";
import EyeHealth from "../Assets/Eye-Health.png";
import HIVAIDS from "../Assets/HIV-AIDS.png";

const FindBy = () => {
  const [isSpeciality, setIsSpeciality] = useState(true);

  const handleToggle = () => {
    setIsSpeciality(!isSpeciality);
  };
  
  useEffect(() => {
    Aos.init();
  }, []);

  // Define the speciality and condition card data
  const specialityCards = [
    { name: "Dentistry", img: teethimg },
    { name: "Primary Care", img: doctorimg },
    { name: "Cardiology", img: heartbeat },
    { name: "MRI Resonance", img: MRIimg },
    { name: "Blood Test", img: testtubeimg },
    { name: "Psychologist", img: puzzleimg },
    { name: "Laboratory", img: labimg },
    { name: "X-Ray", img: xrayimg },
  ];

  const conditionCards = [
    { name: "Heart Disease", img: HeartDisease },
    { name: "Skin Disease", img: SkinDisease },
    { name: "Blood Conditions", img: BloodConditions },
    { name: "Cancer", img: Cancer },
    { name: "Chronic Pain", img: Chronicpain },
    { name: "Diabetes", img: Diabetes },
    { name: "Eye Health", img: EyeHealth },
    { name: "HIV/AIDS", img: HIVAIDS },
  ];

  return (
    <div className="findby-section">
      <h3 className="findby-heading"  data-aos="fade-down" data-aos-duration="2000">Find By :</h3>
      <div className="findby-category-toggle" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
        <span
          className={`findby-toggle-option ${isSpeciality ? "active" : ""}`}
        >
          SPECIALITY
        </span>
        <div className="findby-toggle-switch" onClick={handleToggle}>
          <div
            className={`findby-switch-indicator ${
              isSpeciality ? "left" : "right"
            }`}
          ></div>
        </div>
        <span
          className={`findby-toggle-option ${!isSpeciality ? "active" : ""}`}
        >
          CONDITION
        </span>
      </div>

      {/* Render cards based on the toggle state */}
      <div className="findby-card-container" data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-duration="2000">
        {(isSpeciality ? specialityCards : conditionCards).map((card, index) => (
          <div key={index} className="findby-card">
            <img
              src={card.img}
              alt={card.name}
              className="findby-card-icon"
            />
            <div className="findby-card-text">{card.name}</div>
          </div>
        ))}
      </div>

      <div className="findby-view-all-container" data-aos="fade-up" data-aos-duration="1000">
        <Link to="/Filters"><button className="findby-view-all-btn">View all</button></Link>
      </div>
    </div>
  );
};

export default FindBy;
