import React, { useEffect, useState } from 'react';
import doctorProfile from '../../assests/img/Ellipse-30.png'; // Placeholder image
import videoCall from '../../assests/img/video_call.svg';
import MedicalService from '../../assests/img/medical_services.svg';
import thumbsUp from '../../assests/img/ThumbsUp.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Not filled star
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'; // Half-filled star
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Filled star
// import { fetchFromPatient } from '../../actions/api';
// import api from 'axios';
import { fetchFromPatient } from '../../actions/api.js';
import { Link } from 'react-router-dom';

const bufferToBase64 = (buffer) => {
    if (buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
        const binary = String.fromCharCode.apply(null, new Uint8Array(buffer.data));
        return `data:image/jpeg;base64,${window.btoa(binary)}`;
    }
};

const DoctorCard = ({ isMapExpanded, doctor = {} }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [showDoctorCard, setShowDoctorCard] = useState(false);
    const [profilePictur, setProfilePicture] = useState(doctorProfile);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [consultationType, setConsultationType] = useState('In-person'); 

    useEffect(() => {
        if (doctor.profilePicture && doctor.profilePicture.data) {
            console.log('Profile picture data type:', typeof doctor.profilePicture.data);
            console.log('Profile picture data:', doctor.profilePicture.data);
            const base64String = bufferToBase64(doctor.profilePicture);
            setProfilePicture(base64String);
        } else {
            setProfilePicture(doctorProfile);
        }


    }, [doctor.profilePicture]);

 
    console.log(doctor.profilePicture);

    const timeSlots = doctor.timeSlots || [];
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
        try {
            const bookingData = {
                doctorId: doctor._id,
                date: new Date(dates[selectedDate].day).toISOString(), 
                startTime: selectedTimeSlot, 
                consultationType: consultationType
            };
            console.log('Booking data:', bookingData);
    
            const response = await fetch('http://localhost:8000/patient/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(bookingData),
                credentials: 'include' 
            });
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Booking response:', result);
                alert('Booking successful!');
            } else {
                const responseText = await response.text();
                console.error('Unexpected response format:', responseText);
                alert('Unexpected response from server. Please try again.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error.message);
            alert('Error booking appointment. Please try again.');
        }
    };
    
    




    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        return stars;
    };

    return (
        <>
            <div className={`row doctor-card ${isMapExpanded ? 'mapExpanded-doctor-card' : ''}`}>
                <div className={`col-7 ${isMapExpanded ? 'col-12' : ''}`}>
                    <div className="doctor-info">
                        <div>
                            <Link to={`/doctor/${doctor._id}`}>
                                <img src={profilePictur || doctorProfile} alt={doctor.name || "Doctor"} className="doctor-photo" />
                            </Link>
                            <div className={` ${isMapExpanded ? 'mapExpanded-sponsor-rating-stars' : 'd-none'}`}>
                                {doctor.rating !== undefined ? renderStars(doctor.rating) : renderStars(0)}
                            </div>
                            <div className={`distance-div ${isMapExpanded ? 'mapExpanded-sponsor-distance-div' : 'd-none'}`}>
                                <div className='d-flex flex-row'>
                                    <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                    <p className='distance'>{doctor.distance || '1.3km Away'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-details">
                            <Link to={`/doctor/${doctor._id}`}>
                                <h2>{doctor.name || "Dr. Shantanu Jambhekar"}</h2>
                            </Link>
                            <p className="speciality">{doctor.speciality || "Dentist"}</p>
                            <p className="experience">{doctor.experience || "16 years experience overall"}</p>
                            <p className={`location ${isMapExpanded ? 'mapExpanded-location' : ''}`}>{doctor.city || "Pare, Mumbai"}</p>
                            <p className={`clinic ${isMapExpanded ? 'mapExpanded-clinic' : ''}`}>{doctor.clinic || "Smilesense Center for Advanced Dentistry + 1 more"}</p>
                            <div className={`consultation-type ${isMapExpanded ? 'mapExpanded-consultation-type' : ''}`}>
                                <img src={MedicalService} alt="In-Person" />
                                <span onClick={() => setConsultationType('inPerson')}>{doctor.consultationType?.inPerson || "In-person"}</span>
                                <img src={videoCall} alt="Video Consultation" style={{ color: "#37adff" }} />
                                <span onClick={() => setConsultationType('video')}>{doctor.consultationType?.video || "Video Consultation"}</span>
                            </div>
                            <div className={`percentage-data d-flex ${isMapExpanded ? 'mapExpanded-percentage-data' : ''}`}>
                                <div className='liked'>
                                    <img src={thumbsUp} alt="thumbsUp" />
                                    <span>{doctor.likedPercentage || "99%"}</span>
                                </div>
                                <span>{doctor.patientStories || "93 Patient Stories"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-5 appointment d-flex flex-column ${isMapExpanded ? 'col-12 mapExpanded-appointment' : ''}`}>
                    <div className={`rating-stars ${isMapExpanded ? 'd-none' : ''}`}>
                        {doctor.rating !== undefined ? renderStars(doctor.rating) : renderStars(0)}
                    </div>
                    <div>
                        <div className={`distance-div ${isMapExpanded ? 'd-none' : ''}`}>
                            <div className='d-flex flex-row'>
                                <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                <p className='distance'>{doctor.distance || '1.3km Away'}</p>
                            </div>
                            <p className="availability">{doctor.availability ? "Available" : "Not Available"}</p>
                        </div>
                        <div className='d-flex flex-row'>
                            <button className={`book-button mr-2 ${isMapExpanded ? 'mapExpanded-button' : ''}`} onClick={handleShowCard}>Book Appointment</button>
                            <button className={`book-button ${isMapExpanded ? 'mapExpanded-button' : ''}`}><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </div>
                </div>
                {showDoctorCard && (
                    <div className="container doctor-card-date">
                        <div className="date-nav">
                            <button className="arrow" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                            <div className="date-carousel">
                                {dates.slice(startIndex, startIndex + (isMapExpanded ? 2 : 3)).map((date, index) => (
                                    <div
                                        key={index}
                                        className={`date-item ${index + startIndex === selectedDate ? 'active' : ''}`}
                                        onClick={() => setSelectedDate(index + startIndex)}
                                    >
                                        <h3>{date.day}</h3>
                                        <span className="slots-available">{date.slots} Slots Available</span>
                                    </div>
                                ))}
                            </div>
                            <button className="arrow" onClick={showNext} disabled={startIndex + 3 >= dates.length}>›</button>
                        </div>
                        <div className="underline">
                            <div
                                className="underline-active"
                                style={{
                                    left: `calc(100% / ${isMapExpanded ? 2 : 3} * ${selectedDate - startIndex})`,
                                    width: `calc(100% / ${isMapExpanded ? 2 : 3})`
                                }}
                            ></div>
                        </div>
                        {dates[selectedDate] && (
                            <div className="container mt-3">
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Morning</h6>
                                    <div className="time-slots">
                                        {groupedSlots.morning.map((slot, index) => (
                                            <button
                                                key={`morning-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Afternoon</h6>
                                    <div className="time-slots">
                                        {groupedSlots.afternoon.map((slot, index) => (
                                            <button
                                                key={`afternoon-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Evening</h6>
                                    <div className="time-slots">
                                        {groupedSlots.evening.map((slot, index) => (
                                            <button
                                                key={`evening-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected btn-primary' : ''}`}
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
                                <button className="btn btn-primary" onClick={handleBookAppointment}>Book Now</button>
                            </div>
                        )}
                    </div>

                )}
            </div>
        </>
    );
};

export default DoctorCard;