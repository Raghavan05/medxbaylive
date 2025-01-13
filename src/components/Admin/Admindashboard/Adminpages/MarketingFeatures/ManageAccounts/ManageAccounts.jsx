import React, { useEffect, useState } from "react";
import "./ManageAccounts.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageAccounts = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [accounts, setAccounts] = useState([]);

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

  const handleViewEdit = (id) => {
    navigate(`admin-AccountEditProfile/${id}`); // Navigate to edit page
  };

  return (
    <div className="ManageAccounts-admin-page-container">
      <h2 className="ManageAccounts-admin-page-title">Admin Accounts</h2>

      <div className="ManageAccounts-admin-page-table-control">
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
            {accounts.map((account) => (
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
