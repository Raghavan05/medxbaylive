import React, { useState, useEffect } from 'react';
import './adminsidebar.css';
// Images for brand logo
import brandLogo from '../../Assets/brand-logo.png';

// Open and close sidebar icons
import { FaBars } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import axios from 'axios';

//sidebar item icons
import { BiSolidDashboard } from "react-icons/bi";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { RiFileTransferFill } from "react-icons/ri";

import { MdWallpaper } from "react-icons/md";
import { RiInboxLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { RiListView } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbStar } from "react-icons/tb";
import { SiCommerzbank } from "react-icons/si";
import { TbUserHexagon } from "react-icons/tb";
import { BiStreetView } from "react-icons/bi";
import { AiOutlineNotification } from "react-icons/ai";
import { RiLogoutCircleRLine } from 'react-icons/ri';

// Using Link and useLocation for active and inactive states
import { Link, useLocation } from 'react-router-dom';

const Adminsidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(localStorage.getItem('lastActiveItem') || '/admindashboardpage');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const setActiveItemBasedOnRoute = () => {
      let routeKey = location.pathname;
      switch (routeKey) {
        case '/admin/dashboardpage/admin-viewblog':
        case '/admin/dashboardpage/view-detailsblog':
          routeKey = '/admin/dashboardpage/admin-viewblog';
          break;
        case '/admin/dashboardpage/admin-viewdoctor':
        case '/admin/dashboardpage/edit-viewdoctor/:id':
          routeKey = '/admin/dashboardpage/admin-viewdoctor';
          break;
        case '/admin/dashboardpage/admin-viewpatients':
        case '/admin/dashboardpage/edit-viewpatients':
          routeKey = '/admin/dashboardpage/admin-viewpatients';
          break;
        case '/admin/dashboardpage/admin-managebookings':
        case '/admin/dashboardpage/admin-viewbookings':
          routeKey = '/admin/dashboardpage/admin-managebookings';
          break;
        case '/admin/dashboardpage/admin-doctorprofile':
        case '/admin/dashboardpage/admin-doctorprofile-verification':
          routeKey = '/admin/dashboardpage/admin-doctorprofile';
          break;
        default:
          routeKey = location.pathname;
      }
      setActiveItem(routeKey);
      localStorage.setItem('lastActiveItem', routeKey);
    };

    setActiveItemBasedOnRoute();
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    localStorage.setItem('lastActiveItem', item);
  };

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        sessionStorage.clear();
        window.location.href = 'https://medxbay.com'; // Redirect to the desired URL
        // window.location.reload();
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };


  return (
    <div className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="admin-logo-container">
        {isSidebarOpen ? (
          <>
            <img src={brandLogo} alt="Logo" className="logo" />
            <button className="toggle-button" onClick={toggleSidebar}>
              <FiX />
            </button>
          </>
        ) : (
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
        )}
      </div>
      <ul className="sidebar-menu-direct-admin">
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admindashboardpage' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admindashboardpage')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admindashboardpage')}
        >
          <Link to="/admin/dashboardpage/admindashboardpage" className="menu-link">
            <div className="sidebar-icon"><BiSolidDashboard /></div>
            <span>Dashboard Page</span>
          </Link>
        </li>

        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admincreatenewaccount' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admincreatenewaccount')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admindashboardpage')}
        >
          <Link to="/admin/dashboardpage/admincreatenewaccount" className="menu-link">
            <div className="sidebar-icon"><BiSolidUserAccount /></div>
            <span>Create New Account</span>
          </Link>
        </li>

        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-manage-accounts' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-manage-accounts')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-manage-accounts')}
        >
          <Link to="/admin/dashboardpage/admin-manage-accounts" className="menu-link">
            <div className="sidebar-icon"><MdManageAccounts/></div>
            <span>Manage Accounts</span>
          </Link>
        </li>

        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-ProfileTransferRequests' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-ProfileTransferRequests')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-ProfileTransferRequests')}
        >
          <Link to="/admin/dashboardpage/admin-ProfileTransferRequests" className="menu-link">
            <div className="sidebar-icon"><RiFileTransferFill /></div>
            <span>Profile Transfer Requests</span>
          </Link>
        </li>

        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-viewblog' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-viewblog')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-viewblog')}
        >
          <Link to="/admin/dashboardpage/admin-viewblog" className="menu-link">
            <div className="sidebar-icon"><MdWallpaper /></div>
            <span>Manage Library</span>
          </Link>
        </li>

        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-createblog' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-createblog')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-createblog')}
        >
          <Link to="/admin/dashboardpage/admin-createblog" className="menu-link">
            <div className="sidebar-icon"><RiInboxLine /></div>
            <span>Create Blog</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-createblog-supplier' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-createblog-supplier')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-createblog-supplier')}
        >
          <Link to="/admin/dashboardpage/admin-createblog-supplier" className="menu-link">
            <div className="sidebar-icon"><RiInboxLine /></div>
            <span>Create Blog for Supplier</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-doctorprofile' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-doctorprofile')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-doctorprofile')}
        >
          <Link to="/admin/dashboardpage/admin-doctorprofile" className="menu-link">
            <div className="sidebar-icon"><FaRegUserCircle /></div>
            <span>Doctor Profile</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-managebookings' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-managebookings')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-managebookings')}
        >
          <Link to="/admin/dashboardpage/admin-managebookings" className="menu-link">
            <div className="sidebar-icon"><RiListView /></div>
            <span>Manage Bookings</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-doctorsubscription' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-doctorsubscription')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-doctorsubscription')}
        >
          <Link to="/admin/dashboardpage/admin-doctorsubscription" className="menu-link">
            <div className="sidebar-icon"><TbStar/></div>
            <span>Doctor Subscription</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-managepayments' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-managepayments')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-managepayments')}
        >
          <Link to="/admin/dashboardpage/admin-managepayments" className="menu-link">
            <div className="sidebar-icon"><RiMoneyDollarCircleLine /></div>
            <span>Manage Payments</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-CommisionFee' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-CommisionFee')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-CommisionFee')}
        >
          <Link to="/admin/dashboardpage/admin-CommisionFee" className="menu-link">
            <div className="sidebar-icon"><RiMoneyDollarCircleLine /></div>
            <span>Manage Commision</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-insurance' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-insurance')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-insurance')}
        >
          <Link to="/admin/dashboardpage/admin-insurance" className="menu-link">
            <div className="sidebar-icon"><SiCommerzbank /></div>
            <span>Manage Insurance</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-viewdoctor' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-viewdoctor')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-viewdoctor')}
        >
          <Link to="/admin/dashboardpage/admin-viewdoctor" className="menu-link">
            <div className="sidebar-icon"><TbUserHexagon /></div>
            <span>View Doctors</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/admin-viewpatients' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/admin-viewpatients')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/admin-viewpatients')}
        >
          <Link to="/admin/dashboardpage/admin-viewpatients" className="menu-link">
            <div className="sidebar-icon"><BiStreetView /></div>
            <span>View Patients</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/admin/dashboardpage/adminappointments' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/admin/dashboardpage/adminappointments')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/admin/dashboardpage/adminappointments')}
        >
          <Link to="/admin/dashboardpage/adminappointments" className="menu-link">
            <div className="sidebar-icon"><AiOutlineNotification /></div>
            <span>Appointments</span>
          </Link>
        </li>
        <li 
          className={`admin-menu-item ${activeItem === '/login' ? 'active' : ''}`} 
          onMouseEnter={() => setActiveItem('/login')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/admin/dashboardpage/admindashboardpage')}
          onClick={() => handleItemClick('/login')}
        >
          <Link to="https://medxbay.com" onClick={handleLogout} className="menu-link">
            <div className="sidebar-icon"><RiLogoutCircleRLine /></div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Adminsidebar;