// src/App.js

import React from 'react';
import Insights from '../Insight/Insights';

import { useEffect } from 'react';
import Global from '../Globalaccess/Globalaccess';
import Patientscaring from '../Patientscaring/Patientscaring';
import FindBy from '../Findby/Findby';
import Redefine from '../Redefine/Redefine';
import Nestednavbar from '../../Nestednavbar/Nestednavbar'
import Hero from '../Hero/Hero'

import TestimonialSlider from '../section5/TestimonialSlider'
import LogoSlider from '../LogoSlider/LogoSlider';
// import Insights from '../section.6/Appp';

function Section() {
  useEffect(() => {
    document.title = "MedxBay";
}, []);
  return (
    <div className="Container">
      <Hero/>
      {/* <Nestednavbar/> */}
      <Global/>
      <FindBy/>
      <Patientscaring/>
      <Redefine/>
      <LogoSlider/>
      <Insights />

   
      {/* <TestimonialSlider/> */}


  
      

    </div>
  );
}

export default Section;
