import React from "react";
import "./HeroChoosePath.css";
import HeroChooseSide from '../Assets/HeroAlterChoosePathSide.png'

const HeroChoosePath = () => {
  return (
    <>
      <div className="hero-choose-path-container">
        <div className="row hero-choose-path-container2">
          {/* <div className="col-1"></div> */}
          <div className="row hero-choose-path-sideimg col-3">
            <div className="col-2"></div>
            <h1 className="col-10">
              Choose your <span className="hero-choose-path-highlight">path</span>
            </h1>
            <img src={HeroChooseSide} alt="HeroChooseSide" className="col-12" />
          </div>
          <div className="hero-choose-path-subcontainer col-9">
            <div className="hero-choose-path-content">
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
            <div className="hero-choose-path-options">
              <div className="hero-choose-path-option patient">
                <span>Patient</span>
              </div>
              <div className="hero-choose-path-option healthcare-provider">
                <span>Healthcare Provider</span>
              </div>
              <div className="hero-choose-path-option enterprise">
                <span>Enterprise</span>
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
