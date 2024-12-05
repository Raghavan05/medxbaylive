import React, { useState, useRef, useEffect } from 'react';
import './overviewactivityproducts.css';

// Icons
import { LuPencil } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";

// Images
import Ipod from "../Assets/ipod.png";
import surgery from "../Assets/surgery.png";
import controler from "../Assets/controler.png";
import woodenLeg from "../Assets/wooden-leg.png";
// import DNA from "../Assets/testtubeimg.png";
// import Psychology from "../Assets/lookingclinic.png";
// import MRI from "../Assets/MRIimg.png";
// import XRay from "../Assets/xrayimg.png";
import Ellipse from "../Assets/Ellipse 4153.png";

// Default Image
import iconnotshowing from "../Assets/iconnotshowing.png";
import axios from 'axios';
import { Link } from 'react-router-dom';

const OverviewActivityProducts = ({overviewData,productCategories}) => {
  // Initial Data
  const initialSpecialties = [
    { name: "Medical Equipment", icon: Ipod },
    { name: "Surgical Instruments", icon: surgery },
    { name: "Diagnostic Equipment", icon: controler },
    { name: "Orthopedic Products", icon: woodenLeg },
    // { name: "DNA", icon: DNA },
    // { name: "Psychology", icon: Psychology },
    // { name: "MRI", icon: MRI },
    // { name: "X-Ray", icon: XRay },
  ];

  const posts = [
    {
      author: "Zack Darma",
      timeAgo: "2 months ago",
      image: Ellipse,
      title: "Bacteria Cancer",
      description: "A detailed article about thyroid cancer.\n500+ people viewed your post...",
    },
  ];

  // State Management
  const [overviewText1, setOverviewText1] = useState(overviewData);
  const [overviewText2, setOverviewText2] = useState(
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker..."
  );
  const fileInputRef = useRef(null);
  const [specialties, setSpecialties] = useState([]); // Main view specialties
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempOverviewText1, setTempOverviewText1] = useState(overviewText1);
  const [tempOverviewText2, setTempOverviewText2] = useState(overviewText2);
  const [tempSpecialties, setTempSpecialties] = useState([...initialSpecialties]); // Specialties for modal
  const [isSaving, setIsSaving] = useState(false);

      // Convert buffer data to Base64
      const bufferToBase64 = (buffer) => {
        if (buffer?.type === "Buffer" && Array.isArray(buffer?.data)) {
          const bytes = new Uint8Array(buffer.data);
          let binary = "";
          bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
          return `data:image/jpeg;base64,${btoa(binary)}`;
        }
        return "";
    };
    const getProfileImage = (formData) => {
        if (formData?.data?.type === "Buffer") {
            return bufferToBase64(formData.data);
        } else if (typeof formData?.data === "string") {
            return `data:image/jpeg;base64,${formData.data}`;
        } else {
            return iconnotshowing;
        }
    };
      
  useEffect(() => {
    const storedSpecialties = localStorage.getItem("category");
    if (storedSpecialties) {
      setSpecialties(JSON.parse(storedSpecialties));
    } else {
      setSpecialties([]); // or fetch from the backend if needed
    }
  }, []);

  // Modal Functions
  const openModal = () => {
    setTempOverviewText1(overviewText1);
    setTempOverviewText2(overviewText2);
    setIsModalOpen(true);
    document.body.classList.add("scroll-lock");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("scroll-lock");
  };

  // Add a new specialty
  const addNewSpecialty = () => {
    const newSpecialty = {
      name: `Enter a Name ${tempSpecialties.length + 1}`,
      icon: iconnotshowing,
      isEditing: true,
      isAdded: false,
    };
    setTempSpecialties([...tempSpecialties, newSpecialty]);
  };

  // Handle specialty name change
  const handleNameChange = (index, newName) => {
    const updatedSpecialties = [...tempSpecialties];
    updatedSpecialties[index].name = newName;
    setTempSpecialties(updatedSpecialties);
  };

// Handle specialty image upload
const handleImageUpload = (e, index) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedSpecialties = [...tempSpecialties];
      updatedSpecialties[index].image = {
        contentType: file.type,
        data: {
          type: "Buffer",
          data: Array.from(new Uint8Array(reader.result)),
        },
      };
      setTempSpecialties(updatedSpecialties);
    };
    reader.readAsArrayBuffer(file);
  }
};

  const toggleSpecialty = (index) => {
    const updatedSpecialties = [...tempSpecialties];
    updatedSpecialties[index].isAdded = !updatedSpecialties[index].isAdded;
    setTempSpecialties(updatedSpecialties);
  
    // Update localStorage
    const persistentSpecialties = updatedSpecialties.filter((item) => item.isAdded);
    localStorage.setItem("category", JSON.stringify(persistentSpecialties));
  };
  
  const removeSpecialty = (index) => {
    const updatedSpecialties = [...tempSpecialties];
    updatedSpecialties.splice(index, 1);
    setTempSpecialties(updatedSpecialties);
  
    // Update localStorage
    const persistentSpecialties = updatedSpecialties.filter((item) => item.isAdded);
    localStorage.setItem("category", JSON.stringify(persistentSpecialties));
  };
  const handleEditClick = (index) => {
    const fileInput = document.getElementById(`fileInput-${index}`);
    if (fileInput) fileInput.click();
  };

  // Save changes from modal
  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Ensure no empty names exist
      if (tempSpecialties.some((item) => !item.name.trim())) {
        alert("Please fill in all specialty names.");
        setIsSaving(false);
        return;
      }
  
      const updatedSpecialties = tempSpecialties.filter((item) => item.isAdded);
      
      // Store the updated specialties in localStorage
      localStorage.setItem("category", JSON.stringify(updatedSpecialties));
      window.location.reload();
  
      // Optionally save to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/corporate/update-profile`,
        {
          overview: tempOverviewText1,
        },
        { withCredentials: true }
      );
      const specialtiesResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/corporate/add-category`,
        {
          specialties: updatedSpecialties,
        },
        { withCredentials: true }
      );
      
      setSpecialties(updatedSpecialties);
      console.log("Update successful:", response.data);
      console.log("Update successful:", specialtiesResponse.data);
      alert("Overview updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="our-products-overview-activity-container">
      {/* Overview Section */}
      <div className="our-products-overview">
        <div className="our-products-overview-edit-icons-contains">
          <div className="our-products-overview-edit-icons-head">
            <LuPencil className="our-products-overview-edit-icons" onClick={openModal} />
          </div>
        </div>
        <h2>Overview</h2>
        <p>
  {overviewData && overviewData.length > 555 
    ? `${overviewData.slice(0, 555)}...` 
    : overviewData || 'No overview available'}
</p>

        <h2>Our Categories</h2>
        <div className="our-products-our-specialties-icons-container">
          {specialties.length > 0 ? (
            specialties.map((item, index) => (
              <div key={index} className="our-specialties-icons-item">
                <img src={item.icon} alt={item.name}   className="our-specialties-icons-image"/>
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <p>No specialties selected yet.</p>
          )}
        </div>
      </div>

      {/* Condition Libraries */}
      <div className="our-products-activity-container">
        <div className="our-products-activity-flex-head">
          <h2>Condition Libraries</h2>
        </div>
        <div className="our-products-activity-underline"></div>
        <div>
          {posts.map((post, index) => (
            <div key={index} className="our-products-post-card">
              <div className="our-products-activity-body-content">
                <p>{post.author} Posted this</p>
                <ul className="m-0">
                  <li>{post.timeAgo}</li>
                </ul>
              </div>
              <div className="our-products-activity-body-image-content">
                <img src={post.image} alt="post" className="post-image" />
                <div className="our-products-activity-body-image-content-details">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  <span className="show-more">show more</span>
                </div>
              </div>
              <h2>
              <Link to={'https://conditions.medxbay.com/'} target='_blank'>
                Show all Conditions
                <FaArrowRightLong size="1rem" className="show-all-conditions-icon" />
                </Link>
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="our-products-overview-modal-container fade-in">
          <div className="our-products-overview-modal-content">
            <div className="our-products-overview-close-btn" onClick={closeModal}>
              <IoClose size="1.3rem" className="our-products-overview-close-icon" />
            </div>
            <h2>Edit Overview</h2>

            {/* Textarea for Overview */}
            <div className="our-products-overview-textarea-container">
              <div className="our-products-overview-textarea-head ">
                <textarea
                  rows="4"
                  value={tempOverviewText1}
                  placeholder="Edit the first paragraph..."
                  className="editable-textarea fade-in"
                  onChange={(e) => setTempOverviewText1(e.target.value)}
                />
              </div>
              {/* <div className="our-products-overview-textarea-head ">
                <textarea
                  rows="4"
                  value={tempOverviewText2}
                  placeholder="Edit the second paragraph..."
                  className="editable-textarea fade-in"
                  onChange={(e) => setTempOverviewText2(e.target.value)}
                />
              </div>   */}
            </div> 

            <h2>Our Categories</h2>
            <div className="our-products-specialty-edit-total-container">
              {tempSpecialties.map((item, index) => (
                <div key={index} className="our-products-specialty-edit-container fade-in">
                  <div className="our-products-specialty-edit-image-name">
                    <img src={item.icon} alt={item.name} className="our-products-specialty-image-preview" />
                    {item.isEditing ? (
                      <div className='our-products-specialty-add-new-one'>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleNameChange(index, e.target.value)}
                          className="our-products-specialty-inputs-style"
                        />
                         <input
                          type="file"
                          id={`fileInput-${index}`}
                          onChange={(e) => handleImageUpload(e, index)}
                          accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                          style={{ display: 'none' }}
                        />
                        <p
                          onClick={() => handleEditClick(index)}
                          className="our-products-specialty-popup-add-photo"
                        >
                          <AiFillCamera size="1.5rem" /> Add photo
                        </p>
                      </div>
                    ) : (
                      <p className="m-0">{item.name}</p>
                    )}
                    <button onClick={() => toggleSpecialty(index)}  className="our-products-specialty-edit-popup-remove-button">
                      {item.isAdded ? "Remove" : "Add"}
                    </button>
                    <button onClick={() => removeSpecialty(index)}  className="our-products-specialty-edit-popup-remove-button">Delete</button>
                  </div>
                </div>
              ))}
            </div> 
            <div className="our-products-specialty-edit-popup-button-container"> 
              <button onClick={addNewSpecialty} className="our-products-specialty-edit-popup-add-new-changes-button fade-in">Add New Specialty</button>
              <button onClick={saveChanges} disabled={isSaving} className="our-products-specialty-edit-popup-save-chnages-button fade-in">
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewActivityProducts;
