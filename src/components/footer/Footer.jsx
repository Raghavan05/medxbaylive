import React, { useState } from 'react';
import { FaFacebookF, FaLinkedin, FaInstagram,FaYoutube } from 'react-icons/fa';
import { RiSendPlaneFill } from "react-icons/ri";
import logobrand from '../Assets/logobrand.png';
import './footer.css';
import { Link} from "react-router-dom";
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');



  const handleLinkClick = () => {
    window.scrollTo(0, 0);  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/submit-email`,
        { email },
        { withCredentials: true }
      );
      
      setMessage('Thank you for your subscription');
      setEmail('');
    } catch (error) {
    
      if (error.response && error.response.data.message === 'Email already exists') {
        setMessage('Email already exists');
      } else {
        setMessage('Error saving lead');
      }
    }
  };
  
  
  return (
    <footer className="custom-footer">
      <div className="custom-footer-container">
        <div className="custom-footer-logo">
        <a className="" href="https://medxbay.com">     <img className='gwaimage' src={logobrand}  alt="Description of the image" /></a>
  <div className="custom-footer-socials">
            <div className="custom-social-icon">
              <a href="https://www.facebook.com/profile.php?id=61558154772271&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </div>
            <div className="custom-social-icon">
              <a href="https://www.linkedin.com/company/medxbay/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
            <div className="custom-social-icon">
              <a href="https://www.instagram.com/medxbay?igsh=MWpiemdubG1ydHVv" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
            <div className="custom-social-icon">
              <a href="https://www.youtube.com/@MedxBaychannel" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="custom-footer-links">
          <div className="custom-footer-column">
            <h4 className='explore'>Explore</h4>
            <ul>
              <Link to="https://medxbay.com"onClick={handleLinkClick}><li>Home</li></Link>
              <Link to="/about/section" onClick={handleLinkClick}><li>About Us</li></Link>
              <Link to="/faq/section" onClick={handleLinkClick}><li>FAQs</li></Link>
              <Link to="https://community.medxbay.com/" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}><li>Community</li></Link>
            </ul>
          </div>
          <div className="custom-footer-column">
            <h4>Legal</h4>
            <ul>
            <Link to="/privacy" onClick={handleLinkClick}><li>Privacy Policy</li></Link>

   
              <Link to="/terms" onClick={handleLinkClick}><li>Terms of Service</li></Link>
              <Link to="/contact-us" onClick={handleLinkClick}><li>Contact</li></Link>
            </ul>
          </div>
          <div className="custom-footer-column">
            <h4>Subscribe</h4>
            <p className='para'>Subscribe to get the latest news from us</p>
            <form className="custom-subscribe-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <RiSendPlaneFill />
              </button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}

          </div>
        </div>
      </div>
      <div className="custom-footer-bottom">
        <p className='rights-reserved'>© 2024 MedxBay. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
