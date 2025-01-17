
import React from "react";
import BookAppointment from "../BookAppointment";
import { useState, useEffect } from "react";
import profileImage from "../../Assets/profileimg.png";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import "../tail.css";
import { fetchFromDoctor } from "../../../actions/api";
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
const MainPac = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [setBlogs] = useState([]);
  const { id } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("");
  const getProfile = (a) => {
    if (a.profilePicture && a.profilePicture.data) {
      const base64String = bufferToBase64(a.profilePicture.data);
      setProfile(base64String);
    }
  };
  useEffect(() => {
  if (id) {
  const fetchDoctorDetails = async () => {
    try {
      const response = await fetchFromDoctor(`/doctors/${id}/slots`);

      

      console.log(response);
      if (response.doctor.dateOfBirth) {
        const date = new Date(response.doctor.dateOfBirth);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${date.getFullYear()}`;
        response.doctor.dateOfBirth = formattedDate;
      }
      
      getProfile(response.doctor);
      setDoctor(response.doctor);
      setInsurance(response.insurances);
      setBlogs(response.blogs);
      setVerificationStatus(response.doctor.verified);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };
      fetchDoctorDetails();
}



  }, []);

  const [loading, setLoading] = useState(false);
 
  const handleShowEdit = () => {
    navigate("/edit/profile/doctor");
  };


  return (
    <div className="doc-back" style={{ backgroundColor: "white", marginTop:"40px", borderRadius:"20px" }}>
     


      <div className="background-container">
        <img
          src={profile}
          alt="Profile image"
          className="overlapping-image"
        />
      </div>
      <br></br>
      <br></br>
    
      <div style={{ backgroundColor: "white", padding:"20px", borderRadius:"20px"}}>
        <div style={{ fontWeight: 500, fontSize: "18px" }}>
        {doctor ? doctor.name : "Loading..."}
        </div>
        <div style={{ fontSize: "14px" }}> {doctor ? doctor.title : "Loading..."}</div>

      
        <div>
          <div>
            <img src="" />
            <span>{doctor ? doctor.email : "Loading..."}</span>
          </div>
          
          <div>
            <img src="" />
            <span>{doctor ? doctor.country : "Loading..."}</span>
          </div>
          <div>
            <img src="" />
            <span>{doctor ? doctor.role : "Loading..."}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainPac;
