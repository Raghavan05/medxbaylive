import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../../../Loader/Loader";
import { RiSearchLine } from 'react-icons/ri'; // Import search icon
import './ProfileTransferRequests.css';

const ProfileTransferRequests = () => {
  const [data, setData] = useState([]); // State to hold data
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState(''); // State for role filter (Doctors, Corporates, Suppliers)

  // Fetch data from the backend using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/profile-transfer-requests`,
          {
            withCredentials: true,
          }
        );
        console.log("Profile transfer requests data:", response.data.requests);

        // Sort the profileVerification within each request and then sort requests
        const sortedData = response.data.requests
          .map((request) => ({
            ...request,
            profileVerification: request.profileVerification.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ),
          }))
          .sort((a, b) => {
            const latestA = new Date(a.profileVerification[0]?.createdAt || 0);
            const latestB = new Date(b.profileVerification[0]?.createdAt || 0);
            return latestB - latestA; // Sort requests descending by latest profileVerification
          });

        setData(sortedData); // Update state with sorted data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to convert buffer to base64
  const bufferToBase64 = (buffer) => {
    if (!buffer?.data) {
      return null;
    }
    const binary = new Uint8Array(buffer.data);
    return `data:application/pdf;base64,${btoa(
      Array.from(binary, (byte) => String.fromCharCode(byte)).join("")
    )}`;
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle role filter change
  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
  };

  // Filter accounts based on search query and role filter
  const filteredAccounts = data.filter((request) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const roleMatches = roleFilter ? request.role === roleFilter : true;
    return (
      roleMatches &&
      (request.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      request.email.toLowerCase().includes(lowerCaseSearchQuery))
    );
  });

  // Handle document view
  const handleViewDocument = (document) => {
    const pdfBase64 = bufferToBase64(document);
    if (pdfBase64) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(
          `<iframe src="${pdfBase64}" width="100%" height="100%" style="border:none;"></iframe>`
        );
      } else {
        alert("Failed to open the document in a new tab.");
      }
    } else {
      alert("Unable to display the document.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="ManageAccounts-admin-page-container">
      <div className="doctor-head-part-title-search">
        <h2 className="ManageAccounts-admin-page-title">Profile Transfer Requests</h2>
         {/* Dropdown for filtering by role */}
         <div className="PTR-sort-dropdown">
          <label htmlFor="roleFilter" className="">Filter by Role</label>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={handleRoleFilter}
            className="PTR-sort-dropdown-select"
          >
            <option value="">All</option>
            <option value="Doctor">Doctors</option>
            <option value="Corporate">Corporates</option>
            <option value="Supplier">Suppliers</option>
          </select>
        </div>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <RiSearchLine className="admin-search-bar-icon" />
        </div>
      </div>

      <div className="ManageAccounts-admin-page-table-control">
        {filteredAccounts.length > 0 ? (
          <table className="Ma-ap-table">
            <thead className="Ma-ap-thead">
              <tr>
                <th className="Ma-ap-header">Email</th>
                <th className="Ma-ap-header">Role</th>
                <th className="Ma-ap-header">Requested By</th>
                <th className="Ma-ap-header">ID Proof</th>
                <th className="Ma-ap-header">Actions</th>
              </tr>
            </thead>
            <tbody className="Ma-ap-tbody">
              {filteredAccounts.map((request) =>
                request.profileVerification.map((verification, index) => (
                  <tr className="table-row" key={`${request.id}-${index}`}>
                    <td className="table-cell">{request.email}</td>
                    <td className="table-cell">{request.role}</td>
                    <td className="table-cell">{verification.email}</td>
                    <td className="table-cell">
                      {verification.document ? (
                        <button
                          className="Ma-ap-view-button"
                          onClick={() => handleViewDocument(verification.document?.data)}
                        >
                          View
                        </button>
                      ) : (
                        <p>No ID proof available</p>
                      )}
                    </td>
                    <td className="table-cell">
                      <Link
                        to={`admin-AccountEditProfile/${request.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View This Account
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p>No profile transfer requests found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileTransferRequests;
