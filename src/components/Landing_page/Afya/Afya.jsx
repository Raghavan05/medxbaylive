import React from 'react';
import './afya.css';
import Lottie from 'react-lottie';
import animationData from './lottie.json';
import tickicon from "../Assets/tickicon.png";

function Afya() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='siri-background'>
      <h1 className='introduction-afya'>
        Introducing <span className='introduction-afya-sub'>Afya</span>
      </h1>
      <p className='afya-explaination'>
        An advanced AI bot designed to significantly enhance the healthcare experience for both patients and providers <br />
        by offering smart, tailored support (Afya will launch in Q4 of 2024)
      </p>
      <div className='comming-soon-afya'>
        <div className='afya-siri-content'>
          <h2 className='siri-head'>For Patients</h2>
          <div className="siri-list">
            <img src={tickicon} className="afya-tick" alt="Tick" />
            <p>AI-driven provider recommendations simplify finding suitable healthcare professionals tailored to individual conditions.</p>
          </div>
          <div className="siri-list">
            <img src={tickicon} className="afya-tick" alt="Tick" />
            <p>Personalized health content and resources empower informed healthcare decisions and treatment strategies.</p>
          </div>
          <div className="siri-list">
            <img src={tickicon} className="afya-tick" alt="Tick" />
            <p>Automated appointment and medication reminders ensure adherence to treatment plans, enhancing health management effectiveness.</p>
          </div>
        </div>
        <div className='afya-zip-container'>
          <Lottie 
            options={defaultOptions}
            className='afya-zip'
          />
        </div>
        <div className='afya-siri-content'>
          <h2 className='siri-head'>For Providers</h2>
          <div className="siri-list">
            <img src={tickicon} className="afya-tick" alt="Tick" />
            <p>Administrative task automation, including scheduling follow-ups and reminders, reduces clerical workload, allowing more focus on patient care.</p>
          </div>
          <div className="siri-list">
            <img src={tickicon} className="afya-tick" alt="Tick" />
            <p>Symptom research and data curation enhance care accuracy and personalization, aiding in tailored treatment planning.</p>
          </div>
          <div className="siri-list">
            <img src={tickicon} className="afya-tick" alt="Tick" />
            <p>Efficient patient management through streamlined communication and progress updates improves care coordination, patient satisfaction, and treatment outcomes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Afya;
