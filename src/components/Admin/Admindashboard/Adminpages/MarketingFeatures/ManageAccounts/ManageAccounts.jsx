import React, { useEffect, useState } from "react";
import "./ManageAccounts.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSearchLine } from 'react-icons/ri'; // Import search icon

const ManageAccounts = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [accounts, setAccounts] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    // Fetch accounts from the backend
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/accounts`,{withCredentials:true}); // Replace with your backend URL
        const {data} = response;
        console.log("Accounts data:", data);
        setAccounts(data.accounts); // Assuming the response structure contains 'accounts'
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
};

// Filter doctors based on search query
const filteredAccounts = accounts.filter(account => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      account.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      account.email.toLowerCase().includes(lowerCaseSearchQuery)
    );
});

  const handleViewEdit = (id) => {
    navigate(`admin-AccountEditProfile/${id}`); // Navigate to edit page
  };

  return (
    <div className="ManageAccounts-admin-page-container">

      <div className="ManageAccounts-admin-page-table-control">
        <div className="doctor-head-part-title-search">
      <h2 className="ManageAccounts-admin-page-title">Admin Accounts</h2>
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
        <table className="Ma-ap-table">
          <thead className="Ma-ap-thead">
            <tr>
              <th className="Ma-ap-header">Name</th>
              <th className="Ma-ap-header">Email</th>
              <th className="Ma-ap-header">Role</th>
              <th className="Ma-ap-header">Profile Transfer Request</th>
              <th className="Ma-ap-header">Actions</th>
            </tr>
          </thead>
          <tbody className="Ma-ap-tbody">
            {filteredAccounts.map((account) => (
              <tr className="table-row" key={account._id}>
                <td className="table-cell">{account.name}</td>
                <td className="table-cell">{account.email}</td>
                <td className="table-cell">{account.role}</td>
                <td className="table-cell">{account.profileTransferRequest}</td>
                <td className="table-cell">
                  <button
                    className="Ma-ap-view-button"
                    onClick={() => handleViewEdit(account._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAccounts;
