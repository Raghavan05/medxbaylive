import React, { useState, useRef, useEffect } from 'react';
import './ourproviderspage.css';
import axios from 'axios';
// Default Cover-Image and Profile-Image
import providers from './Assets/providers3.png';
import providersprofile from './Assets/images.png';
// React icons
import { LuPencil } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import { PiDotsThreeCircle } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { RxExternalLink } from "react-icons/rx";
import { BiSolidShareAlt } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
// Components
import OverviewActivity from './OverviewActivity/OverviewActivity';
import OurProvidersPEPOP from './OurProvidersPEPOP/OurProvidersPEPOP';
import OurProvidersDC from './OurProvidersDC/OurProvidersDC';
import OurReviewsDc from './OurReviewsDc/OurReviewsDc';
import OurBlogDc from './OurBlogDc/OurBlogDc';
import BlogPopup from '../../patientBlog/BlogPopup';
import OurProvidersSharePopup from './OurProviderSharePopup/OurProvidersSharePopup'


const OurProvidersPage = () => {
  const [backgroundImage, setBackgroundImage] = useState(providers);
  const [profileData, setProfileData] = useState({
    corporateName: "",
    rating: 0,
    tagline: "Your Vision | Our Innovation",
    location: "IT Services and Consulting",
    followers: 24,
    employees: "",
    profileImage: providersprofile,
  });
  const fileInputRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Add popup state
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false); // State for share popup
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [corporate,setCorporate] = useState([]);
  const [doctors,setDoctors] = useState([]);
  const [blogs,setBlogs] = useState([]);
  const [doctorReviews,setDoctorReviews] = useState([]);
  const [patientReviews,setPatientReviews] = useState([]);

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchCorporateDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/corporate/profile`,
          { withCredentials: true }
        );
  
        // // Log response for debugging
        // console.log("API Response:", response);
  
        const data = response.data?.data; // Ensure data exists
        if (!data) {
          throw new Error("Data property is undefined in the response");
        }
  
        setCorporate(data.corporate || {});
        setDoctorReviews(data.doctorReviews || []);
        setPatientReviews(data.patientReviews || []);
        setDoctors(data.doctors || []);
        setBlogs(data.blogs || []);
  
        setProfileData({
          corporateName: data.corporate?.corporateName || "Corporate Name",
          rating: data.corporate?.rating || 0,
          tagline: data.corporate?.tagline || "Your Vision | Our Innovation",
          location: data.corporate?.address || "IT Services and Consulting",
          followers: data.corporate?.followers?.length || 24,
          employees: data.corporate?.employees || "11-50",
          profileImage: data.corporate?.profilePicture
            ? bufferToBase64(data.corporate.profilePicture.data)
            : providersprofile,
        });
  
        setBackgroundImage(
          data.corporate?.coverPhoto
            ? bufferToBase64(data.corporate.coverPhoto.data)
            : providers
        );
      } catch (error) {
        console.error("Error fetching corporate details:", error.message, error);
      }
    };
  
    fetchCorporateDetails();
  }, []);
  
  // Convert buffer data to Base64
  const bufferToBase64 = (buffer) => {
    if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = '';
      bytes.forEach(byte => binary += String.fromCharCode(byte));
      return `data:image/jpeg;base64,${btoa(binary)}`;
    }
    return '';
  };

  const handleEditClick = () => fileInputRef.current.click();

  const handleChangeCoverImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBackgroundImage(reader.result);
      reader.readAsDataURL(file);
  
      const formData = new FormData();
      formData.append("coverPhoto", file);
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/corporate/edit-profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("Cover photo updated successfully");
          alert("Cover photo updated successfully")
        }
      } catch (error) {
        console.error("Error uploading cover photo:", error);
      }
    }
  };
  
  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleShareClick = () => {
    setIsSharePopupVisible(true); // Show the share popup
  };

  const handleCloseSharePopup = () => {
    setIsSharePopupVisible(false); // Close the share popup
  };

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const openEditPopup = () => {
    setTempProfileData(profileData);
    setIsEditPopupOpen(true);
    document.body.classList.add('scroll-lock');
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    document.body.classList.remove('scroll-lock');
  };

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData(tempProfileData);
    closeEditPopup();
  };
  const copyLink = () => {
    const link = window.location.href; // Get the current URL of the page
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!'); // Optional: Show a success message
    }).catch(err => {
      console.error('Failed to copy link: ', err); // Handle any errors
    });
  };

  return (
    <div className="our-providers-profile-container">
      <div className="our-providers-cover-profile-image-head">
        <img src={backgroundImage} alt="Background" />
        <div className="our-provider-edit-cover-img">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChangeCoverImage}
            style={{ display: 'none' }}
            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
          />
          <LuPencil className="our-provider-cover-edit-icon" onClick={handleEditClick} />
        </div>

        <div className="our-provider-profile-info">
          <div className="our-provider-profile-img">
            <img src={profileData.profileImage} alt="Profile" />
          </div>
        </div>
      </div>

      <div className="our-providers-profile-details">
        <div className="our-providers-body">
          <div className="our-providers-body-title-container">
            <h2>{profileData.corporateName}</h2>
            <div className="our-providers-rating-number">
              {profileData.rating} <IoIosStar />
            </div>
          </div>
          <p className="Headline">{profileData.tagline}</p>
          <p className="location">{profileData.location.city + ' | ' + profileData.location.state + ' | ' + profileData.location.country}</p>
          <p className="followers">
            {profileData.followers} followers | {profileData.employees} employees
          </p>
        </div>

        <div className="our-providers-body-buttons">
          <div className="our-providers-body-buttons-two">
          <button className="follow-button" onClick={handleShowPopup}><FaPlus size='1rem'/> Follow</button>
          <button className="message-button" onClick={handleShowPopup}><PiPaperPlaneTiltBold size='1rem'/> Message</button>
            <div className="DotsThreeCircle" tabIndex={0} onClick={toggleDropdown}>
              <PiDotsThreeCircle className={`DotsThreeCircle-icon ${isDropdownOpen ? 'rotate' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className={`our-providers-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <div className="our-providers-dropdown-item" onClick={copyLink}>
                  <RxExternalLink size="1rem" /> Copy Link
                </div>

                <div className="our-providers-dropdown-item" onClick={handleShareClick}>
                  <BiSolidShareAlt size="1rem" /> Share Profile
                </div>
                <div className="our-providers-dropdown-item" onClick={openEditPopup}>
                  <TbEdit size="1rem" /> Edit Profile
                </div>
              </div>
            )}
          </div>
          <button className="appointment-button"  onClick={handleShowPopup}>Book an Appointment</button>
        </div>
      </div>

      {isEditPopupOpen && (
        <OurProvidersPEPOP
          tempProfileData={tempProfileData}
          handleProfileDataChange={handleProfileDataChange}
          handleSubmit={handleSubmit}
          closeEditPopup={closeEditPopup}
        />
      )}


      <OverviewActivity overviewData = {corporate?.overview}/>
      <OurProvidersDC doctors ={doctors}/>
      <OurReviewsDc doctorReviews={doctorReviews} patientReviews ={patientReviews}/>
      <OurBlogDc blogs={blogs}/>

      <BlogPopup show={isPopupVisible} handleClose={handleClosePopup} /> {/* Render Popup */}
      <OurProvidersSharePopup corporateName={corporate.corporateName} show={isSharePopupVisible} handleClose={handleCloseSharePopup} />

    </div>
  );
};

export default OurProvidersPage;
