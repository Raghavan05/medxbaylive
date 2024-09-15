import React, { useState, useRef, useEffect } from 'react';
import './editdoctorprofile.css';
import { TbSquareArrowLeft } from "react-icons/tb";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import profileImage from '../../assests/doctorprofile.png';
import currencyCodes from 'currency-codes';
import { TiPlus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import axios from 'axios';  // Import axios for API requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationPicker from './LocationPicker'; // Assuming you have a LocationPicker component
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

const Editdoctorprofile = () => {
  const [doctorData, setDoctorData] = useState({
    name: "",
    title: "",
    aboutMe: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    country: "",
    state: "",
    cities: "",
    availability: "",
    consultation: "",
    speciality: [],
    conditions: [],
    languages: [],
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    phoneNumber: "",
    doctorFee: "",
    hospitals: [
      { name: "", street: "", city: "", state: "", country: "", zip: "", lat: "", lng: "" },
    ],
    insurances: [],
    awards: [],
    profilePicture: null,
    documents: {
      licenseProof: { data: null, contentType: "" },
      certificationProof: { data: null, contentType: "" },
      businessProof: { data: null, contentType: "" },
    },
  });

  const [allInsurances, setAllInsurances] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [allConditions, setAllConditions] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  

  const [isOpenPersonal, setIsOpenPersonal] = useState(true);
  const [isOpenDoctor, setIsOpenDoctor] = useState(false);
  const [isOpenFees, setIsOpenFees] = useState(false);
  const [isOpenHospital, setIsOpenHospital] = useState([false]);
  const [isOpenDocumentProof, setIsDocumentProof] = useState(false);
  const [isOpenOthers, setIsOpenOthers] = useState(false);
  const [profilePic, setProfilePic] = useState(profileImage);
  const [newSpeciality, setnewSpeciality] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [fees, setFees] = useState(100);
  const [newInsurance, setNewInsurance] = useState('');
  const [newAwards, setNewAwards] = useState('');
  const [newFaq, setNewFaq] = useState('');
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [modalShow, setModalShow] = useState({ show: false, index: null });

  const togglePersonalSection = () => setIsOpenPersonal(!isOpenPersonal);
  const toggleDoctorSection = () => setIsOpenDoctor(!isOpenDoctor);
  const toggleFeesSection = () => setIsOpenFees(!isOpenFees);
  const toggleHospitalSection = (index) => {
    setIsOpenHospital((prevState) =>
      prevState?.map((open, i) => (i === index ? !open : open))
    );
  };
  const toggleDocumentProofSection = () => setIsDocumentProof(!isOpenDocumentProof);
  const toggleOthersSection = () => setIsOpenOthers(!isOpenOthers);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = () => {
      let base64String;
      
      if (fileType === "profilePicture") {
        base64String = reader.result.split(',')[1]; // Extract base64 for image
      } else {
        // Convert binary ArrayBuffer to Base64 for PDFs
        const binaryString = Array.from(new Uint8Array(reader.result))
          .map(byte => String.fromCharCode(byte))
          .join('');
        base64String = btoa(binaryString);
      }
      console.log(base64String);
      
  
      // Update state with selected document data
      setDoctorData((prevData) => ({
        ...prevData,
        documents: {
          ...prevData.documents,
          [fileType]: {
            data: base64String,
            contentType: file.type,
          },
        },
      }));
      
      toast.info(`${fileType.replace("Proof", "")} selected for upload.`);
    };
  
    // Validate and read the file
    if (fileType === "profilePicture") {
      if (!file.type.startsWith("image/")) {
        toast.info("Please upload a valid image file.");
        return;
      }
      reader.readAsDataURL(file);  // Read image as Data URL
    } else if (["licenseProof", "certificationProof", "businessProof"].includes(fileType)) {
      if (file.type !== "application/pdf") {
        toast.info(`Please upload a valid PDF file for ${fileType.replace("Proof", "")}.`);
        return;
      }
      reader.readAsArrayBuffer(file);  // Read PDF as ArrayBuffer
    }
  };
  
  
  
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/profile/update`, {
          withCredentials: true
        });
        const { doctor, insurances, allInsurances, allSpecialties, allConditions } = response.data;
        setDoctorData(doctor);
        console.log(doctor);
        console.log(insurances);

        const profileImageData = doctor.profilePicture
          ? `data:image/jpeg;base64,${doctor.profilePicture.data}`
          : profileImage;
        
        setProfilePicturePreview(profileImageData);
        setAllInsurances(allInsurances);
        setAllSpecialties(allSpecialties);
        setAllConditions(allConditions);
        setInsurances(insurances);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };
    fetchDoctorData();
  }, []);

  
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Convert the file to a base64 string
        const base64String = btoa(
          new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        
        // Update doctorData with base64 profile picture
        setDoctorData((prevData) => ({
          ...prevData,
          profilePicture: {
            data: base64String,
            contentType: file.type,
          },
        }));
  
        // Set preview
        setProfilePicturePreview(URL.createObjectURL(file));
      };
  
      reader.readAsArrayBuffer(file); // Use ArrayBuffer for correct base64 conversion
    }
  };

  const handleProfilePicDelete = () => {
    setDoctorData((prevData) => ({
      ...prevData,
      profilePicture: null
    }));
    setProfilePicturePreview(null); // Clear preview
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDoctorData({ ...doctorData, [id]: value });
  };

  //specialities
// Function to handle adding a selected speciality from the dropdown
const handleSpecialitiesChange = (event) => {
  const selectedSpeciality = event.target.value;  // Get selected speciality name

  // Ensure the speciality is not already in the state
  if (!doctorData.speciality.includes(selectedSpeciality)) {
    setDoctorData({
      ...doctorData,
      speciality: [...doctorData.speciality, selectedSpeciality]  // Add the speciality name
    });
  }
};

// Function to remove a selected speciality
const handleSpecialitiesRemove = (specialityToRemove) => {
  setDoctorData({
    ...doctorData,
    speciality: doctorData.speciality.filter(speciality => speciality !== specialityToRemove)
  });
};


  //conditions
  const handleConditionChange = (event) => {
    const selectedCondition = event.target.value;  // Get selected condition name

    // Ensure the condition is not already in the state
    if (selectedCondition && !doctorData.conditions.includes(selectedCondition)) {
      setDoctorData({
        ...doctorData,
        conditions: [...doctorData.conditions, selectedCondition]  // Add the condition name
      });
    }
  };

  const handleConditionRemove = (conditionToRemove) => {
    setDoctorData({
      ...doctorData,
      conditions: doctorData.conditions.filter(condition => condition !== conditionToRemove)
    });
  };

  //languages
  const handleLanguageKeyDown = (e) => {
    if (e.key === 'Enter' && newLanguage && !doctorData.languages.includes(newLanguage)) {
      setDoctorData({ ...doctorData, languages: [...doctorData.languages, newLanguage] });
      setNewLanguage('');
    }
  };

  const handleLanguageRemove = (language) => {
    setDoctorData({ ...doctorData, languages: doctorData.languages.filter((l) => l !== language) });
  };

  //Insurance
  const handleRemoveInsurance = (index) => {
    const updatedInsurances = doctorData.insurances.filter((_, i) => i !== index);
    setDoctorData({ ...doctorData, insurances: updatedInsurances });
  };

  const handleInsuranceChange = (event) => {
    const selectedInsuranceId = event.target.value;

    // Check if the selected insurance ID is already in the state
    if (!doctorData.insurances.includes(selectedInsuranceId)) {
      setDoctorData({
        ...doctorData,
        insurances: [...doctorData.insurances, selectedInsuranceId]
      });
    }
  };

  //Awards
  const handleAwardsKeyDown = (e) => {
    if (e.key === 'Enter' && newAwards && !doctorData.awards.includes(newAwards)) {
      setDoctorData({ ...doctorData, awards: [...doctorData.awards, newAwards] });
      setNewAwards('');
    }
  };

  const handleAwardsRemove = (awards) => {
    setDoctorData({ ...doctorData, awards: doctorData.awards.filter((c) => c !== awards) });
  };

  //FAQ's
  const handleFaqKeyDown = (e) => {
    if (e.key === 'Enter' && newFaq && !doctorData.faq.includes(newFaq)) {
      setDoctorData({ ...doctorData, faq: [...doctorData.faq, newFaq] });
      setNewFaq('');
    }
  };

  const handleFaqRemove = (faq) => {
    setDoctorData({ ...doctorData, faq: doctorData.faq.filter((c) => c !== faq) });
  };
  //end

  const currencyOptions = currencyCodes.data.map((currency) => ({
    code: currency.code,
    currency: currency.currency
  }));

  const handleHospitalInputChange = (index, field, value) => {
    const updatedHospitals = doctorData.hospitals.map((hospital, i) =>
      i === index ? { ...hospital, [field]: value } : hospital
    );
    setDoctorData({ ...doctorData, hospitals: updatedHospitals }); // Ensure key is 'hospitals'
  };


  const addNewHospital = () => {
    setDoctorData({
      ...doctorData,
      hospitals: [...doctorData.hospitals, { name: '', address: '', city: '', state: '', country: '', zip: '', lat: '', lng: '' }],
    });
    setIsOpenHospital([...isOpenHospital, true]); // Open the newly added hospital section
  };

  const handleRemoveHospital = (index) => {
    setDoctorData(prevData => {
      const updatedHospitals = prevData.hospitals.filter((_, i) => i !== index);
      return { ...prevData, hospitals: updatedHospitals }; // Ensure key is 'hospitals'
    });
  };


  // File input refs
  const profilePicInputRef = useRef(null);
  const certificationProofInputRef = useRef(null);
  const businessProofInputRef = useRef(null);
  const licenseProofInputRef = useRef(null);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleLocationSelect = (lat, lng) => {
    console.log('Selected Location:', { lat, lng });
    setDoctorData((prevData) => ({
      ...prevData,
      hospitals: prevData.hospitals.map((hospital, i) =>
        i === modalShow.index ? { ...hospital, lat, lng } : hospital
      ),
    }));
    // setModalShow({ show: false, index: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formPayload = { ...doctorData };
  
    // Debugging: Log the document data
  
    const transformedDocuments = {};
    for (const key in formPayload.documents) {
      const doc = formPayload.documents[key];
      if (doc && doc.data) {
        transformedDocuments[key] = {
          data: doc.data, 
          contentType: doc.contentType,
        };
      }
    }
  
    formPayload.documents = transformedDocuments;
    console.log('Documents:', formPayload.documents);
    console.log('Documents:', formPayload);
  
    // Proceed with API submission
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
        formPayload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
  
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };
  


  return (
    <>
    <div className='edit-your-profile-container'>
      <div className="edit-doctor-our-profile-header">
        <TbSquareArrowLeft className="back-arrow" onClick={() => window.history.back()} />
        <span className='title-head-to-title'>Edit your Profile</span>
      </div>

      <div className='edit-your-profile-support-to-support-conatiner' onSubmit={handleSubmit}>
        <div className="profile-picture-section">
          <p className='profile-picture-title'>Profile picture</p>
          <div className='profile-picture-flex-direction'>
          {profilePicturePreview ? (
            <img
              src={profilePicturePreview}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <img src={profileImage} alt="Profile" className="profile-picture" />
          )}
            <p className='profile-text'>This will be displayed on your profile</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              id="upload-new"
              style={{ display: 'none' }}
              ref={profilePicInputRef}
            />
            <div className='profile-picture-all-buttons'>
              <button className="upload-btn" onClick={() => profilePicInputRef.current.click()}>Upload new</button>
              <button className="delete-btn" onClick={handleProfilePicDelete}>Delete</button>
            </div>
          </div>
        </div>

        <div className='edit-doctor-scroll-conatiner'>
          <div className='edit-your-profile-all-input-details-header'>
            {/* Personal Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenPersonal ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Personal details</h3>
                <span onClick={togglePersonalSection}>{isOpenPersonal ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
              </div>
              {isOpenPersonal && (
                <div className="edit-your-profile-section-content">
                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" placeholder='Enter your full name' value={doctorData.name} onChange={handleInputChange} />
                    </div>
                    <div className="edop-form-group">
                      <label htmlFor="title">Title</label>
                      <input type="text" id="title" placeholder='Eg., Vascular Surgery' value={doctorData.title} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label htmlFor="about">About</label>
                      <textarea id="aboutMe" placeholder='Describe yourself...' value={doctorData.aboutMe} onChange={handleInputChange}></textarea>
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input type="date" id="dateOfBirth" placeholder='mm-dd-yyyy' value={doctorData.dateOfBirth} onChange={handleInputChange} />
                    </div>

                    <div className="edop-form-group edop-select-box-header">
                      <label htmlFor="gender">Gender</label>
                      <select id="gender" value={doctorData.gender} onChange={handleInputChange} className='edop-select-box-input'>
                        <option >Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" placeholder='Enter your email' value={doctorData.email} onChange={handleInputChange} />
                    </div>

                    <div className="edop-form-group">
                      <label htmlFor="phoneNumber">Mobile number</label>
                      <input type="tel" id="phoneNumber" placeholder='Enter mobile number' value={doctorData.phoneNumber} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="city">City</label>
                      <input type="text" id="city" placeholder='Enter your city' value={doctorData.city} onChange={handleInputChange} />
                    </div>
                    <div className="edop-form-group">
                      <label htmlFor="state">State</label>
                      <input type="text" id="state" placeholder='Enter your state' value={doctorData.state} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group">
                      <label htmlFor="country">Country</label>
                      <input type="text" id="country" placeholder='Enter your country' value={doctorData.country} onChange={handleInputChange} />
                    </div>

                    <div className="edop-form-group">
                      <label htmlFor="zipcode">Zip code</label>
                      <input type="text" id="zipcode" placeholder='Enter your zipcode' value={doctorData.zipcode} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Doctor Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenDoctor ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Doctor details</h3>
                <span onClick={toggleDoctorSection}>{isOpenDoctor ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
              </div>
              {isOpenDoctor && (
                <div className="edit-your-profile-section-content">


                  {/* Specialties Section */}
                  <div className="edop-form-row">
  <div className="edop-form-group edop-full-width">
    <label>Specialities</label>
    <div className="tag-container">
      {/* Display selected specialities as tags */}
      {doctorData.speciality.map((speciality, index) => (
        <span key={index} className="tag-edit-doctor">
          {speciality} {/* Display the speciality name */}
          <button onClick={() => handleSpecialitiesRemove(speciality)}>x</button>
        </span>
      ))}

      {/* Dropdown for adding new specialities */}
      <select
        value=""
        onChange={handleSpecialitiesChange}
        className="edit-doctor-profile-dropdown"
      >
        <option value="" disabled>Select Speciality</option>
        {allSpecialties.map((specialityObj, index) => (
          <option key={index} value={specialityObj.name}>
            {specialityObj.name} {/* Display the name, not the object */}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>



                  {/* Conditions Section */}
                  <div className="edop-form-row">
      <div className="edop-form-group edop-full-width">
        <label>Conditions</label>
        <div className="tag-container">
          {doctorData.conditions.map((condition, index) => (
            <span key={index} className="tag-edit-doctor">
              {condition}
              <button onClick={() => handleConditionRemove(condition)}>x</button>
            </span>
          ))}

          <select
            value=""
            onChange={handleConditionChange}
            className="edit-doctor-profile-dropdown"
          >
            <option value="" disabled>Select Condition</option>
            {allConditions.map((conditionObj, index) => (
              <option key={index} value={conditionObj.name}>
                {conditionObj.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>


                  {/* Languages Section */}
                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Languages</label>
                      <div className="tag-container">
                        {doctorData?.languages?.map((language, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {language} <button onClick={() => handleLanguageRemove(language)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add language"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyDown={handleLanguageKeyDown} // Add onKeyDown handler
                        />
                      </div>
                    </div>
                  </div>

                  {/* Availability and Consultation Section */}
                  <div className="edop-form-row">

                    <div className="edop-form-group edop-select-box-header">
                      <label htmlFor="availability">Availability</label>
                      <select
                        id="availability"
                        value={doctorData.availability || ''} // Ensure the value is either 'available', 'unavailable', or an empty string
                        onChange={handleInputChange}
                        className='edop-select-box-input'
                      >
                        <option value="">Select availability</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                      <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                    </div>


                    <div className="edop-form-group edop-select-box-header">
                      <label htmlFor="consultation">Consultation</label>
                      <select
                        id="consultation"
                        value={doctorData.consultation || ''} // Ensure value matches one of the options or is empty
                        onChange={handleInputChange}
                        className='edop-select-box-input'
                      >
                        <option value="">Select consultation</option>
                        <option value="Video call">Online</option>
                        <option value="In-person">In Person</option>
                        <option value="Both">Both</option>
                      </select>
                      <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Hospital Section */}
            {doctorData?.hospitals.map((hospital, index) => (
        <div key={index} className={`edit-your-profile-details-section ${isOpenHospital[index] ? 'open' : 'closed'}`}>
          <div className="edit-your-profile-section-header">
            <h3>Hospital details {index + 1}</h3>
            <div className='edit-another-hospital-container'>
              <div className='edit-another-hospital-container-icon-text'>
                <TiPlus />
                <span className='edit-another-hospital-container-text' onClick={addNewHospital}>Add another hospital</span>
              </div>
              <span onClick={() => toggleHospitalSection(index)}>
                {isOpenHospital[index] ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
              </span>
            </div>
          </div>
          {isOpenHospital[index] && (
            <div className="hospital-content">
              <div className="edop-form-row">
                <div className="edop-form-group">
                  <label htmlFor={`hospitalName-${index}`}>Hospital Name</label>
                  <input
                    type="text"
                    id={`hospitalName-${index}`}
                    placeholder='Enter Hospital name'
                    value={hospital.name}
                    onChange={(e) => handleHospitalInputChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="edop-form-group">
                  <label htmlFor={`address-${index}`}>Address</label>
                  <input
                    type="text"
                    id={`address-${index}`}
                    placeholder='Enter Hospital full address'
                    value={hospital.address}
                    onChange={(e) => handleHospitalInputChange(index, 'address', e.target.value)}
                  />
                </div>
              </div>
              <div className="edop-form-row">
                <div className="edop-form-group">
                  <label htmlFor={`city-${index}`}>City</label>
                  <input
                    type="text"
                    id={`city-${index}`}
                    placeholder='Enter city'
                    value={hospital.city}
                    onChange={(e) => handleHospitalInputChange(index, 'city', e.target.value)}
                  />
                </div>
                <div className="edop-form-group">
                  <label htmlFor={`state-${index}`}>State</label>
                  <input
                    type="text"
                    id={`state-${index}`}
                    placeholder='Enter state'
                    value={hospital.state}
                    onChange={(e) => handleHospitalInputChange(index, 'state', e.target.value)}
                  />
                </div>
              </div>
              <div className="edop-form-row">
                <div className="edop-form-group">
                  <label htmlFor={`country-${index}`}>Country</label>
                  <input
                    type="text"
                    id={`country-${index}`}
                    placeholder='Enter country'
                    value={hospital.country}
                    onChange={(e) => handleHospitalInputChange(index, 'country', e.target.value)}
                  />
                </div>
                <div className="edop-form-group">
                  <label htmlFor={`pinCode-${index}`}>Zip Code</label>
                  <input
                    type="text"
                    id={`pinCode-${index}`}
                    placeholder='Enter pinCode'
                    value={hospital.zip}
                    onChange={(e) => handleHospitalInputChange(index, 'zip', e.target.value)}
                  />
                </div>
              </div>
              <div className="edit-doctor-Update-container edit-doctor-location-button">
                <Button className="edit-doctor-Update-btn" onClick={() => setModalShow({ show: true, index })}>
                  Pin your location
                </Button>
                <Button className="edit-doctor-Remove-btn" onClick={() => handleRemoveHospital(index)} ><MdDelete />Remove</Button>
              </div>
            </div>
          )}
        </div>
      ))}


            {/* Document verification Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenDocumentProof ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Document verification details</h3>
                <span onClick={toggleDocumentProofSection}>
                  {isOpenDocumentProof ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
                </span>
              </div>

              {isOpenDocumentProof && (
                <div>
                  <div className="edop-form-row">

                    {/* Certification Proof */}
                    <div className='edop-form-group'>
                      <label>Certification Proof</label>
                      <div className="edit-doctor-profile-doc-Proof-file">
                        <input
                          type="file"
                          id="certificationProof"
                          ref={certificationProofInputRef}
                          className="edit-doctor-profile-doc-Proof-input"
                          onChange={(e) => handleFileChange(e, "certificationProof")}
                        />
                        <p className="edit-doctor-profile-doc-Proof-file-name">
                          {doctorData.documents.certificationProof
                            ? (typeof doctorData.documents.certificationProof === 'object'
                              ? doctorData.documents.certificationProof.name || 'File available'
                              : doctorData.documents.certificationProof)
                            : "No file chosen"}
                        </p>
                        <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => certificationProofInputRef.current.click()}>
                          <span>Choose File</span>
                        </div>
                      </div>
                    </div>

                    {/* Business Proof */}
                    <div className='edop-form-group'>
                      <label>Business Proof</label>
                      <div className="edit-doctor-profile-doc-Proof-file">
                        <input
                          type="file"
                          id="businessProof"
                          ref={businessProofInputRef}
                          className="edit-doctor-profile-doc-Proof-input"
                          onChange={(e) => handleFileChange(e, "businessProof")}
                        />
                        <p className="edit-doctor-profile-doc-Proof-file-name">
                          {doctorData.documents.businessProof
                            ? (typeof doctorData.documents.businessProof === 'object'
                              ? doctorData.documents.businessProof.name || 'File available'
                              : doctorData.documents.businessProof)
                            : "No file chosen"}
                        </p>
                        <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => businessProofInputRef.current.click()}>
                          <span>Choose File</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* License Proof */}
                  <div className="edop-form-group edop-form-padding-or-magin">
                    <label>License Proof</label>
                    <div className="edit-doctor-profile-doc-Proof-file">
                      <input
                        type="file"
                        id="licenseProof"
                        ref={licenseProofInputRef}
                        className="edit-doctor-profile-doc-Proof-input"
                        onChange={(e) => handleFileChange(e, "licenseProof")}
                      />
                      <p className="edit-doctor-profile-doc-Proof-file-name">
                        {doctorData.documents.licenseProof
                          ? (typeof doctorData.documents.licenseProof === 'object'
                            ? doctorData.documents.licenseProof.name || 'File available'
                            : doctorData.documents.licenseProof)
                          : "No file chosen"}
                      </p>
                      <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => licenseProofInputRef.current.click()}>
                        <span>Choose File</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            {/* Fees details Section */}
            <div className={`edit-your-profile-details-section ${isOpenFees ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Fees details</h3>
                <span onClick={toggleFeesSection}>{isOpenFees ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
              </div>
              {isOpenFees && (
                <div className="edit-doctor-fees-details-conatiner">
                  <span>Enter your fees</span>
                  <div className="fees-input-container">
                    <div className=''>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="currency-dropdown"
                      >
                        {currencyOptions?.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code} ({option.currency})  {/* Show currency code and name */}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="number"
                      value={doctorData.doctorFee}
                      onChange={(e) => setFees(e.target.value)}
                      className="fees-input"
                      placeholder="Enter fee amount"
                    />
                  </div>
                </div>

              )}
            </div>

            {/* Others Details Section */}
            <div className={`edit-your-profile-details-section ${isOpenOthers ? 'open' : 'closed'}`}>
              <div className="edit-your-profile-section-header">
                <h3>Others details</h3>
                <span onClick={toggleOthersSection}>
                  {isOpenOthers ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
                </span>
              </div>

              {isOpenOthers && (
                <div className="edit-your-profile-section-content">
                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Insurance</label>
                      <div className="tag-container">
                        {/* Display selected insurances as tags */}
                        {doctorData.insurances?.map((insurance, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {/* Find and display insurance name */}
                            {allInsurances.find(ins => ins._id === insurance)?.name}
                            <button onClick={() => handleRemoveInsurance(index)}>x</button>
                          </span>
                        ))}

                        {/* Dropdown for adding new insurance */}
                        <select
                          value=""
                          onChange={handleInsuranceChange}
                          className="edit-doctor-profile-dropdown"
                        >
                          <option value="" disabled>Select Insurance</option>
                          {allInsurances.map((insurance) => (
                            <option key={insurance._id} value={insurance._id}>
                              {insurance.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="edop-form-row">
                    <div className="edop-form-group edop-full-width">
                      <label>Awards</label>
                      <div className="tag-container">
                        {doctorData?.awards.map((award, index) => (
                          <span key={index} className="tag-edit-doctor">
                            {award} <button onClick={() => handleAwardsRemove(award)}>x</button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add Awards"
                          value={newAwards}
                          onChange={(e) => setNewAwards(e.target.value)}
                          onKeyDown={handleAwardsKeyDown}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Optional FAQ section */}
                  {/* 
          <div className="edop-form-row">
            <div className="edop-form-group edop-full-width">
              <label>FAQ’s</label>
              <div className="tag-container">
                {doctorData.faq.map((faqs, index) => (
                  <span key={index} className="tag-edit-doctor">
                    {faqs} <button onClick={() => handleFaqRemove(faqs)}>x</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add FAQ’s"
                  value={newFaq}
                  onChange={(e) => setNewFaq(e.target.value)}
                  onKeyDown={handleFaqKeyDown}
                />
              </div>
            </div>
          </div>
          */}
                </div>
              )}
            </div>

            <div>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span htmlFor="terms">
                  I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms and Conditions
                  </a>
                </span>
              </div>

              <small>Please read and accept our Terms and Conditions before submitting.</small>
              <div className={`edit-doctor-Update-container${!isChecked ? "disabled" : ""}`} >
                <button className="edit-doctor-Update-btn mt-3" type="submit" disabled={!isChecked} onClick={handleSubmit}>Update Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LocationPicker
    zoom={13}
    style={{ height: '400px', width: '100%' }}
    dragging={true}
    zoomControl={true}
    show={modalShow.show}
    handleClose={() => setModalShow({ show: false, index: null })}
    handleLocationSelect={handleLocationSelect}
  />
  </>
  );
};

export default Editdoctorprofile;