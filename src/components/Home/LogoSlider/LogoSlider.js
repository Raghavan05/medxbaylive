import React, { useEffect, useState } from 'react';
import './LogoSlider.css'; 
import staque from '../Assets/staque.png'; 
import Alliance from '../Assets/Alliance.png'; 
import healthwallet from '../Assets/healthwallet.png'; 
import carer from '../Assets/carer.png'; 




const logos = [
    { id: 1, src: staque, alt: 'Logo 1' },
    { id: 2, src: Alliance, alt: 'Logo 2' },

  { id: 3, src: healthwallet, alt: 'Logo 3' },
  { id: 4, src: carer, alt: 'Logo 4' },

  { id: 5, src: staque, alt: 'Logo 1' },
  { id: 6, src: Alliance, alt: 'Logo 2' },

{ id: 7, src: healthwallet, alt: 'Logo 3' },
{ id: 8, src: carer, alt: 'Logo 4' },


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
