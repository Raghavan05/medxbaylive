import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//All adminpages imported here only
import Corporatelayout from '../Corporatelayout/Corporatelayout';

import CorporateDashboardPage from '../Corporatepages/CorporateDashboardpage/CorporateDashboardPage';

import Corporateviewblogs from '../Corporatepages/Corporateviewblogs/Corporateviewblogs';
import Viewblogsdetails from '../Corporatepages/Corporateviewblogs/Viewblogsdetails';

import Admincreateblog from '../Corporatepages/Admincreateblog/Admincreateblog';
import AdmincreateblogSupplier from '../Corporatepages/Admincreateblog/Admincreateblogforsuppliers';

import AdmindoctorProfile from '../Corporatepages/AdmindoctorProfile/AdmindoctorProfile';
import Doctorprofileverification from '../Corporatepages/AdmindoctorProfile/Doctorprofileverification/Doctorprofileverification';

import Adminmanagebookings from '../Corporatepages/Adminmanagebookings/Adminmanagebookings';
import Bookingdetails from '../Corporatepages/Adminmanagebookings/Bookingdetails/Bookingdetails';

import Adminmangepayments from '../Corporatepages/Adminmanagepayments/Adminmanagepayments';
 
import Admindoctorsubscription from '../Corporatepages/Admindoctorsubscription/Admindoctorsubscription';

import Admininsurance from '../Corporatepages/Admininsurance/Admininsurance';


import Adminviewdoctor from '../Corporatepages/Adminviewdoctor/Adminviewdoctor'; 
import Editviewdoctor from '../Corporatepages/Adminviewdoctor/Editviewdoctor/Editviewdoctor';

import Adminviewpatients from '../Corporatepages/Adminviewpatients/Adminviewpatients';
import Editviewpatient from '../Corporatepages/Adminviewpatients/Editviewpatient/Editviewpatient';

import Adminappointments from '../Corporatepages/Adminappointments/Adminappointments';
import CommissionFeeUpdate from '../Corporatepages/AdminCommisionFee';


const Corporateroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Corporatelayout />}>
        <Route index  path="/" element={<Navigate to="CorporateDashboardPage" />} />
        <Route path="/CorporateDashboardPage" element={<CorporateDashboardPage />} />
        
        <Route path="/corporate-viewblog" element={<Corporateviewblogs />} />
        <Route path="/view-detailsblog/:id" element={<Viewblogsdetails />} />
      
        <Route path="/admin-createblog" element={<Admincreateblog/>} />
        <Route path="/admin-createblog-supplier" element={<AdmincreateblogSupplier/>} />

        <Route path="/admin-doctorprofile" element={<AdmindoctorProfile/>} />
        <Route path="/admin-doctorprofile/admin-doctorprofile-verification/:doctorID" element={<Doctorprofileverification/>} />
        
        <Route path="/admin-doctorsubscription" element={<Admindoctorsubscription/>} />
        <Route path="/admin-CommisionFee" element={<CommissionFeeUpdate/>} />
         
        <Route path="/admin-managebookings" element={<Adminmanagebookings/>} />
        <Route path="/admin-managebookings/admin-viewbookings/:id" element={<Bookingdetails/>} />


        <Route path="/admin-managepayments" element={<Adminmangepayments/>} />
        
        <Route path="/admin-insurance" element={<Admininsurance/>} />


        <Route path="/admin-viewdoctor" element={<Adminviewdoctor/>} />
        <Route path="/admin-viewdoctor/edit-doctor/:id" element={<Editviewdoctor/>} />

        <Route path="/admin-viewpatients" element={<Adminviewpatients/>} />
        <Route path="/admin-viewpatients/edit-viewpatients/:id" element={<Editviewpatient/>} />
        <Route path="/adminappointments" element={<Adminappointments />} />
      </Route>
    </Routes>
  );
};

export default Corporateroute;
