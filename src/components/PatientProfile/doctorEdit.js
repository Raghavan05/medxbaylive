import React, { useEffect, useState, useRef } from "react";
import Faq from '../Assets/faqImage.jpg'
import "./doctorpatient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faPlus, faUserMd } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { MdVerified } from 'react-icons/md'; 
import { useParams } from "react-router-dom";

// import Articles from "../ArticleEdit/ArticleEdit";
import Languages from "../LanguagesEdit/LanguageEdit";
import Articles from "../Article/Article";
import { fetchFromDoctor } from "../../actions/api";

import AcceptedInsurances from "../Insurance/Acceptedinsurance";
import "../FaqEdit/FAQEdit.css";
import smilee from "../../assests/img/smilee.svg";
import hospitalimage from "../../assests/img/Image.svg";
import image from "../../assests/img/Image.png";
import hospitallogo from "../../assests/img/hospitallogo.png";
import faqimage from "../../assests/img/faqimage.png";
import hanfheart from "../../assests/img/handheart.svg";
import { useNavigate } from 'react-router-dom';
import phone from '../Assets/phone.png'
import message from '../Assets/message.png'
import axios from "axios";
import profileImage from "../Assets/profileimg.png";
import AwardsRecognition from "../Awards/Awards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";



const bufferToBase64 = (buffer) => {
  if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
    const bytes = new Uint8Array(buffer.data);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/jpeg;base64,${btoa(binary)}`;
  } else {
    console.error('Unexpected buffer type:', typeof buffer);
    return '';
  }
};

function DoctorEditPatient() {
  const { slug } = useParams();
  const [profile, setProfile] = useState("");

  const [doctor, setDoctor] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [ setBlogs] = useState([]);
  const [appointmentContainerHeight, setAppointmentContainerHeight] =
  useState("409px");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [consultationType, setConsultationType] = useState('inPerson');
  const [selectedPlace, setSelectedPlace] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  // const [isEditClicked, setIsEditClicked] = useState(false);
  const navigate = useNavigate();
  const handleShowEditPopup = () => setShowEditPopup(true);
  const handleCloseEditPopup = () => setShowEditPopup(false);
  const [loading, setLoading] = useState(false); 
  const [verificationStatus, setVerificationStatus] = useState('');
  const [doctorData, setDoctorData] = useState([]);
  const [showDoctorCard, setShowDoctorCard] = useState(false);

  const handleInsuranceChange = (event) => {
    setSelectedInsurancePlace(event.target.value);
  };
  const [selectedInsurance, setSelectedInsurancePlace] = useState("");

  const [profileimg, setProfileimage] = useState("");
  const handleChange = (event) => {
    setSelectedPlace(event.target.value);
  };
  const toggleAppointmentDropdown = () => {
    setShowAppointmentDropdown(!showAppointmentDropdown);
    setAppointmentContainerHeight(showAppointmentDropdown ? "409px" : "948px");
  };

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    setSelected(selected === i ? null : i);
  };

  const handleShowEdit= () =>{
    navigate('/edit/profile/doctor'); 
  }

  useEffect(() => {
    document.title = "Doctor-Edit";

    fetchDoctorDetails();
  }, []);
  const getProfile = (a) => {
    if (a.profilePicture && a.profilePicture.data) {
      const base64String = bufferToBase64(a.profilePicture.data);
      setProfile(base64String);
    }
  };
  useEffect(() => {
    document.title = "Doctor-Profile";
    if (slug) {
      const fetchDoctors = async () => {
        try {
          const response = await fetchFromDoctor(`/doctors/${slug}/slots`);
          setDoctorData(response.doctor);
          setInsurance(response.insurances)
          setBlogs(response.blogs)
          getProfile(response.doctor);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };

      fetchDoctors();
    }
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
        { withCredentials: true }
      );
      const doctorData = response.data;

      if (doctorData.doctor.dateOfBirth) {
        const date = new Date(doctorData.doctor.dateOfBirth);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${date.getFullYear()}`;
        doctorData.doctor.dateOfBirth = formattedDate;
      }
      var formData = doctorData.doctor
      const profileImageData = formData?.profilePicture
      ? `data:image/jpeg;base64,${formData.profilePicture.data}` 
      : profileImage;
      setProfileimage(profileImageData)
      setDoctor(doctorData.doctor);
      setInsurance(doctorData.insurances);
      setBlogs(doctorData.blogs);
      setVerificationStatus(doctorData.doctor.verified);


  
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();

    if (doctor.verified === 'Verified' && doctor.subscriptionVerification !== 'Verified') {
      navigate('/SubscriptionPlans');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/verify`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      await fetchDoctorDetails();

    } catch (error) {
      console.error("Verification request failed:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };



  const timeSlots = doctorData.timeSlots || [];
  const datesMap = timeSlots.reduce((acc, slot) => {
      const date = new Date(slot.date).toDateString();
      if (!acc[date]) {
          acc[date] = { day: date, slots: 0, timeSlots: [] };
      }
      acc[date].slots += 1;
      acc[date].timeSlots.push(slot);
      return acc;
  }, {});

  const dates = Object.values(datesMap);

  const groupedSlots = {
      morning: [],
      afternoon: [],
      evening: []
  };

  // Group time slots into morning, afternoon, evening
  if (dates[selectedDate]) {
      dates[selectedDate].timeSlots.forEach(slot => {
          const hour = parseInt(slot.startTime.split(':')[0], 10);
          if (hour < 12) {
              groupedSlots.morning.push(slot.startTime);
          } else if (hour < 17) {
              groupedSlots.afternoon.push(slot.startTime);
          } else {
              groupedSlots.evening.push(slot.startTime);
          }
      });
  }

  const showPrev = () => {
    if (startIndex > 0) {
        setStartIndex(startIndex - 1);
        setSelectedDate(selectedDate - 1);
    }
};

const showNext = () => {
    if (startIndex + 3 < dates.length) {
        setStartIndex(startIndex + 1);
        setSelectedDate(selectedDate + 1);
    }
};

const handleShowCard = () => {
    setShowDoctorCard(true);
};

const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
};

const handleBookAppointment = async () => {
  const user = sessionStorage.getItem('loggedIn');

  if (!user) {
    toast.info('Please log in before booking.', {
      className: 'toast-center toast-warning', 
      closeButton: true,
      progressBar: true,
    });
    return;
  }


  try {
      const selectedDay = dates[selectedDate];
      const bookingData = {
          doctorId: doctorData._id,
          date: moment(selectedDay.day).format('YYYY-MM-DD'),
          startTime: selectedTimeSlot,
          consultationType: consultationType
      };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/patient/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(bookingData),
        credentials: 'include' 
    });

    const result = await response.json();

    if (response.ok) {
        window.location.href = result.url; 
    } else {
        toast.info('Unexpected response from server. Please try again.', {
            className: 'toast-center toast-fail',
            closeButton: true,
            progressBar: true,
        });
    }
} catch (error) {
    console.error('Error booking appointment:', error.message);
    toast.info('Error booking appointment. Please try again.', {
        className: 'toast-center toast-fail',
        closeButton: true,
        progressBar: true,
    });
}
};
const handleConsultationTypeChange = (type) => {
  setConsultationType(type);
};

  
  const faqRef = useRef(null);

  const faqData = [
    {
      question: "Why choose our medical for your family?",
      answer:
        "We provide top-notch medical services with a family-friendly environment.",
    },
    {
      question: "Why we are different from others?",
      answer:
        "Our commitment to personalized care and advanced technology sets us apart.",
    },
    {
      question: "Trusted & experience senior care & love",
      answer:
        "Our experienced staff offers compassionate care for seniors, ensuring their well-being.",
    },
    {
      question: "How to get appointment for emergency cases?",
      answer:
        "You can call our emergency hotline or visit our website to book an urgent appointment.",
    },
  ];

  return (
    <>
      <div className="doctor-profile-edit">
        <div className="profile-about-container">
          <div className="card-container-patient ">
      <div className="doctor-profile-edit-img-patient">
      <div className="doctor-edit-name">
              {doctor ? doctor.name : "Loading..."}
       {doctor.verified === 'Verified' && (
   

   <span className="blue-tick"> <MdVerified style={{ color: '#1DA1F2' }} /></span>


        )}
            </div>
            <div className="edit-profile-degree">
              {doctor ? doctor.title : "Loading..."}
            </div>
            <div className="row edit-doctor-btns">
            {/* <button
              className="edit-doctor-button"
              onClick={handleShowEdit}
            >
              Edit profile
            </button> */}





            </div>

            <img
              src={profileimg}
              alt="Doctor-edit"
              className="doctor-edit-profile-photo-patient"
            ></img>

</div>


<div
          className="Appointment-container"
          style={{ height: appointmentContainerHeight }}
        >
            <div className="book-appointment">Book Appointment</div>
            <div className="Appointment-container-box">
  <div 
    className={`book-appointment-inperson ${consultationType === 'In-person' ? 'active' : 'inactive'}`}
    onClick={() => handleConsultationTypeChange('In-person')}
  >
    <div className="book-appointment-inperson-icon"></div>
    <div className="book-appointment-inperson-container">In-person</div>
  </div>
  <div 
    className={`video-consultation-container ${consultationType === 'Video call' ? 'active' : 'inactive'}`}
    onClick={() => handleConsultationTypeChange('Video call')}
  >
    <div className="video-consultation-container-icon"></div>
    <div className="video-consultation-text">Video Consultation</div>
  </div>
</div>

          <div className="Appointment-select-place">Select Place</div>
          <div className="Appointment-select-place-dropdown">
            <select
              className="Appointment-select-place-text"
              value={selectedPlace}
              onChange={handleChange}
            >
              <option value="Memorial Sloan-Kettering Cancer Center">
                Select Place
              </option>
              {doctorData.hospitals?.map((i,index) => (
                <option key={i._id} value={i._id}>{i.name}</option>
              ))}
            </select>
            <svg
              className="dropdown-arrow"
              width="10.61"
              height="6.48"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z"
                fill="#FF7F50"
              />
            </svg>
          </div>
          <div className="select-insurance-plan">Select Insurance Plan</div>
          <div className="insurance-plan-dropdown">
            <select
              className="Appointment-select-insurance-text"
              value={selectedInsurance}
              onChange={handleInsuranceChange}
            >
              <option>Select Insurance Plan</option>
              {insurance.map(i => (
                <option key={i._id} value={i._id}>{i.name}</option>
              ))}
            </select>
            <svg
              className="dropdown-arrow-insurance"
              width="10.61"
              height="6.48"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z"
                fill="#FF7F50"
              />
            </svg>
          </div>
          <div className="Appointment-select-date-slot">
            <div className="Appointment-select-date">Select Date & Slot</div>
            <div className="Appointment-slot-drop-down">
              <svg
                className="Appointment-slot-drop-down-icon"
                width="12.61"
                height="8.48"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleAppointmentDropdown}
              >
                <path
                  d="M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z"
                  fill="#FF7F50"
                />
              </svg>
              {showAppointmentDropdown && (
                  <div className="container doctor-card-date-doctor">
                      <div className="date-nav-doctor">
                          <button className="arrow-doctor-one" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                          </div>
                          <div className="date-carousel-doctor">
                              {dates.slice(startIndex, startIndex + 2).map((date, index) => (
                                  <div
                                      key={index}
                                      className={`date-item-doctor ${index + startIndex === selectedDate ? 'active' : ''}`}
                                      onClick={() => setSelectedDate(index + startIndex)}
                                  >
                                      <h3>{date.day}</h3>
                                      <span className="slots-available-doctor">{date.slots} Slots Available</span>
                                  </div>
                              ))}
                          </div>
                          <button className="arrow-doctor-two" onClick={showNext} disabled={startIndex + 4 >= dates.length}>›</button>

                      <div className="underline-doctor">
                          <div
                              className="underline-doctor-active"
                              style={{
                                  left: `calc(100% / ${2} * ${selectedDate - startIndex})`,
                                  width: `calc(100% / ${2})`
                              }}
                          ></div>
                      </div>
                      {dates[selectedDate] && (
                          <div className="container mt-3">
                              <div className="time-slots-group-doctor d-flex flex-row">
                                  <h6>Morning</h6>
                                  <div className="time-slots-doctor">
                                      {groupedSlots.morning.map((slot, index) => (
                                          <button
                                              key={`morning-${index}`}
                                              className={`time-slot-doctor ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                              onClick={() => handleTimeSlotClick(slot)}
                                          >
                                              {slot}
                                          </button>
                                      ))}
                                  </div>
                              </div>
                              <div className="time-slots-group-doctor d-flex flex-row">
                                  <h6>Afternoon</h6>
                                  <div className="time-slots-doctor">
                                      {groupedSlots.afternoon.map((slot, index) => (
                                          <button
                                              key={`afternoon-${index}`}
                                              className={`time-slot-doctor ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                              onClick={() => handleTimeSlotClick(slot)}
                                          >
                                              {slot}
                                          </button>
                                      ))}
                                  </div>
                              </div>
                              <div className="time-slots-group-doctor d-flex flex-row">
                                  <h6>Evening</h6>
                                  <div className="time-slots-doctor">
                                      {groupedSlots.evening.map((slot, index) => (
                                          <button
                                              key={`evening-${index}`}
                                              className={`time-slot-doctor ${selectedTimeSlot === slot ? 'selected btn-primary' : ''}`}
                                              onClick={() => handleTimeSlotClick(slot)}
                                          >
                                              {slot}
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          </div>

                      )}
                      {selectedTimeSlot && (
                          <div className="book-now">
                              <button className="btn btn-primary" onClick={handleBookAppointment}>Continue Booking</button>
                          </div>
                      )}
                  </div>
              )}
            </div>
          </div>
        </div>

          </div>
  
        <div className="doctor-profile-edit-container">
      
          <div className="doctor-details-edit-patient">
          <div className='-left'>

      

                 <p className="about-edit-profile">About</p>
            <div className="edit-profile-discription">
        
              {doctor ? doctor.aboutMe : "Loading..."}
            </div>
            </div>
            <div className='edit-right'>
            <div className="date-location-edit-container">
              <div className="doctor-edit-calender">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.916748 25.7087C0.916748 28.1878 2.81258 30.0837 5.29175 30.0837H25.7084C28.1876 30.0837 30.0834 28.1878 30.0834 25.7087V14.042H0.916748V25.7087ZM25.7084 3.83366H22.7917V2.37533C22.7917 1.50033 22.2084 0.916992 21.3334 0.916992C20.4584 0.916992 19.8751 1.50033 19.8751 2.37533V3.83366H11.1251V2.37533C11.1251 1.50033 10.5417 0.916992 9.66675 0.916992C8.79175 0.916992 8.20841 1.50033 8.20841 2.37533V3.83366H5.29175C2.81258 3.83366 0.916748 5.72949 0.916748 8.20866V11.1253H30.0834V8.20866C30.0834 5.72949 28.1876 3.83366 25.7084 3.83366Z"
                    fill="#0167FF"
                  />
                </svg>
              </div>
              <div className="edit-profile-date">
                {doctor ? doctor.dateOfBirth : "Loading..."}
              </div>
              <div className="date-edit-vector"></div>
              <div className="doctor-edit-location">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 21 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5001 14.7712C9.53315 14.7712 8.60581 14.387 7.92209 13.7033C7.23836 13.0196 6.85425 12.0923 6.85425 11.1253C6.85425 10.1584 7.23836 9.23106 7.92209 8.54733C8.60581 7.86361 9.53315 7.47949 10.5001 7.47949C11.467 7.47949 12.3943 7.86361 13.0781 8.54733C13.7618 9.23106 14.1459 10.1584 14.1459 11.1253C14.1459 11.6041 14.0516 12.0782 13.8684 12.5205C13.6852 12.9629 13.4166 13.3648 13.0781 13.7033C12.7395 14.0419 12.3376 14.3104 11.8953 14.4936C11.4529 14.6769 10.9789 14.7712 10.5001 14.7712ZM10.5001 0.916992C7.79266 0.916992 5.19613 1.99251 3.2817 3.90694C1.36727 5.82138 0.291748 8.41791 0.291748 11.1253C0.291748 18.7816 10.5001 30.0837 10.5001 30.0837C10.5001 30.0837 20.7084 18.7816 20.7084 11.1253C20.7084 8.41791 19.6329 5.82138 17.7185 3.90694C15.804 1.99251 13.2075 0.916992 10.5001 0.916992Z"
                    fill="#0167FF"
                  />
                </svg>
              </div>
              <div className="doctor-edit-location-text">
                {" "}
                {doctor ? doctor.cities : "Loading..."}
              </div>
            </div>
    
            <div className="speciality-container">
              <div className="award-logo-container">
                <FontAwesomeIcon icon={faAward} className="award-logo" />
              </div>
              <div className="edit-profile-Heart-Specialist">
                {doctor ? doctor.speciality : "Loading..."}
              </div>
            </div>
            <div className="edit-profile-disease-container">
  <div className="plus-icon-container">
    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
  </div>
  <div className="edit-profile-disease">
    {doctor
      ? doctor.conditions && doctor.conditions.length > 0
        ? doctor.conditions.map((condition, index) => (
            <React.Fragment key={index}>
              <span className="condition-item">{condition}</span>
              {index < doctor.conditions.length - 1 && (
                <span className="date-edit-vector-two"></span> 
              )}
            </React.Fragment>
          ))
        : "No conditions available"
      : "Loading..."}
  </div>
</div>

      
            <div className="video-consult-container">
              <div className="edit-person-icon">
                <FontAwesomeIcon icon={faUserMd} className="faUserMd-icon" />
              </div>
              <div className="video-consult-text">
                {doctor ? doctor.consultation : "Loading..."}
              </div>
            </div>
            <Languages Languages={doctor.languages}/>
{/*             
            <div className="social-links-container">
              <div className="faEnvelope">
                <a
                  href={doctor ? doctor.linkedin : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="faEnvelope-icon"
                  />
                </a>
              </div>
              <div className="faFacebooks">
                <a
                  href={doctor ? doctor.facebook : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="faFacebooks-icon"
                  />
                </a>
              </div>
              <div className="faTwitter">
                <a
                  href={doctor ? doctor.twitter : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="faTwitter-icon"
                  />
                </a>
              </div>
              <div className="faInstagram">
                <a
                  href={doctor ? doctor.instagram : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="faInstagram-icon"
                  />
                </a>
              </div>
            </div> */}
          
          </div>
        </div>
        </div>
        </div>
        <div className="location-background-container-adjust-patient">
        <div className="location-background-container-patient">
        <div className="Locations-edit-doc-profile">Locations</div>
        <div className={`doctor-appoinment-card-container-edit `}>
          {doctor.hospitals?.map((data) =>{
            return(
          <div className="doctor-appoinment-card-one-edit">
            <div className="hospital-name-box">
              <img src={hospitalimage} atl="hospital"></img>
              <p className="hospital-name-text">{data.name}</p>
           
         
            </div>
            <div className="hospital-charge">
              <div className="hospital-charge-dollar">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"
                    fill="#9CA6B1"
                  />
                </svg>
              </div>

              <img
                src={image}
                alt="Dollar"
                className="hospital-charge-ammount"
              ></img>

              <p className="hospital-charge-video">(For Video Consultation) </p>
            </div>
            <div className="hospital-name-logo-container">
              <div>
                <img
                  src={hospitallogo}
                  alt="logo"
                  className="hospital-name-logo"
                ></img>
              </div>
              <div className="hospital-name-logo-location-container">
                <p className="hospital-name-logo-location">
                    {`${data.street} ${data.city} ${data.state}`}
                </p>
                <p className="call-now"><img src={phone} alt='call'></img>     Call Now</p>
                <p className="get-direction"><img src={message} alt='message'></img>     Get Direction</p>
              </div>
              <button className="hospital-charge-book-appoinment">
                <p className="hospital-charge-book-appoinment-text">
                  Visit 
                </p>
              </button>
            </div>
          </div>
          )
          })}
        </div>
        </div>
        </div>

      
        <AcceptedInsurances insurance={insurance} />
           <div >
            <div className="awards-patient-edit">
      <AwardsRecognition Awards={doctor.awards} />
      </div>
      </div>
      <div className="articles-edit-patient">
      <Articles  blogs={doctor.blogs}/>
      </div>
        {/* <Articles blogs={blogs}/> */}
<div className="faq-background-patient">
<div className="faq-background">
        <div className="faq " ref={faqRef}>
          <h2 className="heading">Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-left">
              <img src={Faq} alt="faq" className="faq-image-doctor"></img>
              <div className="smile-emoji-container">
                <img src={smilee} alt="smile" className="smile-emoji-faq"></img>
                <p className="people-count-faq">84k+</p>
                <p className="happy-patient">Happy Patients</p>
                <div className="heart-hands-container">
                  <img
                    src={hanfheart}
                    alt="welcome"
                    className="hand-heart"
                  ></img>
                </div>
              </div>
            </div>
            <div className="faq-right">
              {faqData.map((item, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-question" onClick={() => toggle(i)}>
                    {item.question}
                    <span>{selected === i ? "-" : "+"}</span>
                  </div>
                  <div className={`faq-answer ${selected === i ? "show" : ""}`}>
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default DoctorEditPatient;