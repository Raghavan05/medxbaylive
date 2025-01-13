import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from '../../../../../Loader/Loader';

const ProfileTransferRequests = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to hold data
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/profile-transfer-requests`
            , { withCredentials: true }
        );
        setData(response.data.requests); // Update state with fetched data
        console.log(response.data.requests);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle navigation to edit profile
  const handleViewEdit = (id) => {
    navigate(`admin-AccountEditProfile/${id}`);
  };

  if (loading) {
    return <Loader/>;
  }



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

  return (
    <div className="ManageAccounts-admin-page-container">
      <h2 className="ManageAccounts-admin-page-title">Profile Transfer Requests</h2>
      <div className="ManageAccounts-admin-page-table-control">
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
            {data.map((item) => (
              <tr className="table-row" key={item.id}>
                <td className="table-cell">{item.email}</td>
                <td className="table-cell">{item.role}</td>
                <td className="table-cell">{item.profileTransferRequest}</td>
                <td className="table-cell">
                {item.profileVerification?.[0]?.document ? (
                    <button
                      className="Ma-ap-view-button"
                      onClick={() => {
                        const pdfBase64 = bufferToBase64(
                          item.profileVerification[0].document?.data
                        );
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
                      }}
                    >
                      View
                    </button>
                  ) : (
                    "No Document"
                  )}
                </td>
                <td className="table-cell">
                  <Link
                    className="view-account-link"
                    to={`admin-AccountEditProfile/${item._id}`}
                  >
                    View This Account
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileTransferRequests;
