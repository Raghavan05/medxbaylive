import React from 'react';
import './Corporatelayout.css';
import Corporatesidebar from '../Corporatesidebar/Corporatesidebar'
import Corporateheader from '../Corporateheader/Corporateheader'
import { Outlet } from 'react-router-dom';

const Corporatelayout = () => {
  return (
    <div className="dashboard-container">
      {/* <Corporatesidebar/> */}
      <div className="main-content">
        {/* <Corporateheader/> */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Corporatelayout