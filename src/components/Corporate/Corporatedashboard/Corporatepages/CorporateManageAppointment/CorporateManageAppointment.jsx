import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CorporateManageAppointment.css';

const AddDoctor = ({ corporateId }) => {
  const [searchEmail, setSearchEmail] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (searchEmail) {
      fetchDoctors();
    }
  }, [searchEmail]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/corporate/add-doctors?email=${searchEmail}`
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to fetch doctors. Please try again.');
    }
  };

  const handleAddDoctor = async (doctorId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/corporate/add-doctor/${doctorId}`,
        {},
        { withCredentials: true }
      );
      toast.success('Request sent successfully.');
      fetchDoctors();
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request.');
    }
  };

  return (
    <div className="add-doctor-container">
      <ToastContainer />
      <h2>Add Doctor</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
      />
      <button onClick={fetchDoctors}>Search</button>

      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-profile-pic">
              <img
                src={doctor.profilePicture ? `data:${doctor.profilePicture.contentType};base64,${doctor.profilePicture.data}` : '/default-profile.png'}
                alt={doctor.name}
              />
            </div>
            <div className="doctor-details">
              <h3>{doctor.name}</h3>
              <p>Specialty: {doctor.speciality.join(', ')}</p>
              <p>Email: {doctor.email}</p>
              <p>Experience: {doctor.experience || 'N/A'} years</p>
            </div>
            <button onClick={() => handleAddDoctor(doctor._id)}>Add Doctor</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDoctor;
