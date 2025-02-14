import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import DynamicMeta from './components/DynamicMeta/DynamicMeta';
import { Helmet } from 'react-helmet-async';

// Define a component to manage meta tags dynamically
const MetaManager = () => {
    const location = useLocation();
    const [metaData, setMetaData] = useState(null);
      const { slug } = useParams();
      const bufferToBase64 = (buffer) => {
        if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
          const bytes = new Uint8Array(buffer.data);
          let binary = '';
          bytes.forEach(byte => binary += String.fromCharCode(byte));
          return `data:image/jpeg;base64,${btoa(binary)}`;
        }
        return '';
      };
    useEffect(() => {
        const fetchData = async () => {
            let data = null;
  
            if (location.pathname.startsWith("/doc-profile") || location.pathname.startsWith("/book-appointment")) {
                const url = slug
                ? `${process.env.REACT_APP_BASE_URL}/doctors/${slug}/slots` // New route with corporateId
                :   `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`; // Existing route
        
                const response = await axios.get(
                    url,
                    { withCredentials: true }
                  );
                  const doctorData = response.data;
                  const data = doctorData.doctor;
                setMetaData({
                    title: data?.name || "MedxBay",
                    description: data?.aboutMe || "MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care.",
                    image: bufferToBase64(data?.profilePicture?.data) || "/preview.jpg"
                });
            } else if (location.pathname.startsWith("/OurProviders") || location.pathname.startsWith("/OurProviders/:slug")) {
                const url = slug
                ? `${process.env.REACT_APP_BASE_URL}/patient/corporate/${slug}` // New route with corporateId
                : `${process.env.REACT_APP_BASE_URL}/corporate/profile`; // Existing route
        
              const response = await axios.get(url, { withCredentials: true });
              const data = response.data?.data; // Ensure data exists
              // // Log response for debugging
                setMetaData({
                    title: data?.corporateName || "MedxBay",
                    description: data?.overview || "MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care.",
                    image: bufferToBase64(data?.profilePicture?.data) || "/preview.jpg"
                });
            } else if (location.pathname.startsWith("/OurProducts") || location.pathname.startsWith("/OurProducts/:slug")) {
                const url = slug
                ? `${process.env.REACT_APP_BASE_URL}/supplier/supplier/${slug}` // New route with slug
                : `${process.env.REACT_APP_BASE_URL}/supplier/profile`; // Existing route
        
                const response = await axios.get(url, { withCredentials: true });
                const { supplier} = response.data;
                setMetaData({
                    title: supplier?.name || "MedxBay",
                    description: supplier?.overview || "MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care.",
                    image: bufferToBase64(supplier?.profilePicture?.data) || "/preview.jpg"
                });
            } else {
                setMetaData(null);  // Default case
            }
        };
  
        fetchData();
    }, [location]);
  
    return metaData ? (
        <DynamicMeta title={metaData.title} description={metaData.description} image={metaData.image} />
    ) : (
        <Helmet>
            <title>MedxBay</title>
            <meta name="description" content="MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care." />
        </Helmet>
    );
  };

  export default MetaManager;