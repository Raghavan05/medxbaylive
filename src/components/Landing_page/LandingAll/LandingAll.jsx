import React from 'react';
import Insights from '../Insight/Insights';
import Global from '../Globalaccess/Globalaccess';
import Patientscaring from '../Patientscaring/Patientscaring';
import FindBy from '../Findby/Findby';
import Redefine from '../Redefine/Redefine';
import Nestednavbar from '../Nestednavbar/Nestednavbar';
import Hero from '../Hero/Hero';
import LogoSlider from '../LogoSlider/LogoSlider';
import Lookingfor from '../Lookingfor/Lookingfor';
import Afya from '../Afya/Afya';
import Bmsupport from '../Bmsupport/Bmsupport';

function LandingAll() {
  return (
    <div
      style={{
        background: ' linear-gradient(180deg, rgba(235, 242, 255, 0.3) 0%, #FFFFFF 100%)'
      }}
    >
      <Hero />
      <Nestednavbar />
      <Lookingfor/>
      <Global />
      <FindBy />
      <Patientscaring />
      <Redefine />
      <Afya/>
      <Bmsupport/>
      <LogoSlider />
      <Insights />
      
      {/* <TestimonialSlider /> */}
    </div>
  );
}

export default LandingAll;
