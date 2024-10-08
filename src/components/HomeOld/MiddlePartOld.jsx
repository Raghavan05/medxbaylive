import React, { useEffect,useRef,useState} from 'react';
import maledoc3 from '../../assests/img/maledoc3.png';
import './MiddlePart.css';
// import maledoc3 from './assests/img/maledoc3.png'
// import doctorProfile1 from './assests/img/Ellipse-30.png'
import doctorProfile1 from '../../assests/img/Ellipse-30.png'
import { Link } from 'react-router-dom';
import doctorProfile2 from '../../assests/img/doctor-profile-2.png'
import doctorProfile3 from '../../assests/img/Ellipse-29.png'
import doctorProfile4 from '../../assests/img/doctor-profile-4.png'
import smallbar from '../../assests/img/smallbar.png'
import largebar from '../../assests/img/largebar.png'
import './MiddlePart.css'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCard from '../login/login';
// import yunche3 from '../src/assests/img/yunche2.png'
import SignupCard from '../signup/signup';
import midyunche from '../../../src/assests/img/midyunche.png'
const MiddlePart = () => {
  const revealedCardsRef = useRef(new Set()); // To track revealed cards
  const handleClick = () =>{
    window.scrollTo(0,0);
  };

  const handleShowPopup = () => setShowPopup(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const handleCloseLoginPopup = () => setShowLoginPopup(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleCloseLoginCard = () => {
    setIsRegisterClicked(false);
  };
  const handleSignInClick = () => {
    setIsSignInClicked(true);
    setIsRegisterClicked(false);
  };
  const handleCloseRegister = () => {
    setShowPopup(false);
  };
  const handleShowLogin = () => {
    setShowLoginPopup(true);
  };
  const handleClosePopup = () => setShowPopup(false);

  const handleShowRegister = () => {
    setShowPopup(true);
  };
  const handleLogin = (role) => {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('role', role);

    setIsLoggedIn(true);
    setUserRole(role);
    setIsSignInClicked(false); 
    setIsRegisterClicked(false); 
    handleCloseLoginPopup(); 
    handleClosePopup(); 
  };

  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.maledoc-card-details, .homepageFemale-card-details');

      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom >= 0 && !revealedCardsRef.current.has(element)) {
          element.classList.add('reveal'); // Add reveal class
          revealedCardsRef.current.add(element); // Mark as revealed
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.maledoc-card-details');
      const reveal2Elements = document.querySelectorAll('.homepageFemale-card-details');
      
      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom >= 0) {
          element.classList.add('.maledoc-card-details');
        }
      });
      
      reveal2Elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom >= 0) {
          element.classList.add('.maledoc-card-details');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="homepage-doctor-section">
      <div className="homepage-male-content">
        <div className="text-content">
          <h2 className="maledoc-heading">Together,<span className="home-highlighted-text"> We Revolutionize Healthcare</span></h2>
          <p className="home-maledoc-description">
          In the rapidly evolving world of healthcare, MedxBay is designed with you in mind.
            We see the strain of endless paperwork, fragmented systems, and missed patient connections.
            These hurdles can add to an already demanding environment, but with MedxBay, you are no longer navigating this alone.
            Our platform is built to lift the burden, so you can focus on what you do best: caring for your patients.
          </p>
          <Link to="/enterprise" onClick={handleClick} >Learn More</Link>
        </div>
        <div className="image-content">
    <img src={maledoc3} alt="Doctor" className="doctor-image" />
    <div className='maledoc-card-details'> 
        <div className='maledoc-info-card1'>
            <img src={doctorProfile3} alt="Doctor" className="maledoc-image1" />
            <div className='maledoc-info'>
                <p className='maledoc-card-name'>Dr. Mehmet Akinci</p>
                <div className='doctor-bar-info'>
                    <p className='doctor-bar-info1'></p>
                    <p className='doctor-bar-info2'></p>
                </div>
            </div>
        </div>
        <div className='maledoc-info-card2'>
          <div className='home-maledoc-cardsection'>
            <img src={doctorProfile1} alt="Doctor" className="maledoc-image1" />
            <div className='maledoc-info'>
                <p className='maledoc-card-name'>Dr. Andrew Miller</p>
                <div className='doctor-bar-info'>
                    <p className='doctor-bar-info1'></p>
                    <p className='doctor-bar-info2'></p>
                </div>
            </div>
            </div>
            <div className='home-maledoc-cardsection'>
            <img src={doctorProfile2} alt="Doctor" className="maledoc-image1" />
            <div className='maledoc-info'>
                <p className='maledoc-card-name'>Dr. Cameron Wilson</p>
                <div className='doctor-bar-info'>
                    <p className='doctor-bar-info1'></p>
                    <p className='doctor-bar-info2'></p>
                </div>
               </div>
            </div>
          </div>
       </div>
     </div>
</div>
<div className="homepageFemale-content">
    <div className="homepageFemale-image-content">
        <img src={midyunche} alt="Doctor" className="homepageFemale-doctor-image" />
        <div className="homepageFemale-card-details">
            <div className="homepageFemale-info-card">
              <div className='homepageFemale-card-section'>
                <img src={doctorProfile4} alt="Doctor" className="homepageFemale-image" />
                <div className="homepageFemale-info">
                    <p className="homepageFemale-card-name">Mamtha</p>
                    <div className="homepageFemale-bar-info">
                        <p className="homepageFemale-bar-info1"></p>
                        <p className="homepageFemale-bar-info2"></p>
                    </div>
                </div>
                </div>
                <p className="homepageFemale-card-name2">Feedback</p>
                <div className="homepageFemale-bar-info">
                        <p className="homepageFemale-bar-info3"></p>
                        <p className="homepageFemale-bar-info4"></p>
                    </div>
                    <div className="homepageFemale-bar-info">
                        <p className="homepageFemale-bar-info3"></p>
                        <p className="homepageFemale-bar-info4"></p>
                    </div>
            </div>
        </div>
    </div>
    <div className="homepageFemale-text-content">
        <h2 className="homepageFemale-heading">Discover a Better Way <span className="homepageFemale-highlighted-text">to Manage Your Health</span></h2>
        <p className="homepageFemale-description">
            MedxBay is your all-in-one platform for finding trusted healthcare providers, 
            booking appointments with ease, 
            and staying connected to your care—all from the comfort of home. 
            Whether you're looking for in-person visits or telehealth consultations, 
            MedxBay helps you access the right care, manage your health records, 
            and communicate securely with your providers. 
            Take control of your healthcare journey with accurate,
            reliable information and tools designed to fit your needs.
        </p>
        <Link onClick={handleShowPopup}>Sign Up</Link>
    </div>
</div>

                <SignupCard 
                show={showPopup} 
                handleClose={handleClosePopup}
                 openLoginModal={handleShowLogin}/>
                        <LoginCard 
          show={showLoginPopup} 
          handleClose={handleCloseLoginPopup} 
          openRegisterModal={handleShowRegister} 
          handleLogin={handleLogin}
        />

</div>
  );
};

export default MiddlePart;
