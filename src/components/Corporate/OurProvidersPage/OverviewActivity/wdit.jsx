import React, { useState } from "react";
import "./overviewactivity.css";

// Icons
import { LuPencil } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { AiOutlineDoubleRight } from "react-icons/ai";

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

const OverviewActivity = () => {
  const originalSpecialties = [
    { name: "Dentist", icon: Dentist },
    { name: "Heart", icon: Heart },
    { name: "Care", icon: Care },
    { name: "Cancer", icon: Cancer },
    { name: "DNA", icon: DNA },
    { name: "Psychology", icon: Psychology },
    { name: "MRI", icon: MRI },
    { name: "X-Ray", icon: XRay },
  ];

  // Fake data
  const posts = [
    {
      author: "Zack Darma",
      timeAgo: "2mon",
      image: Ellipse,
      title: "Bacteria Cancer",
      description: "A detailed article about thyroid cancer\n500+ people viewed your post...",
    },
  ];

  const [overviewText1, setOverviewText1] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
  );
  
  const [overviewText2, setOverviewText2] = useState(
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker..."
  );

  const [specialties, setSpecialties] = useState(originalSpecialties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempOverviewText1, setTempOverviewText1] = useState("");
  const [tempOverviewText2, setTempOverviewText2] = useState("");
  const [tempSpecialties, setTempSpecialties] = useState([...originalSpecialties]);
  const [isSaving, setIsSaving] = useState(false);

  // Open Modal
  const openModal = () => {
    setTempOverviewText1(overviewText1);
    setTempOverviewText2(overviewText2);
    setTempSpecialties([...originalSpecialties]);
    setIsModalOpen(true);
    document.body.classList.add("scroll-lock");
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("scroll-lock");
  };

  // Delete Specialty
  const deleteSpecialty = (index) => {
    const updatedSpecialties = tempSpecialties.filter((_, i) => i !== index);
    setTempSpecialties(updatedSpecialties);
  };

  // Reset Specialties
  const resetSpecialties = () => {
    setTempSpecialties([...originalSpecialties]);
  };

  // Save Changes
  const saveChanges = () => {
    setIsSaving(true);
    const validSpecialties = tempSpecialties.every((item) => item.name.trim() !== "");
    if (!validSpecialties) {
      alert("Please fill in all specialty names before saving.");
      setIsSaving(false);
      return;
    }
    setOverviewText1(tempOverviewText1);
    setOverviewText2(tempOverviewText2);
    setSpecialties([...tempSpecialties]);
    closeModal();
    setIsSaving(false);
  };

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
        <p>{overviewText1}</p>
        <p>{overviewText2}</p>

        <h2>Our Specialties</h2>
        <div className="our-providers-our-specialties-icons-container">
          {specialties.map((item, index) => (
            <div key={index} className="our-specialties-icons-item">
              <img src={item.icon} alt={item.name} className="our-specialties-icons-image" />
              <span>{item.name}</span>
            </div>
          ))}
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
                Show all Conditions
                <FaArrowRightLong size="1rem" className="show-all-conditions-icon" />
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
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
                  onChange={(e) => setTempOverviewText1(e.target.value)}
                  placeholder="Edit the first paragraph..."
                  className="editable-textarea fade-in"
                />
              </div>

              <div className="our-providers-overview-textarea-head ">
                <textarea
                  rows="4"
                  value={tempOverviewText2}
                  onChange={(e) => setTempOverviewText2(e.target.value)}
                  placeholder="Edit the second paragraph..."
                  className="editable-textarea fade-in"
                />
              </div>
            </div>

            <h2>Our Specialties</h2>
            <div className="our-providers-specialty-edit-total-container">
            {tempSpecialties.map((item, index) => (
              <div key={index} className="our-providers-specialty-edit-container fade-in">
                <div className="our-providers-specialty-edit-image-name">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="our-providers-specialty-image-preview"
                  />
                  <p className="m-0">{item.name}</p>
                  <button
                    onClick={() => deleteSpecialty(index)}
                    className="our-providers-specialty-edit-popup-remove-button"
                  >
                    Remove
                  </button>
                </div>
                
              </div>
            ))}
            </div>

            <div className="our-providers-specialty-edit-popup-button-container">
              <button onClick={resetSpecialties} className="our-providers-specialty-edit-popup-reset-changes-button fade-in">
                Reset Specialties
              </button>

              <button
                onClick={saveChanges}
                className="our-providers-specialty-edit-popup-save-chnages-button fade-in"
              >
                {isSaving ? "Saving..." : <><AiOutlineDoubleRight /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewActivity;
