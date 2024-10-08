import React, { useEffect, useState } from 'react';
import './LogoSlider.css'; 
import asthma from '../../../assests/asthma-condition.jpg'; 
import care from '../../../assests/care.png'; 
import exe from '../../../assests/New.png'; 
import staque from '../../../assests/staque.png'; 
import wallet from '../../../assests/wallet.png'; 
import carer from '../../../assests/carer.png'; 


const logos = [
    { id: 1, src: exe, alt: 'Logo 3' },
    { id: 2, src: carer, alt: 'Logo 4' },

  { id: 3, src: staque, alt: 'Logo 2' },
  { id: 4, src: care, alt: 'Logo 1' },

  { id: 5, src: exe, alt: 'Logo 3' },
  { id: 6, src: carer, alt: 'Logo 4' },

{ id: 7, src: staque, alt: 'Logo 2' },
{ id: 8, src: care, alt: 'Logo 1' },



];

const LogoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === logos.length - 4 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="logo-slider">
        <h3 className='logo-titile'>Our  <span>Partners </span></h3>
        <p className='logo-text-home'>We believe that collaboration fuels innovation, 
          allowing us to deliver the ultimate value to our customers. 
          By working alongside our esteemed partners,
           we delve into new possibilities, 
           driving progress and creating lasting impact.</p>
      <div className="logo-track" style={{ transform: `translateX(${-currentIndex * (100 / 4)}%)` }}>
        {logos.map((logo) => (
          <div key={logo.id} className="logo-slide">
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;