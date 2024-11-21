import React, { useState } from "react";
import "./overviewactivity.css";

// Icons
import { LuPencil } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

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

// Default image
import iconnotshowing from '../Assets/iconnotshowing.png';

const OverviewActivity = () => {
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

  const [overviewText1, setOverviewText1] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry...");
  const [overviewText2, setOverviewText2] = useState("It was popularised in the 1960s with the release of Letraset sheets...");
  const [specialties, setSpecialties] = useState([]); // Main view specialties (empty by default)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempOverviewText1, setTempOverviewText1] = useState(overviewText1);
  const [tempOverviewText2, setTempOverviewText2] = useState(overviewText2);
  const [tempSpecialties, setTempSpecialties] = useState([...initialSpecialties]); // Modal specialties for selection
  const [isSaving, setIsSaving] = useState(false);

  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [imageFile, setImageFile] = useState(null); // For storing uploaded image file

  // Open Modal
  const openModal = () => {
    setTempOverviewText1(overviewText1);
    setTempOverviewText2(overviewText2);
    setIsModalOpen(true);
    document.body.classList.add("scroll-lock");
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("scroll-lock");
  };

  // Add Specific Specialty
  const addSpecialty = (index) => {
    const selectedSpecialty = tempSpecialties[index];
    if (!specialties.some((item) => item.name === selectedSpecialty.name)) {
      setSpecialties([...specialties, selectedSpecialty]);
    }
  };

  // Reset Specialties
  const resetSpecialties = () => {
    setTempSpecialties([...initialSpecialties]); // Reset to initial list
    setSpecialties([]); // Clear the main specialties list
  };

  // Add New Specialty (with editable name and icon upload)
  const addNewSpecialty = () => {
    const newSpecialty = {
      name: `Enter a Name ${tempSpecialties.length + 1}`, // Name with dynamic count
      icon: imagePreview || iconnotshowing, // Default to uploaded image or placeholder icon
      isEditing: true, // Flag to indicate it's an editable input
    };
    setTempSpecialties([...tempSpecialties, newSpecialty]);
  };

  // Handle name change for new specialty
  const handleNameChange = (index, newName) => {
    const updatedSpecialties = [...tempSpecialties];
    updatedSpecialties[index].name = newName;
    setTempSpecialties(updatedSpecialties);
  };

  // Handle image upload for each specialty
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedSpecialties = [...tempSpecialties];
        updatedSpecialties[index].icon = reader.result; // Set the icon of the specific specialty
        setTempSpecialties(updatedSpecialties);
      };
      reader.readAsDataURL(file);
    }
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
    closeModal();
    setIsSaving(false);
  };

  return (
    <div className="our-providers-overview-activity-container">
      {/* Overview Section */}
      <div className="our-providers-overview">
        <div className="our-providers-overview-edit-icons-contains">
          <LuPencil className="our-providers-overview-edit-icons" onClick={openModal} />
        </div>
        <h2>Overview</h2>
        <p>{overviewText1}</p>
        <p>{overviewText2}</p>

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
        <h2>Condition Libraries</h2>
        <div className="our-providers-activity-underline"></div>
        {posts.map((post, index) => (
          <div key={index} className="our-providers-post-card">
            <p>{post.author} Posted this</p>
            <ul>
              <li>{post.timeAgo}</li>
            </ul>
            <div className="our-providers-activity-body-image-content">
              <img src={post.image} alt="post" className="post-image" />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
            <h2>
              Show all Conditions
              <FaArrowRightLong />
            </h2>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="our-providers-overview-modal-container fade-in">
          <div className="our-providers-overview-modal-content">
            <IoClose className="close-icon" onClick={closeModal} />
            <h2>Edit Overview</h2>
            <input
              type="text"
              value={tempOverviewText1}
              onChange={(e) => setTempOverviewText1(e.target.value)}
              placeholder="Edit the first paragraph..."
            />
            <input
              type="text"
              value={tempOverviewText2}
              onChange={(e) => setTempOverviewText2(e.target.value)}
              placeholder="Edit the second paragraph..."
            />
            <h2>Our Specialties</h2>
            {tempSpecialties.map((item, index) => (
              <div key={index} className="specialty-item">
                <img src={item.icon} alt={item.name} />
                {item.isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleNameChange(index, e.target.value)} // Handle name change in input
                    />
                    <div>
                      <label htmlFor={`file-upload-${index}`}>Upload Image:</label>
                      <input
                        type="file"
                        id={`file-upload-${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)} // Update the image for the specific specialty
                      />
                    </div>
                    {/* Show uploaded image preview only for the selected specialty */}
                    {item.icon !== iconnotshowing && (
                      <img src={item.icon} alt="Preview" className="image-preview" />
                    )}
                  </div>
                ) : (
                  <span>{item.name}</span>
                )}
                <button
                  onClick={() => addSpecialty(index)}
                  disabled={specialties.some((spec) => spec.name === item.name)} // Disable if already added
                >
                  {specialties.some((spec) => spec.name === item.name) ? "Already Added" : "Add this one"}
                </button>
              </div>
            ))}
            <div className="add-new-specialty-container">
              <button onClick={addNewSpecialty}>Add New Specialty</button>
              <button onClick={resetSpecialties}>Reset Specialties</button>
            </div>
            <div className="modal-buttons-container">
              <button onClick={saveChanges} disabled={isSaving}>
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
