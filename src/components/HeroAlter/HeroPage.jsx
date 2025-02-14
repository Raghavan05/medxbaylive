import React, { useState } from "react";
import "./HeroPage.css";
import brand from '../Assets/brand-logo copy.png'
import { Link, useNavigate } from "react-router-dom";
import LogoSlider from "./LogoSilder/LogoSlider";
import HeroChoosePath from "./HeroChoosePath/HeroChoosePath";
import HeroAlterNavbar from "./HeroAlterNavbar-old/HeroAlterNavbar";
import Insights from "./Insight/Insights";
import WhatMed from "./WhatMed/WhatMed";
import HWMIhappen from "./HWMIhappen/HWMIhappen";
import Companion from "./Companion/Companion";
import Navbar from "../Navbar/Navbar";
import DynamicMeta from "../DynamicMeta/DynamicMeta";
// import SignupCard from "../signup/signup";
// import LoginCard from "../login/login";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  const handleShowPopup = () => {
    navigate('/signup')
    // setShowPopup(true);
  }
  const handleClosePopup = () => setShowPopup(false);

  const handleShowLoginPopup = () => setShowLoginPopup(true);
  const handleCloseLoginPopup = () => setShowLoginPopup(false);

  const handleShowRegister = () => {
    setShowPopup(true);
  };

  const handleShowLogin = () => {
    setShowLoginPopup(true);
  };
  const handleLogin = (role) => {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("role", role);

  };

  return (
    <>
      <DynamicMeta
        title={"Medxbay"}
        description={"MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care."}
        image={null}
      />
      {/* <Navbar/> */}
      <HeroAlterNavbar />
      <div className="heroalter-container">
        <div className="heroalter-overlay"></div>
        <div className="heroalter-content">
          {/* <img src={brand} alt="MedBay Logo" className="heroalter-logo" /> */}
          <h3>From diagnosis through preventative care</h3>
          <h1>
            One-stop hub for <span >Integrated Care</span>
          </h1>
          <div className="heroalter-button-group">
            <Link to={'/Filters'}>
              <button className="btn primary">Find a Provider</button>
            </Link>
            <button className="btn secondary" onClick={handleShowPopup}>Join for Free</button>
          </div>
        </div>
      </div>
      <LogoSlider />
      <HeroChoosePath />
      <WhatMed />
      <Companion />
      <HWMIhappen />
      <Insights />

    </>
  );
};

export default Home;
