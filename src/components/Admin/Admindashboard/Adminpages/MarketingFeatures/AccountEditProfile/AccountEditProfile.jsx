import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AccountEditProfile.css";
import { RiArrowDownSLine } from "react-icons/ri";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountEditProfile = () => {
  const { id } = useParams(); // Get the account ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileTransferRequest: "Pending", // Default to 'Pending'
    profileType: "", // Default empty string
});
  const [isSaving, setIsSaving] = useState(false);

// Fetch profile data from the backend
const fetchProfile = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/account-view/${id}`,{withCredentials:true});
    const {data} = response;
    console.log(data);
    
    setFormData({
      name: data.profile.name || data.profile.corporateName,
      email: data.profile.email || data.profile.contactEmail,
      profileTransferRequest: data.profile.profileTransferRequest || "Pending", // Default value
      profileType: data.profileType || "",
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);  // Set saving state to true
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/update/${id}`,
        formData,
        { withCredentials: true }
      );

      // Show success toast with blue background
      toast.info(response.data.message, {
        position: "top-right",
        className: "toast-blue",
      });
      setIsSaving(false);  // Reset saving state after the process is done
      fetchProfile();

    } catch (error) {
      console.error("Error updating profile:", error);
      // Show error toast
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        className: "toast-blue",
      });
      setIsSaving(false);  // Reset saving state after the process is done
    }
  };
  return (
    <div className="Adim-MA-PTR-edit-profile-container">
      <h2 className="Adim-MA-PTR-edit-profile-title">Edit Account</h2>
      <form onSubmit={handleSubmit}>
      <ToastContainer />
        <div className="Adim-MA-PTR-edit-profile-form">
          {/* Form fields for name, email, password, and profile transfer request */}
          <div className="Adim-MA-PTR-form-sub-container">
            <div className="Adim-MA-PTR-form-group">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="Adim-MA-PTR-form-input"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
              <p className="Adim-MA-PTR-form-input-placeholder">
                Name<span style={{ color: "red" }}> *</span>
              </p>
            </div>
            <div className="Adim-MA-PTR-form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="Adim-MA-PTR-form-input"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
              <p className="Adim-MA-PTR-form-input-placeholder">
                Email<span style={{ color: "red" }}> *</span>
              </p>
            </div>
          </div>
          <div className="Adim-MA-PTR-form-sub-container">
            <div className="Adim-MA-PTR-form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="Adim-MA-PTR-form-input"
                value={formData.password || ""}
                onChange={handleChange}
              />
              <p className="Adim-MA-PTR-form-input-placeholder">
                Password<span style={{ color: "red" }}> *</span>
              </p>
            </div>
            <div className="Adim-MA-PTR-form-group Adim-MA-PTR-select-box-head">
              <select
                name="profileTransferRequest"
                className="Adim-MA-PTR-form-input Adim-MA-PTR-select-box-input"
                value={formData.profileTransferRequest || "Pending"}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <RiArrowDownSLine className="Adim-MA-PTR-select-box-arrow-icon" />
              <p className="Adim-MA-PTR-form-input-placeholder">
                Profile Transfer Request<span style={{ color: "red" }}> *</span>
              </p>
            </div>
          </div>
        </div>
        <div className="Adim-MA-PTR-button-group">
          <button className="Adim-MA-PTR-savebutton" type="submit" disabled={isSaving}>
            <span className="Adim-MA-PTR-savebutton-text">Update Profile</span>
            {isSaving && <div className="Adim-MA-PTR-spinner-overlay">
              <div className="Adim-MA-PTR-small-spinner"></div>
            </div>}
          </button>
          <button
            type="button"
            className="Adim-MA-PTR-Back-to-Accounts"
            onClick={() => navigate("/admin/dashboardpage/admin-manage-accounts")}
          >
            Back to Accounts
          </button>
          <button className='Adim-MA-PTR-Back-to-Transfer-Requests' onClick={()=> navigate('/admin/dashboardpage/admin-ProfileTransferRequests')}>Back to Profile Transfer Requests</button>
        </div>
      </form>
    </div>
  );
};

export default AccountEditProfile;
