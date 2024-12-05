
import React from "react";
import { useState, useEffect } from "react";
import profileImage from "../Assets/profileimg.png";
import axios from "axios";
import { fetchFromDoctor } from "../../actions/api";
import {  useParams} from "react-router-dom";

// import "./DoctorInfo.css";

const bufferToBase64 = (logo) => {
  const buffer = logo.data;
  const contentType = logo.contentType;

  if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
    const bytes = new Uint8Array(buffer.data);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:${contentType};base64,${btoa(binary)}`;
  } else {
    console.error('Unexpected buffer type:', typeof buffer);
    return '';
  }
};


const DoctorInfo = () => {
  const { id } = useParams();
  const [profileimg, setProfileimage] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [setBlogs] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState("");
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
  const getBaseImage = (logo) => {
    const base64String = bufferToBase64(logo);
    return base64String;
  };
  const fetchDoctorDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
        { withCredentials: true }
      );
      const doctorData = response.data;

      console.log(doctorData);
      console.log(doctorData.doctor.treatmentApproach);

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
      var formData = doctorData.doctor;
      const profileImageData = formData?.profilePicture
        ? `data:image/jpeg;base64,${formData.profilePicture.data}`
        : profileImage;
      setProfileimage(profileImageData);
      setDoctor(doctorData.doctor);
      setInsurance(doctorData.insurances);
      setBlogs(doctorData.blogs);
      setVerificationStatus(doctorData.doctor.verified);
      
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    fetchDoctorDetail();
  }, []);

  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="contain">

      <div className="about-section" style={{ backgroundColor: "white", marginTop: "40px", padding: "2.25rem 2.5rem", borderRadius: "0.75rem" }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500 }}>About</h2>
        <div>
        <p className="about-text" >{isReadMore ? `${doctor?.aboutMe ? doctor?.aboutMe : ""}` : `${doctor?.aboutMe ? doctor?.aboutMe : ""}`}</p>
        {/* <div onClick={toggleReadMore} className="button"  style={{color:"blue", cursor:"pointer", paddingLeft:"10px", paddingBottom:"20px"}}>
          {isReadMore ? "Read More" : "Read Less"}
        </div> */}
      </div>

        <div className="flex-row">
          <img loading="lazy" src="/DoctorProfile/date.png" alt="" className="icon" />
          <span>{doctor?.dateOfBirth?.slice(0, 10)} |</span>
          <img loading="lazy" src="/DoctorProfile/loc.png" alt="" className="icon" />
          <span>{doctor?.country}</span>
        </div>
        <div className="flex-row mt-2">
          <img loading="lazy" src="/DoctorProfile/heartSpecilist.png" alt="" className="icon" />
          <span>
            {doctor?.speciality?.map((condition, index) => (
              <span key={index}>
                {condition}
                {index < doctor.speciality.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        </div>
        <div className="flex-row mt-2">
          <img loading="lazy" src="/DoctorProfile/heartDisease.png" alt="" className="icon" />
          {doctor?.conditions?.map((condition, index) => (
            <span key={index}>
              {condition}
              {index < doctor.conditions.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div className="flex-row mt-2">
          <img loading="lazy" src="/DoctorProfile/checklist-1.png" alt="" className="icon" />
          {doctor?.treatmentApproach?.map((treatmentApproach, index) => (
            <span key={index}>
              {treatmentApproach}
              {index < doctor.treatmentApproach.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div className="flex-row mt-2">
          <img loading="lazy" src="/DoctorProfile/videoConsultamnt.png" alt="" className="icon" />
          <span>Video consult | </span>
          <span>{doctor?.consultation}</span>
        </div>

        <h2  style={{ marginTop: "30px",fontSize: '24px', fontWeight:500 }}>Languages</h2>
        <div style={{ display: 'flex', gap: '15px', flexDirection: 'row' }}>
          {doctor?.languages?.map((language, index) => (
            <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
              <img
                loading="lazy"
                src="/DoctorProfile/righttick.png"
                alt=""
                style={{ width: '16px', height: '16px' }} // Adjust size as needed
              />
              <span style={{ marginLeft: '5px', fontWeight: '500', color: '#4B5563' }}>
                {language}
              </span>
            </div>
          ))}
        </div>


      </div>

      <div style={{ backgroundColor: "white", marginTop: "40px", padding: "2.25rem 2.5rem", borderRadius: "0.75rem" }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500 }}>Locations</h2>
        {doctor?.hospitals?.map((location, index) => (
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', marginBottom: '20px' }} key={index}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: '600', color: '#2563eb' }}>
                <img loading="lazy" src="/DoctorProfile/LocationIcon.png" alt="" style={{ width: '20px', height: '20px' }} />
                <div style={{ fontWeight: 'bold', flex: '1', maxWidth: '297px' }}>{location.name}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
                <div style={{ fontWeight: '600', color: '#4B5563' }}>$12</div>
                <div style={{ fontWeight: '500', color: '#9ca3af' }}>(For Video Consultation)</div>
              </div>
              <div style={{ display: 'flex', gap: '14px', marginTop: '30px', fontWeight: '500' }}>
                <img loading="lazy" src="/DoctorProfile/Locationbig.png" alt="" style={{ width: '40px', height: '40px' }} />
                <div style={{ display: 'flex', flexDirection: 'row', gap: "100px", justifyContent: "space-between" }}>
                  <div>
                    {location.street},
                    <br />
                    {location.city}, {location.state}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexDirection: "column" }}>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <img loading="lazy" src="/DoctorProfile/phone.png" alt="" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                      <span>Call Now</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <img loading="lazy" src="/DoctorProfile/direction.png" alt="" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                      <span>Get Direction</span>
                    </div>
                  </div>
                  <div style={{
                    width: '120px',
                    textAlign: 'center',
                    height: '40px',
                    paddingTop: '8px',
                    backgroundColor: '#0167FF',
                    color: 'white',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}>
                    Visit website
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Additional content can go here */}
            </div>
          </div>
        ))}
      </div>


      <div className="insurance-section" style={{ backgroundColor: "white", marginTop: "40px", padding: "2.25rem 2.5rem", borderRadius: "0.75rem" }}>
        <h2 className="about-title" style={{ fontSize: '24px', fontWeight: 500 }}>Accepted insurances</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '28px', flexDirection: 'row' }}>
          {insurance?.map((i) => (
            <div className="insurance-item" key={i._id} style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <img
                loading="lazy"
                src={getBaseImage(i.logo)}
                alt="insurance-logo"
                style={{ width: '150px',  marginLeft: '20px', border: '1px solid #e0e0e0',  borderRadius: '5px' }}
              />
            </div>
          ))}
        </div>
      </div>


      <div className="insurance-section" style={{ backgroundColor: "white", marginTop: "40px", padding: "2.25rem 2.5rem", borderRadius: "0.75rem" }}>
        <h2 className="about-title" style={{ fontSize: '24px', fontWeight: 500 }}>Awards</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '28px', flexDirection: 'row' }}>
          {doctor?.awards?.map((award, index) => (
            <div className="award-item" key={index} style={{ display: 'flex', alignItems: 'center', border:"1px solid #e0e0e0", padding:"10px", borderRadius:"10px", backgroundColor:"#F2F6FF"  }}>
              <img
                loading="lazy"
                src="/DoctorProfile/Awardcup.png"
                alt="award-image"
                style={{ width: '40px', height: '40px', marginRight: '10px' }}
              />
              <div style={{ margin: 'auto 0', fontWeight: '500', color: '#4B5563' }}>{award}</div>
            </div>
          ))}
        </div>
      </div>


    </div>

  );
};

export default DoctorInfo;
