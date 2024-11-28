import React from 'react';
import './heropage.css';
import cardimg from './Assets/demo.jpeg';
import group from './Assets/group.png';
import big from './Assets/big.png';
import medium from './Assets/medium.png';
import Medx from './Medx/Medx';
import LogoSlider from './LogoSlider/LogoSlider';
import Insights from './Insight/Insights';
import { Link } from 'react-router-dom';


const HeroPage = () => {
  const cardData = [
    { title: "Patient", description: "Manage and access all healthcare information efficiently." ,url : "/patients"},
    { title: "Provider", description: "Seamlessly interact with patients and manage schedules." ,url:"/doctor/physician"},
    { title: "Supplier", description: "Track prescriptions and streamline medicine delivery." ,url:"/doctor/physician"},
    { title: "Corporate", description: "Ensure smooth operations with integrated systems." ,url:"/enterprise"},
  ];

  return (
    <div className='heropage-container-section'>
      {/* First Section */}
      <div className='heropage-first-container-section'>
        <div className='heropage-content'>
          <h1>Your All-In-One</h1>
          <h2>Integrated Healthcare <br /> Ecosystem</h2>
        </div>
      </div>

      {/* Second Section */}
      <div className='heropage-second-container-section'>
        <div className="heropagenew-card-flex">
          <div className='heropagenew-card-flex-head-box'>
            {cardData.map((card, index) => (
              <div key={index} className="heropagenew-orginal-card">
                <img src={cardimg} alt={`${card.title}`} />
                <div className="heropagenew-four-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link to={card.url}>
                  <button>Explore More</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className='heropage-third-container-section'>
        <div className='heropage-third-container'>
          <div className="heropage-third-section-content">
            <h2>What <span>MedxBay</span> is</h2>
            <p>
              MedxBay is the one-stop hub for modern healthcare.<br />
              We bridge traditional, holistic, and digital health practices,<br />
              offering everything from telemedicine to AI-driven tools <br />
              that help patients get more personal, high-quality care.<br />
              We’re not just about appointments and records—we’re <br />
              about empowering people with convenient, accurate, and <br />
              actionable health solutions.
            </p>
            <button className='heropage-third-container-button-one'>Learn More</button>
          </div>
          <div className='heropage-third-section-image'>
            <img src={group} alt="Third Section Image" className='heropage-third-image' />
          </div>
        </div>
      </div>

      {/* Fourth Section */}
 {/* Fourth Section */}
<div className="heropage-fourth-container-section">
  <div className="heropage-fourth-container">
    <h2>See How MedxBay Benefits You</h2>
    <div className="heropage-fourth-grid">
      {/* Large Card */}
      <div className="heropage-large-card">
        <div className="heropage-large-card-content">
          <h3>For Patients:</h3>
          <p>
          Get access to trusted providers worldwide, book telehealth visits, and tap into a library of verified health info—all from your phone or computer.
          </p>
        </div>
      </div>
      {/* Two Smaller Cards */}
      <div className="heropage-small-cards">
        {/* {[1, 2].map((_, index) => ( */}
          <div className="heropage-small-card">
            <div className="heropage-small-card-content">
              <h3>For Providers:</h3>
              <p>
              Say goodbye to endless paperwork with automated scheduling, billing, and secure patient messaging, so you can focus on what matters most.
              </p>
            </div>
          </div>
          <div className="heropage-small-card">
            <div className="heropage-small-card-content">
              <h3>For Suppliers:</h3>
              <p>
              Connect with healthcare providers and showcase your products through our platform, where you'll have direct access to those who need you most.
              </p>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  </div>
</div>


{/* fifth section */}


<div className='heropage-fifth-container-section'>
  <div className='heropage-fifth-container'>
    <h2>How We Make It Happen</h2>
    <div className='heropage-fifth-content'>
      <div className='heropage-fifth-item'>
        <h3><span>01</span> Advanced Technology</h3>
        <p>
          We leverage state-of-the-art technology to break down barriers in healthcare. From innovative tools to seamless connections, we simplify the healthcare experience for everyone.
        </p>
      </div>
      <hr />
      <div className='heropage-fifth-item'>
        <h3><span>02</span> Human Touch</h3>
        <p>
          We believe in blending tech with compassion. Our commitment ensures personalized care and meaningful interactions every step of the way.
        </p>
      </div>
      <div className='heropage-fifth-item'>
        <h3><span>03</span> Stress-Free Systems</h3>
        <p>
          Say goodbye to fragmented systems! MedxBay streamlines processes, making healthcare management easier and more efficient.
        </p>
      </div>
      <div className='heropage-fifth-item'>
        <h3><span>04</span> Accessibility for All</h3>
        <p>
          We're passionate about expanding access to quality healthcare, especially for underserved communities, aligning with global wellness goals.
        </p>
      </div>
    </div>
  </div>
</div>
<Medx/>
<LogoSlider/>
<Insights/>
</div>
  );
};

export default HeroPage;
