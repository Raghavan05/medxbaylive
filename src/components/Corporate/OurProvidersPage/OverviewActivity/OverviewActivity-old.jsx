import React, { useState, useRef, useEffect } from "react";
import "./overviewactivity.css";

// Icons
import { LuPencil } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";

// Images
import Dentist from "../Assets/teethimg.png";
import Heart from "../Assets/heartbeatimg.png";
import Care from "../Assets/doctorimg.png";
import Cancer from "../Assets/puzzleimg.png";
import DNA from "../Assets/testtubeimg.png";
import Psychology from "../Assets/lookingclinic.png";
import MRI from "../Assets/MRIimg.png";
import XRay from "../Assets/xrayimg.png";
import Ellipse from "../Assets/Ellipse 4153.png";

// Default Image
import iconnotshowing from "../Assets/iconnotshowing.png";
import axios from "axios";
import { Link } from "react-router-dom";

const OverviewActivity = ({ overviewData, corporateSpecialties }) => {

  // Initial Data
  const initialSpecialties = [
    { name: "Dentist", icon: Dentist },
    { name: "Heart", icon: Heart },
    { name: "Care", icon: Care },
    { name: "Cancer", icon: Cancer },
    { name: "DNA", icon: DNA },
    { name: "Psychology", icon: Psychology },
    { name: "MRI", icon: MRI },
    { name: "X-Ray", icon: XRay },
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
  const [tempSpecialties, setTempSpecialties] = useState([...corporateSpecialties || []]);
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

  const addNewSpecialty = () => {
    const newSpecialty = {
      name: `Enter a Name ${tempSpecialties.length + 1}`,
      icon: iconnotshowing,
      isEditing: true,
      isAdded: false,
    };
    setTempSpecialties([...tempSpecialties, newSpecialty]);
  };

  const handleNameChange = (index, newName) => {
    const updatedSpecialties = [...tempSpecialties];
    updatedSpecialties[index].name = newName;
    setTempSpecialties(updatedSpecialties);
  };

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
  // Toggle specialty "added" state
const toggleSpecialty = (index) => {
  const updatedSpecialties = [...tempSpecialties];
  updatedSpecialties[index].isAdded = !updatedSpecialties[index].isAdded;
  setTempSpecialties(updatedSpecialties);
};

const handleEditClick = (index) => {
  const fileInput = document.getElementById(`fileInput-${index}`);
  if (fileInput) fileInput.click();
};


  const removeSpecialty = (index) => {
    const updatedSpecialties = [...tempSpecialties];
    updatedSpecialties.splice(index, 1);
    setTempSpecialties(updatedSpecialties);
  };

  const saveChanges = async () => {
    setIsSaving(true);

    if (tempSpecialties.some((item) => !item.name.trim())) {
      alert("Please fill in all specialty names.");
      setIsSaving(false);
      return;
    }

    const addedSpecialties = tempSpecialties.filter((item) => !item.isAdded);

    try {
      for (const specialty of addedSpecialties) {
        const formData = new FormData();
        formData.append("name", specialty.name);

        if (specialty.icon instanceof File) {
          formData.append("image", specialty.icon);
        }

        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/corporate/add-specialty`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
      }

      setSpecialties(tempSpecialties.filter((item) => item.isAdded || addedSpecialties.includes(item)));
      alert("Specialties added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error saving specialties:", error);
      alert("Failed to save specialties. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  // const saveChanges = () => {
  //   setIsSaving(true);

  //   // Validate input
  //   if (tempSpecialties.some((item) => !item.name.trim())) {
  //     alert("Please fill in all specialty names.");
  //     setIsSaving(false);
  //     return;
  //   }

  //   setOverviewText1(tempOverviewText1);
  //   setOverviewText2(tempOverviewText2);
  //   setSpecialties(tempSpecialties.filter((item) => item.isAdded));
  //   closeModal();
  //   setIsSaving(false);
  // };

  return (
    <div className="our-providers-overview-activity-container">
      {/* Overview Section */}
      <div className="our-providers-overview">
        <div className="our-providers-overview-edit-icons-contains">
          <div className="our-providers-overview-edit-icons-head">
            <LuPencil className="our-providers-overview-edit-icons" onClick={openModal} />
          </div>
        </div>
        <h2>Overview</h2>
        <p>
          {overviewData && overviewData.length > 555
            ? `${overviewData.slice(0, 555)}...`
            : overviewData || 'No overview available'}
        </p>

        <h2>Our Specialties</h2>
        <div className="our-providers-our-specialties-icons-container">
          {specialties.length > 0 ? (
            specialties.map((item, index) => (
              <div key={index} className="our-specialties-icons-item">
                <img src={item.icon} alt={item.name} className="our-specialties-icons-image" />
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <p>No specialties selected yet.</p>
          )}
        </div>
      </div>

      {/* Condition Libraries */}
      <div className="our-providers-activity-container">
        <div className="our-providers-activity-flex-head">
          <h2>Condition Libraries</h2>
        </div>
        <div className="our-providers-activity-underline"></div>
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
                <div className="our-providers-activity-body-image-content-details">
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
        <div className="our-providers-overview-modal-container fade-in">
          <div className="our-providers-overview-modal-content">
            <div className="our-providers-overview-close-btn" onClick={closeModal}>
              <IoClose size="1.3rem" className="our-providers-overview-close-icon" />
            </div>
            <h2>Edit Overview</h2>

            {/* Textarea for Overview */}
            <div className="our-providers-overview-textarea-container">
              <div className="our-providers-overview-textarea-head ">
                <textarea
                  rows="4"
                  value={tempOverviewText1}
                  placeholder="Edit the first paragraph..."
                  className="editable-textarea fade-in"
                  onChange={(e) => setTempOverviewText1(e.target.value)}
                />
              </div>
              {/* <div className="our-providers-overview-textarea-head ">
                <textarea
                  rows="4"
                  value={tempOverviewText2}
                  placeholder="Edit the second paragraph..."
                  className="editable-textarea fade-in"
                  onChange={(e) => setTempOverviewText2(e.target.value)}
                />
              </div>   */}
            </div>

            <h2>Our Specialties</h2>
            <div className="our-providers-specialty-edit-total-container">
              {tempSpecialties.map((item, index) => (
                <div key={index} className="our-providers-specialty-edit-container fade-in">
                  <div className="our-providers-specialty-edit-image-name">
                    <img src={bufferToBase64(item.image.data)} alt={item.name} className="our-providers-specialty-image-preview" />
                    {item.isEditing ? (
                      <div className='our-providers-specialty-add-new-one'>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleNameChange(index, e.target.value)}
                          className="our-providers-specialty-inputs-style"
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
                          className="our-providers-specialty-popup-add-photo"
                        >
                          <AiFillCamera size="1.5rem" /> Add photo
                        </p>
                      </div>
                    ) : (
                      <p className="m-0">{item.name}</p>
                    )}
                    <button onClick={() => toggleSpecialty(index)} className="our-providers-specialty-edit-popup-remove-button">
                      {item.isAdded ? "Remove" : "Add"}
                    </button>
                    <button onClick={() => removeSpecialty(index)} className="our-providers-specialty-edit-popup-remove-button">Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="our-providers-specialty-edit-popup-button-container">
              <button onClick={addNewSpecialty} className="our-providers-specialty-edit-popup-add-new-changes-button fade-in">Add New Specialty</button>
              <button onClick={saveChanges} disabled={isSaving} className="our-providers-specialty-edit-popup-save-chnages-button fade-in">
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewActivity;
