import React from 'react';
import './adminlayout.css';
import Adminsidebar from '../Adminsidebar/Adminsidebar'
import Adminheader from '../Adminheader/Adminheader'
import { Outlet } from 'react-router-dom';

const Adminlayout = () => {
  return (
    <div className="admin-dashboard-container">
      <Adminsidebar/>
      <div className="admin-main-content">
        <Adminheader/>
        <div className="admin-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Adminlayout