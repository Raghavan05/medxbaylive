import React, { useState, useRef, useEffect } from 'react';
import './ourproviderspage.css';
import axios from 'axios';
import { LuPencil } from "react-icons/lu";
import { PiDotsThreeCircle } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { RxExternalLink } from "react-icons/rx";
import { BiSolidShareAlt } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import providers from './Assets/providers3.png';
import providersprofile from './Assets/images.png';

import Dentist from './Assets/teethimg.png';
import Heart from './Assets/heartbeatimg.png';
import Care from './Assets/doctorimg.png';
import Cancer from './Assets/puzzleimg.png';
import DNA from './Assets/testtubeimg.png';
import Psychology from './Assets/lookingclinic.png';
import MRI from './Assets/MRIimg.png';
import XRay from './Assets/xrayimg.png';

import Ellipse from './Assets/Ellipse 4153.png';

import OurProvidersDC from './OurProvidersDC/OurProvidersDC';
import OurReviewsDc from './OurReviewsDc/OurReviewsDc';
import OurBlogDc from './OurBlogDc/OurBlogDc';
import BlogPopup from '../../patientBlog/BlogPopup';

const OurProvidersPage = () => {
  const [backgroundImage, setBackgroundImage] = useState(providers);
  const [name, setName] = useState("");
  const [rateing, setRateing] = useState();
  const [tagline, setTagline] = useState("Your Vision | Our Innovation");
  const [location, setLocation] = useState("");
  const [followers, setFollowers] = useState();
  const [employees, setEmployees] = useState("11-50");
  const fileInputRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Add popup state
  const [activityfollowers, setActivityfollowers] = useState(5000);
  const [doctors, setDoctors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState("");
  const [overview,setOverview] = useState();
  
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const items = [
    { name: "Dentist", icon: Dentist, active: true },
    { name: "Heart", icon: Heart, active: false },
    { name: "Care", icon: Care, active: false },
    { name: "Cancer", icon: Cancer, active: false },
    { name: "DNA", icon: DNA, active: false },
    { name: "Psychology", icon: Psychology, active: false },
    { name: "MRI", icon: MRI, active: false },
    { name: "X-Ray", icon: XRay, active: false },
  ];

  const posts = [
    {
      author: 'Zack Darma',
      timeAgo: '2 months',
      image: Ellipse,
      title: 'Bacteria Cancer',
      description: 'A detailed article about thyroid cancer\n500+ people viewed your post...',
    },
  ];

  // Fetch profile data from backend
  useEffect(() => {
    const fetchCorporateDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/corporate/profile`,
          { withCredentials: true }
        );
          const { corporate, doctors ,blogs} = response.data;
          console.log(response.data);
          
          
          setName(corporate.corporateName );
          setBackgroundImage(corporate.coverPhoto);
          setProfile(corporate.profilePicture);
          setTagline(corporate.tagline || 'Your Vision | Our Innovation');
          setLocation(corporate.address || 'IT Services and Consulting');
          setFollowers(corporate.followers?.length || 24);
          setEmployees(corporate.employees || '11-50');
          setDoctors(doctors || []);
          setBlogs(blogs || []);
          setOverview(corporate.overview);
          setRateing(corporate.rating)
        
      } catch (error) {
        console.error("Error fetching corporate details:", error);
      }
    };
  
    fetchCorporateDetails();
  }, []);
  

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

  const getProfileImage = (formData) => {
    if (formData?.data?.type === "Buffer") {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === "string") {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return providersprofile;
    }
  };

  return (
    <div className="our-providers-profile-container">
        <div className="background-image">
            <img src={getProfileImage(backgroundImage)} alt="Background" />
            <div className="our-provider-edit-profile">
            <input
                type="file"
                id="profilePicture"
                ref={fileInputRef}
                onChange={handleChange}
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
            />
            <LuPencil className="edit-icon" onClick={handleEditClick} />
            </div>
            <div className="profile-info">
                <div className="profile-logo">
                <img src={getProfileImage(profile)} alt="MedxBay Logo" />
                </div>
            </div>
        </div>
        <div className="our-providers-profile-details">
            <div className='our-providers-body'>
                <div className='our-providers-body-title-container' >
                  <h2>{name}</h2>
                  <div className='our-providers-rateing-number'>
                   {rateing} <IoIosStar/> 
                  </div>
                </div>
                <p className="tagline">{tagline}</p>
                <p className="location">{location.city} | {location.state} | {location.country}</p>
                <p className="followers">
                    {followers} followers | {employees} employees
                </p>
            </div>
            <div className="our-providers-body-buttons">
                <div className='our-providers-body-buttons-two'>
                    <button className="follow-button" onClick={handleShowPopup}><FaPlus size='1rem'/> Follow</button>
                    <button className="message-button" onClick={handleShowPopup}><PiPaperPlaneTiltBold size='1rem'/> Message</button>
                    <div className='DotsThreeCircle' onClick={toggleDropdown}>
                        <PiDotsThreeCircle  className={`DotsThreeCircle-icon ${isDropdownOpen ? 'rotate' : ''}`}/>
                    </div>
                    {isDropdownOpen && (
                          <div className={`our-providers-dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                        <div className="our-providers-dropdown-item"><RxExternalLink size='1rem' /> Copy Link</div>
                        <div className="our-providers-dropdown-item"><BiSolidShareAlt size='1rem' /> Share Profile</div>
                        <div className="our-providers-dropdown-item" onClick={handleShowPopup}><TbEdit size='1rem' /> Edit Profile</div>
                        </div>
                    )}
                </div>
                <button className="appointment-button" onClick={handleShowPopup}>Book an Appointment</button>
            </div>
        </div>
        <div className='our-providers-overview-activity-container'>
          <div className='our-providers-overview'>
            <h2>Overview</h2>
            <p>{overview?.split(" ").slice(0, 100).join(" ") + "..."}</p> {/* Directly limit overview here */}
            <h2>Our Specialties</h2>
            <div className="our-providers-our-specialties-icons-container">
                {items.map((item, index) => (
                    <div key={index} className='our-specialties-icons-item'>
                        <img src={item.icon} alt={item.name} className="our-specialties-icons-image" />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
          </div>  
          <div className='our-providers-activity-container'>
            <div className='our-providers-activity-flex-head'>
              <div className='our-providers-activity-content'>
                <h2>Activity</h2>
                <div className='post-comment-buttons-container'>
                  <button className="post-button">Post</button>
                  <button className="comment-button">Comments</button>
                </div>
                <p>{activityfollowers} Followers</p>
              </div>
              <div className='our-providers-Create-Post-button'>
                <button className="post-button" onClick={handleShowPopup}><BiPencil size='1rem' className='mr-1'/>Create Post</button>
              </div>
            </div>
            <div className='our-providers-activity-underline'></div>
            <div>
              {posts.map((post, index) => (
                <div key={index} className="our-providers-post-card">
                  <div className="our-providers-activity-body-content">
                    <p>{post.author} Posted this</p>
                    <ul className="m-0">
                      <li>{post.timeAgo}</li>
                    </ul>
                  </div>
                  <div className="our-providers-activity-body-image-content">
                    <img src={post.image} alt="post" className="post-image" />
                    <div className='our-providers-activity-body-image-content-details'>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-description">{post.description}</p>
                      <span className="show-more">show more</span>
                    </div>
                  </div>
                  <h2 onClick={handleShowPopup}>Show all Conditions <FaArrowRightLong size='1rem' className='show-all-conditions-icon'/></h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <OurProvidersDC doctors={doctors}/>
        <OurReviewsDc/>
        <OurBlogDc blogs={blogs}/>

        <BlogPopup show={isPopupVisible} handleClose={handleClosePopup} /> {/* Render Popup */}

    </div>
  );
};

export default OurProvidersPage;
