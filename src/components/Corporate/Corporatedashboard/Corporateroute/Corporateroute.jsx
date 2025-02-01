import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//All adminpages imported here only
import Corporatelayout from '../Corporatelayout/Corporatelayout';
import CorporateDashboardPage from '../Corporatepages/CorporateDashboardpage/CorporateDashboardPage';
import CorporateManageAppointment from '../Corporatepages/CorporateManageAppointment/CorporateManageAppointment';
import CorporatePatient from '../Corporatepages/CorporatePatient/CorporatePatient';
import CorporateReviews from '../Corporatepages/CorporateReviews/CorporateReviews';
import Corporateviewblogs from '../Corporatepages/Corporateviewblogs/Corporateviewblogs';
import Viewblogsdetails from '../Corporatepages/Corporateviewblogs/Viewblogsdetails';

const Corporateroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Corporatelayout />}>
        <Route index  path="/" element={<Navigate to="CorporateDashboardPage" />} />
        <Route path="/CorporateDashboardPage" element={<CorporateDashboardPage />} />
        <Route path="/manage" element={<CorporateManageAppointment />} />
        <Route path="/patient" element={<CorporatePatient />} />
        <Route path="/reviews" element={<CorporateReviews />} />
        <Route path="/corporate-viewblog" element={<Corporateviewblogs />} />
        <Route path="/view-detailsblog/:id" element={<Viewblogsdetails />} />
      </Route>
    </Routes>
  );
};

export default Corporateroute;
