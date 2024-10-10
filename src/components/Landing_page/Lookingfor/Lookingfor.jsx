import React, { useState } from 'react';
import './lookingfor.css';
import AestheticIcon from '../Assets/lookingaesthetic.png'; 
import HospitalIcon from '../Assets/lookingclinic.png';
import ProviderIcon from '../Assets/lookingdoc.png'; 
import LabsIcon from '../Assets/lookinglab.png'; 
import MedicalStoreIcon from '../Assets/lookingmedical.png';
import SurgeryIcon from '../Assets/lookingsurgery.png';

const Lookingfor = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const items = [
    { name: 'Providers', icon: ProviderIcon },
    { name: 'Labs', icon: LabsIcon },
    { name: 'Hospital / Clinic', icon: HospitalIcon },
    { name: 'Medical store', icon: MedicalStoreIcon },
    { name: 'Aesthetic', icon: AestheticIcon },
    { name: 'Surgery', icon: SurgeryIcon },
  ];

  return (
    <div className="looking-container">
      <h2>You may be <span className="looking-highlight">looking for</span></h2>
      <div className="looking-card-container">
        {items.map((item, index) => (
          <div
            key={index}
            className="looking-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={item.icon} alt={item.name} className="looking-card-icon" />
            <p className="looking-card-text">{item.name}</p>
          </div>
        ))}
        {/* Default underline */}
        <div className="looking-container-underline"></div>
        {/* Hover underline */}
        <div
          className="looking-container-underline-hover"
          style={{
            width: hoveredIndex !== null ? `calc(100% / ${items.length})` : '0',
            left: hoveredIndex !== null ? `calc(100% / ${items.length} * ${hoveredIndex})` : '0',
            backgroundColor: hoveredIndex !== null ? 'rgba(1, 103, 255, 1)' : 'transparent',
          }}
        />
      </div>
    </div>
  );
};

export default Lookingfor;
