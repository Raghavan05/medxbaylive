import React from 'react';
import './heropage.css';
import cardimg from './Assets/demo.jpeg';
import group from './Assets/group.png';
import big from './Assets/big.png';
import medium from './Assets/medium.png';
import Medx from './Medx/Medx';
import LogoSlider from './LogoSlider/LogoSlider';
import Insights from './Insight/Insights';


const HeroPage = () => {
  const cardData = [
    { title: "Patient", description: "Manage and access all healthcare information efficiently." },
    { title: "Doctor", description: "Seamlessly interact with patients and manage schedules." },
    { title: "Pharmacy", description: "Track prescriptions and streamline medicine delivery." },
    { title: "Hospital", description: "Ensure smooth operations with integrated systems." },
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
                  <button>Explore More</button>
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
            Get access to trusted providers worldwide, book telehealth visits, and tap into
            a library of verified health info—all from your phone or computer.
          </p>
        </div>
      </div>
      {/* Two Smaller Cards */}
      <div className="heropage-small-cards">
        {[1, 2].map((_, index) => (
          <div key={index} className="heropage-small-card">
            <div className="heropage-small-card-content">
              <h3>For Patients:</h3>
              <p>
                Get access to trusted providers worldwide, book telehealth visits, and tap
                into a library of verified health info—all from your phone or computer.
              </p>
            </div>
          </div>
        ))}
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
