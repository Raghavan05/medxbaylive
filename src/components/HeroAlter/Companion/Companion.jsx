import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './companion.css';
import MentalHealth from '../Assets/MentalHealth.jpeg';
import { toast,ToastContainer } from 'react-toastify';

const Companion = () => {

  const [isMobileView, setIsMobileView] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '',profession:'' });
  const navigate = useNavigate();

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


  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Submit data to Google Sheets
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your Google Apps Script URL
      const googleScriptURL = 'https://script.google.com/macros/s/AKfycbx07ulCzKKKsydO73BEcCCQ0LP04lvdByUlegelYlpm-RjiVYxB1mqLveoyhRuJaUAhAQ/exec';

      const response = await fetch(googleScriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors', // Bypass CORS check
      });
      console.log(response);
      
        toast.info('Session details submitted successfully!');
        setShowPopup(false);
        window.location.href = "https://mentalhealth.medxbay.com/";

  } catch (error) {
    console.error('Error submitting data:', error);
    alert('An error occurred while submitting the details.');
  }
};

  return isMobileView ? (
    <>
      {/* Mobile View */}
      <ToastContainer/>
      <div className='companion-container-whole-section-container'>
        <div className='companion-container-whole-section'>
          <div>
            <h1>
              Mental Health <span className="companion-color-high">Companion</span>
            </h1>
            <p className='companion-fingertips'>24/7 support at your fingertips</p>
          </div>
            
          <div className="companion-container-section">
            <div className="companion-text-section">
              <p className="companion-description">
                Designed for those moments when speaking to someone feels too
                overwhelming. Our AI companion listens to the tone of your voice,
                offering instant support tailored to your needs, helping you manage
                stress or anxiety—no judgment, just comfort.
              </p>
              <p className="companion-description">
                Whether you're feeling down, overwhelmed, or simply need to talk, our
                AI is here 24/7, helping you process your emotions in real time. It's
                like having a supportive friend who understands you, always ready
                when you're not ready for a conversation with a person.
              </p>
              <div className="companion-image-section">
                <img
                  src={MentalHealth}
                  alt="Person holding a phone"
                  className="companion-image"
                />
              </div>

              <button className="begin-session-button" onClick={() => setShowPopup(true)}>
                Begin session
              </button>

              <p className="note">Must be a MedxBay member... psst it’s free!</p>
            </div>
            
          </div>
        </div>  

        {/* Popup Form */}
        {showPopup && (
          <div className="companion-popup-overlay">
            <div className="companion-popup-form">
              <h2>Begin Session</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    placeholder='Enter Your Name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    placeholder='Enter Your Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Contact Number:
                  <input
                    type="tel"
                    name="contact"
                    placeholder='Enter Your Contact Number'
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </label>
                {/* <label>
                  Profession:
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                  />
                </label> */}
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <>
    {/* Desktop View */}
    <ToastContainer/>
    <div className='companion-container-whole-section-container'>
      <div className='companion-container-whole-section'>
        <div>
          <h1>
            Mental Health <span className="companion-color-high">Companion</span>
          </h1>
          <p className='companion-fingertips'>24/7 support at your fingertips</p>
        </div>
          
        <div className="companion-container-section">
          <div className="companion-text-section">
            <p className="companion-description">
              Designed for those moments when speaking to someone feels too
              overwhelming. Our AI companion listens to the tone of your voice,
              offering instant support tailored to your needs, helping you manage
              stress or anxiety—no judgment, just comfort.
            </p>
            <p className="companion-description">
              Whether you're feeling down, overwhelmed, or simply need to talk, our
              AI is here 24/7, helping you process your emotions in real time. It's
              like having a supportive friend who understands you, always ready
              when you're not ready for a conversation with a person.
            </p>
            <button className="begin-session-button" onClick={() => setShowPopup(true)}>
              Begin session
            </button>
            <p className="note">Must be a MedxBay member... psst it’s free!</p>
          </div>
          <div className="companion-image-section">
            <img
              src={MentalHealth}
              alt="Person holding a phone"
              className="companion-image"
            />
          </div>
        </div>
      </div>  

      {/* Popup Form */}
      {showPopup && (
        <div className="companion-popup-overlay">
          <div className="companion-popup-form">
            <h2>Begin Session</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder='Enter Your Name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder='Enter Your Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Contact Number:
                <input
                  type="tel"
                  name="contact"
                  placeholder='Enter Your Contact Number'
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </label>
              {/* <label>
                Profession:
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                />
              </label> */}
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Companion;
