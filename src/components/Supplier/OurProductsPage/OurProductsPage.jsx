import React, { useState, useRef, useEffect } from 'react';
import './ourproductspage.css';
//Defult Cover-Image
import providers from './Assets/providers3.png';

//Defult profile-Image
import providersprofile from './Assets/images.png';

//React icons
import { LuPencil } from 'react-icons/lu';
import { IoIosStar } from 'react-icons/io';
import { PiDotsThreeCircle } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import { PiPaperPlaneTiltBold } from 'react-icons/pi';
import { RxExternalLink } from 'react-icons/rx';
import { BiSolidShareAlt } from 'react-icons/bi';
import { TbEdit } from 'react-icons/tb';

//All components render in Ourproviders page
import OurProductsPEPOP from './OurProductsPEPOP/OurProductsPEPOP';
import OverviewActivityProducts from './OverviewActivityProducts/OverviewActivityProducts';
import OurProductsDC from './OurProductsDC/OurProductsDC';
import ReviewPageProducts from './ReviewPageProducts/ReviewPageProducts';
import Condition from './Condition/Condition';
import axios from 'axios';
import BlogPopup from '../../patientBlog/BlogPopup';
import OurProductsSharePopup from './OurProductsSharePopup/OurProductsSharePopup'
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';



const OurProductsPage = () => {
  const [backgroundImage, setBackgroundImage] = useState(providers);
  const [profileData, setProfileData] = useState({
    name: 'MedxBay',
    rating: 4.1,
    Headline: 'Your Vision | Our Innovation',
    location: 'IT Services and IT Consulting | Aminjikkarai, Tamil Nadu 24 followers | 11-50 employees',
    followers: 24,
    employees: 50,
    profileImage: providersprofile,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const [supplier, setSupplier] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchSuppliersDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/supplier/profile`,
          { withCredentials: true }
        );
        const { supplier, products, blogs } = response.data;
        setSupplier(supplier);
        setProducts(products);
        setBlogs(blogs);

        console.log(response.data);

        setProfileData({
          name: supplier.name || "Supplier Name",
          rating: supplier.rating || 0,
          tagline: supplier.tagline,
          location: supplier.address || "IT Services and Consulting",
          followers: supplier.followers?.length || 24,
          employees: supplier.employees || "11-50",
          profileImage: supplier.profilePicture ? bufferToBase64(supplier.profilePicture.data) : providersprofile,
        });
        setBackgroundImage(bufferToBase64(supplier.coverPhoto.data) || providers);
      } catch (error) {
        console.error("Error fetching corporate details:", error);
      }
    };
    fetchSuppliersDetails();
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

  //Cover-image-Handle the image change
  // const handleChangeCoverimage = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => setBackgroundImage(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };
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
          `${process.env.REACT_APP_BASE_URL}/supplier/update-profile`,
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
          toast.success("Cover photo updated successfully")
        }
      } catch (error) {
        console.error("Error uploading cover photo:", error);
      }
    }
  };
  //Cover-image-Handle the file input click 
  const handleEditClick = () => fileInputRef.current.click();

  //ToggleDropdown function
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  //Popup logic
  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Add popup state
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false); // State for share popup


  const openEditPopup = () => {
    setTempProfileData(profileData);
    setIsEditPopupOpen(true);
    document.body.classList.add('scroll-lock');
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    document.body.classList.remove('scroll-lock');
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


  useEffect(() => {
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, []);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempProfileData(prevData => ({ ...prevData, profileImage: imageURL }));
    }
  };

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setTempProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const copyLink = () => {
    const link = window.location.href; // Get the current URL of the page
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!'); // Optional: Show a success message
    }).catch(err => {
      console.error('Failed to copy link: ', err); // Handle any errors
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData(tempProfileData);
    closeEditPopup();
  };

  return (
    <>
    <ToastContainer/>
    <div className="our-products-profile-container">
      <div className="our-products-cover-profile-image-head">
        <img src={backgroundImage} alt="Background" />
        <div className="our-products-edit-cover-img">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChangeCoverImage}
            style={{ display: 'none' }}
            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
          />
          <LuPencil className="our-products-cover-edit-icon" onClick={handleEditClick} />
        </div>

        <div className="our-products-profile-info">
          <div className="our-products-profile-img">
            <img src={profileData.profileImage} alt="Profile" />
          </div>
        </div>
      </div>

      <div className="our-products-profile-details">
        <div className="our-products-body">
          <div className="our-products-body-title-container">
            <h2>{profileData.name}</h2>
            <div className="our-products-rating-number">
              {profileData.rating} <IoIosStar />
            </div>
          </div>
          <p className="Headline">{profileData.tagline}</p>
          <p className="location">{profileData.location.city + ' | ' + profileData.location.state + ' | ' + profileData.location.country}</p>
          <p className="followers">
            {profileData.followers} followers | {profileData.employees} employees
          </p>
        </div>

        <div className="our-products-body-buttons">
          <div className="our-products-body-buttons-two">
            <button className="follow-button" onClick={handleShowPopup}><FaPlus size='1rem' /> Follow</button>
            <button className="message-button" onClick={handleShowPopup}><PiPaperPlaneTiltBold size='1rem' /> Message</button>
            <div className="DotsThreeCircle" tabIndex={0} onClick={toggleDropdown}>
              <PiDotsThreeCircle className={`DotsThreeCircle-icon ${isDropdownOpen ? 'rotate' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className={`our-products-dropdown-content ${isDropdownOpen ? 'show' : ''}`}
                tabIndex={0}
                onBlur={handleBlur}
              >
                <div className="our-products-dropdown-item" onClick={copyLink}>
                  <RxExternalLink size="1rem" /> Copy Link
                </div>
                <div className="our-products-dropdown-item" onClick={handleShareClick}>
                  <BiSolidShareAlt size="1rem" /> Share Profile
                </div>
                <div className="our-products-dropdown-item" onClick={openEditPopup}>
                  <TbEdit size="1rem" /> Edit Profile
                </div>
              </div>
            )}

            {isEditPopupOpen && (
              <OurProductsPEPOP
                tempProfileData={tempProfileData}
                handleProfileDataChange={handleProfileDataChange}
                handleProfileImageChange={handleProfileImageChange}
                handleSubmit={handleSubmit}
                closeEditPopup={closeEditPopup}
              />
            )}
          </div>
          <Link to={'/contact-us'}>
          <button className="appointment-button">Book an Appointment</button>
          </Link>
          </div>
      </div>
      <OverviewActivityProducts overviewData={supplier.overview} productCategories={supplier.productCategories}/>
      <OurProductsDC products={products} />
      <ReviewPageProducts review={supplier.reviews} />
      <Condition blogs={blogs} />

      <BlogPopup show={isPopupVisible} handleClose={handleClosePopup} /> {/* Render Popup */}
      <OurProductsSharePopup name={supplier.name} show={isSharePopupVisible} handleClose={handleCloseSharePopup} />

    </div>
    </>
  );
};

export default OurProductsPage
