import React, {useState,useEffect} from 'react';
import "./HeroChoosePath.css";
import HeroChooseSide from '../Assets/HeroAlterChoosePathSide.png'
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
const HeroChoosePath = () => {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const options = [
    { id: 1, label: "Patient", className: "patient" },
    { id: 2, label: "Healthcare Provider", className: "healthcare-provider" },
    { id: 3, label: "Corporate", className: "corporate" },
    { id: 4, label: "Medical Supplier", className: "medical-supplier" },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + options.length) % options.length
    );
  };

  // Determine the two cards to display
  const visibleOptions = [
    options[currentIndex],
    options[(currentIndex + 1) % options.length],
  ];

  return isMobileView ? (
    <> 
      {/* Mobile View */}
      <div className="hero-choose-path-container">
        <div className="hero-choose-path-container2">

          <div className="hero-choose-path-and-content">
            <h2 className="hero-choose-path-title">Choose your <span className="hero-choose-path-highlight">path</span></h2>
            <p>
              Imagine if getting quality healthcare felt as easy as ordering your
              favorite coffee. MedxBay is here to make that vision a reality. We’re
              an integrated, global healthcare platform that brings patients,
              providers, and medical suppliers together in one seamless,
              user-friendly space.
            </p>
            <p>
              Whether you're a patient looking for trusted
              care, a provider aiming to streamline operations, or a supplier
              wanting to connect with healthcare professionals, MedxBay has your
              back.
            </p>
          </div>

          <div className="hero-choose-path-subcontainer">
            <div className="hero-choose-path-sideimg">
              <img src={HeroChooseSide} alt="HeroChooseSide"/>
            </div>

            <div className="hero-choose-path-options">
              <BiSolidLeftArrow onClick={handlePrev} size='1.5rem' className="hero-choose-path-left-arrow" />
              {visibleOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`hero-choose-path-option ${option.className} active`}
                >
                  <span>{option.label}</span>
                </div>
              ))}
              <BiSolidRightArrow onClick={handleNext} size='1.5rem' className="hero-choose-path-right-arrow" />
            </div>

          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Desktop View */}
      <div className="hero-choose-path-container">
        <div className="hero-choose-path-container2">

          <div className="hero-choose-path-and-content">
            <h2 className="hero-choose-path-title">Choose <br/>your <span className="hero-choose-path-highlight">path</span></h2>
            <p>
              Imagine if getting quality healthcare felt as easy as ordering your
              favorite coffee. MedxBay is here to make that vision a reality. We’re
              an integrated, global healthcare platform that brings patients,
              providers, and medical suppliers together in one seamless,
              user-friendly space. Whether you're a patient looking for trusted
              care, a provider aiming to streamline operations, or a supplier
              wanting to connect with healthcare professionals, MedxBay has your
              back.
            </p>
          </div>

          <div className="hero-choose-path-subcontainer">
            <div className="hero-choose-path-sideimg">
              <img src={HeroChooseSide} alt="HeroChooseSide"/>
            </div>

            <div className="hero-choose-path-options">
              <div className="hero-choose-path-option patient">
                <span>Patient</span>
              </div>
              <div className="hero-choose-path-option healthcare-provider">
                <span>Healthcare Provider</span>
              </div>
              <div className="hero-choose-path-option corporate">
                <span>Corporate</span>
              </div>
              <div className="hero-choose-path-option medical-supplier">
                <span>Medical Supplier</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  ); 
};

export default HeroChoosePath;
