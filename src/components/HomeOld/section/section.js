// src/App.js

import React from 'react';
import Insights from '../Insight/Insights';

import { useEffect } from 'react';
import MiddlePart from '../MiddlePart';
import Whyus from '../WhyUs/Whyus'
import Nestednavbar from '../../Nestednavbar/Nestednavbar'
import Hero from '../Hero/Hero'

import Siri from '../siri/Siri';
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
      <Nestednavbar/>
  
      <Whyus/>
      <MiddlePart />
      <Siri/>
      <LogoSlider/>
      <Insights />

   
      {/* <TestimonialSlider/> */}


  
      

    </div>
  );
}

export default Section;
