import React, { useEffect, useState, useRef } from "react";

import "../DoctorProfile/doctorProfile.css";

// import Reviewpage from "../../components/Reviewpage/Reviewpage";
// import Articles from "../Article/Article";
import axios from 'axios';

import { useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchFromDoctor } from "../../actions/api";
import {  useNavigate } from 'react-router-dom';

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

const BookAppointment = () => {
  const navigate = useNavigate();

  const [totalFees,setTotalFees]= useState();
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const { id } = useParams();
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);
  const totalCards = 5;
  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [appointmentContainerHeight, setAppointmentContainerHeight] =
    useState("409px");
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [doctorData, setDoctorData] = useState([]);
  const [profile, setProfile] = useState("");
  const [insurance, setInsurance] = useState([])
  const [blogs,setBlogs]=useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showDoctorCard, setShowDoctorCard] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [consultationType, setConsultationType] = useState('inPerson');
  const [selectedPlace, setSelectedPlace] = useState("");
  const handleInsuranceChange = (event) => {
    setSelectedInsurancePlace(event.target.value);
  };
  const [selectedInsurance, setSelectedInsurancePlace] = useState("");
  const [currencytoBookingData,setCurrencytoBookingData] = useState('usd');
  const [currencies,setCurrencies]= useState([]);

  const handleChange = (event) => {
    setSelectedPlace(event.target.value);
  };

  const toggleAppointmentDropdown = () => {
    setShowAppointmentDropdown(!showAppointmentDropdown);
    setAppointmentContainerHeight(showAppointmentDropdown ? "409px" : "988px");
  };

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    setSelected(selected === i ? null : i);
  };
  const reviewRef = useRef(null);
  const scrollToReviews = () => {
    if (reviewRef.current) {
      window.scrollTo({
        top: reviewRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const getProfile = (a) => {
    if (a.profilePicture && a.profilePicture.data) {
      const base64String = bufferToBase64(a.profilePicture.data);
      setProfile(base64String);
    }
  };

  const currencyDataApi = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/doctors/${doctorData._id}/slots`, {
            withCredentials: true
        });
        const { feesInAllCurrencies, totalFee } = response.data;
        setCurrencies(feesInAllCurrencies);
        setTotalFees(totalFee);
        console.log(currencies);
        console.log(totalFees);
        
    } catch (error) {
        console.error("Error fetching doctor's fees:", error);
        // toast.error("Unable to fetch fees. Please try again.");
    }
};

useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        },
        (error) => {
            console.error('Error fetching geolocation:', error);
            // toast.error('Unable to fetch your location. Please enable location services.');
        }
    );
}, []);

  useEffect(() => {
    document.title = "Doctor-Profile";
    if (id) {
      const fetchDoctors = async () => {
        try {
          const response = await fetchFromDoctor(`/doctors/${id}/slots`);
          setDoctorData(response.doctor);
          setInsurance(response.insurances)
          setBlogs(response.blogs)
          getProfile(response.doctor);
          console.log(profile)
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };

      fetchDoctors();
    }
  }, []);
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
    
  if (consultationType === 'In-person' && !selectedPlace) {
    toast.info('Please select a hospital for in-person consultation.', {
        className: 'toast-center',
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
        consultationType,
        hospital: consultationType === 'In-person' ? selectedPlace : null,
        currency: consultationType === 'Video call' ? currencytoBookingData : null
    };
      console.log('Booking data:', bookingData);
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
    // console.log(result.url);
    if (response.ok) {
      if (consultationType === "Video call" && result.url) {
        window.open(result.url);
      } else {
        navigate('/profile/userprofile/manage/appointments');
        toast.info('Booking successful.', {
          className: 'toast-center',
          closeButton: true,
          progressBar: true,
        });
      }

    
    } else {
        toast.error('Unexpected server response. Please try again.', {
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

const currencySymbols = {
  usd: '$',
  inr: '₹',
  gbp: '£',
  aed: 'د.إ',
  eur: '€',

};

const handleConsultationTypeChange = async (type) => {
  setConsultationType(type);
  
 
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/doctors/${doctorData._id}/slots`, {
      withCredentials: true
    });
    const { feesInAllCurrencies, totalFee } = response.data;
    setCurrencies(feesInAllCurrencies);
    setTotalFees(totalFee);
    console.log(currencies);
    console.log(totalFees);
  } catch (error) {
    console.error("Error fetching doctor's fees:", error);
    // toast.error("Unable to fetch fees. Please try again.");
  }
};

  return (
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
{consultationType === 'Video call' && doctorData.doctorFee && (
                                <div className="minimal-dropdown-doctor">
                                <select
                                    value={currencytoBookingData}
                                    onChange={(e) => setCurrencytoBookingData(e.target.value)}
                                >
                                    {Object.entries(currencies).map(([currency, value], index) => (
                                         <option key={index} value={currency}>
                                         {currency.toUpperCase()} - {currencySymbols[currency] || ''}{value}
                                     </option>
                                    ))}
                                </select>
                            </div>
                            
                            )}


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
    
  );
};

export default BookAppointment;
