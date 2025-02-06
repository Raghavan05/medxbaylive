import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import './signup.css';
import schedule from '../Assets/schedule.svg'
import meds from '../../assests/img/meds.svg';
import stethoscope from '../../assests/img/stethoscope.svg';
import scheduletwo from '../../assests/img/schedule-two.svg';
import doctorconsultation from '../Assets/doctorconsultation .svg';
import medicalexamsvg from '../Assets/medicalexamsvg.svg';
import heartbeat from '../Assets/heartbeat.svg';
import logobrand from '../Assets/logobrand.png'
import curvedesign from '../../assests/img/curvedesign.svg'
import curvedsigntwo from '../../assests/img/curvedsigntwo.svg';
import google from '../../assests/img/google.png'
import apple from '../../assests/img/apple.png'
import patientRole from '../Assets/patient_role.png'
import doctorRole from '../Assets/doctor_role.png'
import corporateRole from '../Assets/corporate_role.png'
import supplierRole from '../Assets/supplier_role.png'
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SignupCard = ({ show, handleClose, openLoginModal }) => {
  useEffect(() => {
    import('./signup.css');
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const typedElement = useRef(null);
  const typedElementTwo = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [selectedRole, setSelectedRole] = useState('Patient'); // New state for selected role

  useEffect(() => {
    if (typedElement.current && show) {
      const options = {
        strings: ['Greetings! 👋 Book your visit <br>today. 📅'],
        typeSpeed: 50,
        backSpeed: 50,
        showCursor: false,
      };

      const typed = new Typed(typedElement.current, options);

      return () => {
        typed.destroy();
      };
    }
  }, [show]);


  useEffect(() => {
    if (typedElementTwo.current && show) {
      const optionsTwo = {
        strings: ['Hey! 😊 Hope you\'re well! 🌟'],
        typeSpeed: 50,
        backSpeed: 50,
        showCursor: false,
      };

      const typedTwo = new Typed(typedElementTwo.current, optionsTwo);

      return () => {
        typedTwo.destroy();
      };
    }
  }, [show]);


  const handleGoogleSignIn = (role) => {
    setIsLoading(true);
    const rolePath = role.toLowerCase();
    const url = `${process.env.REACT_APP_BASE_URL}/auth/google/${rolePath}?state=${JSON.stringify({ role })}`;
    window.location.href = url;
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const name = urlParams.get('name');
    const id = urlParams.get('id');
    const email = urlParams.get('email');
    const userSubscriptionType = urlParams.get('userSubscriptionType');
    const userSubscriptionVerification = urlParams.get('userSubscriptionVerification');
    if (role && name && id) {
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userName', name);
      sessionStorage.setItem('userId', id);
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('subscriptionType', userSubscriptionType);
      sessionStorage.setItem('subscriptionVerification', userSubscriptionVerification);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);



  const register = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let user;
    let endpoint;

    // Define the endpoint and request body based on the selected role
    if (selectedRole === 'Provider') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/auth/signup/doctor`;
      user = { name, email, phoneNumber, password };
    } else if (selectedRole === 'Patient') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/auth/signup/patient`;
      user = { name, email, phoneNumber, password };
    } else if (selectedRole === 'Supplier') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/supplier/register`;
      user = { name, contactEmail : email, phone : phoneNumber, password };
    } else if (selectedRole === 'Corporate') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/corporate/signup`;
      user = { corporateName: name, email, mobileNumber : phoneNumber, password };
    } else {
      console.error("Invalid user type");
      setIsSubmitting(false);
      return;
    }

    if (validateForm()) {
      try {
        const res = await axios.post(endpoint, user);
        toast.info("Registration successful! Please check your email and verify.", {
          position: "top-center",
          closeButton: true,
          progressBar: true,
          className: 'toast-sign toast-success',
          autoClose: 5000,

        });


        setName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        handleClose();
      } catch (err) {
        console.error("Error during registration:", err);
        if (err.response) {
          if (err.response.status === 400 && err.response.data.error) {
            if (err.response.data.error.includes("User already exists")) {
              toast.info("User already exists. Please use a different email.", {
                closeButton: true,
                progressBar: true,
                className: 'toast-center toast-success',
              });
            } else {
              toast.info(err.response.data.error, {
                closeButton: true,
                progressBar: true,
                className: 'toast-center toast-success',

              });
            }
          } else {
            toast.info("Registration failed. Please try again.", {
              closeButton: true,
              progressBar: true,
              className: 'toast-center toast-success',

            });
          }
        } else {
          toast.info("Registration failed. Please try again.", {
            closeButton: true,
            progressBar: true,
            className: 'toast-center toast-success',

          });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };


  const [isProvider, setIsProvider] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);

  const validateForm = () => {
    return validateName(name) && validateEmail(email) && validateMobile(phoneNumber) && validatePassword(password);
  };

  const handleProviderClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsProvider(true);
      setIsLoading(false);
    }, 500);
  };

  const handlePatientClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsPatient(true);
      setIsLoading(false);
    }, 500);
  };

  const handleCorporateClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsCorporate(true);
      setIsLoading(false);
    }, 500);
  };

  const handleSupplierClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSupplier(true);
      setIsLoading(false);
    }, 500);
  };


  const validateName = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setNameError('Name is required.');
      return false;
    }

    if (trimmedValue[0] === ' ') {
      setNameError('Name should not start with a space.');
      return false;
    }

    if (!/^[a-zA-Z ]+$/.test(trimmedValue)) {
      setNameError('Name should only contain alphabets.');
      return false;
    }

    if (trimmedValue.includes('  ')) {
      setNameError('Name should not have more than 2 consecutive spaces.');
      return false;
    }

    if (trimmedValue.length < 3 || trimmedValue.length > 50) {
      setNameError('Name should be between 3 to 50 characters.');
      return false;
    }

    setNameError('');
    return true;
  };

  const validateEmail = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setEmailError('Email is required.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedValue)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validateMobile = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setMobileError('Mobile number is required.');
      return false;
    }

    // if (!/^\d{10}$/.test(trimmedValue)) {
    //   setMobileError('Please enter a valid 10-digit mobile number.');
    //   return false;
    // }

    setMobileError('');
    return true;
  };

  const validatePassword = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setPasswordError('Password is required.');
      return false;
    }

    if (trimmedValue.length < 6) {
      setPasswordError('Password should be at least 6 characters.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    validateMobile(value);
  };
  const handlePhoneChange = (value) => {
    setPhoneNumber(value);

  };


  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };


  return (
    <>
        <ToastContainer/>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Title>
          <span className="model-header">Sign up</span>{' '}
          <span className="model-header-sub">
            Sign up as{' '}
            <span style={{ color: '#0167FF', marginLeft: '8px' }}>{selectedRole}</span>
          </span>
        </Modal.Title>
        <button type="button" className="btn-close-custom" aria-label="Close" onClick={handleClose}>
          x
        </button>

        <Modal.Body>
        <div className="role-selection-container">
                <div className="role-selection-grid">
                  <div
                    className={`role-card ${selectedRole === 'Patient' ? 'active-role' : ''}`}
                    onClick={() => handleRoleClick('Patient')}
                  >
                    <img src={patientRole} alt="Patient" className="role-icon" />
                    <span className="role-label">Patient</span>
                  </div>
                  <div
                    className={`role-card ${selectedRole === 'Provider' ? 'active-role' : ''}`}
                    onClick={() => handleRoleClick('Provider')}
                  >
                    <img src={doctorRole} alt="Provider" className="role-icon" />
                    <span className="role-label">Provider</span>
                  </div>
                  <div
                    className={`role-card ${selectedRole === 'Supplier' ? 'active-role' : ''}`}
                    onClick={() => handleRoleClick('Supplier')}
                  >
                    <img src={supplierRole} alt="Supplier" className="role-icon" />
                    <span className="role-label">Supplier</span>
                  </div>
                  <div
                    className={`role-card ${selectedRole === 'Corporate' ? 'active-role' : ''}`}
                    onClick={() => handleRoleClick('Corporate')}
                  >
                    <img src={corporateRole} alt="Corporate" className="role-icon" />
                    <span className="role-label">Corporate</span>
                  </div>
                </div>
              </div>

          <div className="smile-emoji">
            <img src={logobrand} alt="logo" className="brand-image-logo d-none d-xl-block " />

            <div className="emoji-ring">😇</div>
            <div className="calender-emoji-container">
              <img src={schedule} alt="meds" className="calender-emoji" />
            </div>
            <img src={meds} alt="meds" className="band-aid-emoji" />
            <img src={stethoscope} alt="meds" className="stethoscope-emoji" />
            <img src={scheduletwo} alt="meds" className="scheduletwo-emoji" />
            <img src={doctorconsultation} alt="meds" className="consultation-emoji" />
            <img src={medicalexamsvg} alt="meds" className="medicalexam-emoji" />
            <div className="hand-emoji">👋</div>
            <img src={heartbeat} alt="meds" className="heartbeat-emoji" />
            <div className='running-container-two'>

              <img src={curvedsigntwo} alt="meds" className="curvedsigntwo" />
              <p className="running-text-two">
                <span ref={typedElement}></span>
              </p>
            </div>
            <div className='running-container'>
              <img src={curvedesign} alt="meds" className="curvedesign" />
              <div className="running-text">
                <span ref={typedElementTwo}></span>
              </div>
            </div>

          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading...</p>
            </div>
          ) : (
            <>
              <div className='sign-up-button-container'></div>
              <Form onSubmit={register} className="form-overall-container">
                <Form.Group className={`form-container ${!isProvider ? 'form-container-visible' : 'form-container-hidden'}`}>
                  <Form.Label>
                    {selectedRole === 'Corporate' ? 'Corporate Name' : 'Name'}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Enter your ${selectedRole === 'Corporate' ? 'Corporate Name' : 'Name'}`} className="form-control-custom"
                    value={name}
                    onChange={handleNameChange}
                    isInvalid={!!nameError}
                  />
                  <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    className="form-control-custom"
                    value={email}
                    onChange={handleEmailChange}
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMobile">
                  <Form.Label>Mobile</Form.Label>
                  <PhoneInput
                    country={'us'}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    containerClass="form-control-custom-phone"
                    className="form-control-custom-phone"
                    placeholder="Enter your Mobile Number"
                  />
                        {/* <Form.Control
                    type="text"
                    placeholder="Enter your Mobile Number"
                    className="form-control-custom"
                    value={mobile}
                    onChange={handleMobileChange}
                    isInvalid={!!mobileError}
                  /> */}
                  <Form.Control.Feedback type="invalid">{mobileError}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    className="form-control-custom"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-custom"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
                <div className='or-sign-up-container'>

                  <div className='or-sign-up'>OR</div>
                  <div className='end-line-sign-up'></div>
                  <div className='end-line-sign-up-two'>
                    <div className='button-sign-up-container'>
                      {/* <button className='google-button-sign-up'>                 
                            <img src={google} alt="Google" onClick={() => handleGoogleSignIn(isProvider ? 'doctor' : 'patient')} className="social-sign-up" />
                          </button> */}
                      {/* <button className='apple-button-sign-up'><img src={apple} alt='Apple' className='apple-sign-up-image'></img></button> */}
                    </div>

                  </div>
                  <div className='login-option-container'>
                    <div className='account-sign-up'>Have an account?</div>

                    <Link className='login-link-signup' to="#" onClick={() => {
                      handleClose();
                      openLoginModal();
                    }}>
                      Sign In
                    </Link>

                  </div>
                  <div className='provider-option-container d-none'>
                    <div className="account-sign-up-provider">
                      {isProvider ? 'Are you a patient?' : 'Are you a provider?'}
                    </div>
                    <button
                      className="provider-link-signup"
                      onClick={() => {
                        if (isProvider) {
                          handleProviderClick(); // Logic for provider
                        } else if (isPatient) {
                          handlePatientClick(); // Logic for patient
                        } else if (isSupplier) {
                          handleSupplierClick(); // Logic for supplier
                        } else if (isCorporate) {
                          handleCorporateClick(); // Logic for corporate
                        }
                      }}
                    >
                      {
                        isProvider
                          ? 'Sign Up as a Provider'
                          : isPatient
                            ? 'Sign Up as a Patient'
                            : isSupplier
                              ? 'Sign Up as a Supplier'
                              : isCorporate
                                ? 'Sign Up as a Corporate'
                                : 'Sign Up' // Default text for any unknown state
                      }
                    </button>
                  </div>
                </div>
              </Form>

            </>
          )}

        </Modal.Body>

      </Modal>
    </>
  );
};

export default SignupCard;
