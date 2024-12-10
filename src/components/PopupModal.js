import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupModal.css';
import SignupCard from './signup/signup';

const PopupModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  const handleShowPopup = () => {
    navigate('/signup')
    // setShowPopup(true);
  };
  
  const handleClosePopup = () => setShowPopup(false);
  
  const handleShowLogin = () => setShowLoginPopup(true);

  // Check sessionStorage to see if the modal has been shown before
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      setShowModal(true); // Show modal if the user hasn't seen it
      sessionStorage.setItem('hasSeenModal', 'true'); // Set the flag in sessionStorage
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="landingPage-modal-overlay">
          <div className="landingPage-modal-content">
            <button className="landingPage-closebtn" onClick={handleClose}>
              &times;
            </button>
            <h1>Welcome to Medxbay!</h1>
            <p>You’re almost there!</p>
            <p className='landingPage-modal-overlay-overview-para'>
              We’re excited to announce that MedxBay has just launched! 🚀 While we're live, we're still fine-tuning some features to make your experience even better. Thank you for your patience as we enhance the site for you. Want to see what’s in store? Check out our chatbot articles to learn more about the improvements we’re working on!
            </p>
            <button 
              className="landingPage-submitbtn"
              onClick={() => {
                handleShowPopup();  // Show the signup popup
                handleSubmit();     // Close the initial modal
              }}>
                Register Here
            </button>
          </div>
        </div>
      )}

      {/* Display SignupCard even after closing the initial modal */}
      {/* {showPopup && (
        <SignupCard show={showPopup} handleClose={handleClosePopup} openLoginModal={handleShowLogin} />
      )} */}
    </>
  );
};

export default PopupModal;
