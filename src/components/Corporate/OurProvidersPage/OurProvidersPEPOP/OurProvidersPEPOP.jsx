import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import axios from "axios";
import "./ourproviderspepop.css";

const OurProvidersPEPOP = ({ tempProfileData, handleSubmit, closeEditPopup }) => {
  const fileInputRef = useRef(null);

  // Local state to manage the form fields
  const [formData, setFormData] = useState({
    corporateName: tempProfileData.corporateName || "",
    tagline: tempProfileData.tagline || "",
    // overview: tempProfileData.overview || "",
    location: {
      street: tempProfileData.location.street || "",
      city: tempProfileData.location.city || "",
      state: tempProfileData.location.state || "",
      zipCode: tempProfileData.location.zipCode || "",
      country: tempProfileData.location.country || "",
    },
  });

  const [profileImage, setProfileImage] = useState(tempProfileData.profileImage);
  const [currentFile, setCurrentFile] = useState(null);

  // Handle profile image change and show preview
  const handleProfileImageChangeLocal = (event) => {
    const file = event.target.files[0];
    if (file && file !== currentFile) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setCurrentFile(file);
    }
  };

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit form data, including image, via Axios
// Submit form data, including image, via Axios
const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Extract address fields from formData.location
  const address = {
    street: formData.location.street,
    city: formData.location.city,
    state: formData.location.state,
    zipCode: formData.location.zipCode,
    country: formData.location.country,
  };

  const formDataToSend = new FormData();
  formDataToSend.append("profileImage", currentFile);
  formDataToSend.append("corporateName", formData.corporateName);
  formDataToSend.append("tagline", formData.tagline);
  formDataToSend.append("address", JSON.stringify(address)); // Convert address object to JSON string
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/corporate/edit-profile`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Make sure this is configured for session management
      }
    );
    console.log("Profile updated successfully:", response.data);
    alert("Profile updated successfully");
    closeEditPopup();
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile");
  }
};


  // Trigger file input on icon click
  const handleEditClick = () => fileInputRef.current.click();

  return (
    <div className="our-providers-edit-popup-container">
      <div className="our-providers-edit-popup-content">
        <div className="our-providers-close-btn" onClick={closeEditPopup}>
          <IoClose size="1.3rem" className="our-providers-close-icon" />
        </div>
        <h2>Basic Info</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="our-providers-profile-image-Name-container">
            <div className="our-providers-profile-image-edit-popup">
              <label>Profile Image:</label>
              <div className="our-providers-pop-image-preview-image">
                <img src={profileImage} alt="Profile Preview" />
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="our-providers-edit-popup-input"
                  onChange={handleProfileImageChangeLocal}
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                  style={{ display: "none" }}
                />
                <p
                  onClick={handleEditClick}
                  className="our-providers-edit-popup-add-photo-text"
                >
                  <AiFillCamera size="1.5rem" /> Add photo
                </p>
              </div>
            </div>

            <div className="our-providers-edit-popup-right-side-content">
              <label className="our-providers-edit-popup-form-label">
                Name:
                <input
                  type="text"
                  name="corporateName"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter your name"
                  value={formData.corporateName}
                  onChange={handleFieldChange}
                />
              </label>


              <label className='our-providers-edit-popup-form-label'>
              Headline:
                <div className='our-providers-edit-popup-textarea-container'>
                  <textarea
                    type="text"
                    name="tagline"
                    rows="4"
                    cols="50"
                    placeholder="Enter your location"
                    className='our-providers-edit-popup-textarea'
                    value={formData.tagline}

                    onChange={handleFieldChange}
                    />
                </div>
              </label>

              <label className="our-providers-edit-popup-form-label">
                Street :
                <input
                  type="text"
                  name="location.street"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter street"
                  value={formData.location.street}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                City:
                <input
                  type="text"
                  name="location.city"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter city"
                  value={formData.location.city}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                State:
                <input
                  type="text"
                  name="location.state"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter state"
                  value={formData.location.state}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                Country:
                <input
                  type="text"
                  name="location.country"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter country"
                  value={formData.location.country}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                Zip Code:
                <input
                  type="text"
                  name="location.zipCode"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter zip code"
                  value={formData.location.zipCode}
                  onChange={handleFieldChange}
                />
              </label>

              <button type="submit" className="our-providers-edit-popup-save-chnages">
                <AiOutlineDoubleRight /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OurProvidersPEPOP;
