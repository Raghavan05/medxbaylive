import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FAQProviderProfile.css";
import { useParams } from "react-router-dom";

import faqImage from '../../Assets/faqImage.jpg'
import { fetchFromDoctor } from "../../../actions/api";

const FAQProviderProfile = ({doctor}) => {
    // const [doctor, setDoctor] = useState(null); // Use null to differentiate between loading and empty data
  const [activeFAQ, setActiveFAQ] = useState(null); // Track the index of the active FAQ
  const [error, setError] = useState(null); // Handle error states
  const { slug } = useParams();

  // useEffect(() => {
  //   const fetchDoctorDetails = async () => {
  //     try {
  //       const url = slug
  //         ? `/doctors/${slug}/slots`
  //         : `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`;

  //       const response = slug
  //         ? await fetchFromDoctor(url)
  //         : await axios.get(url, { withCredentials: true });

  //       const doctorData = slug ? response.doctor : response.data.doctor;

  //       if (doctorData.dateOfBirth) {
  //         const date = new Date(doctorData.dateOfBirth);
  //         doctorData.dateOfBirth = `${String(date.getDate()).padStart(2, "0")}-${String(
  //           date.getMonth() + 1
  //         ).padStart(2, "0")}-${date.getFullYear()}`;
  //       }

  //       setDoctor(doctorData);
  //     } catch (error) {
  //       console.error("Error fetching doctor details:", error);
  //       setError("Failed to fetch doctor details. Please try again.");
  //     }
  //   };

  //   fetchDoctorDetails();
  // }, [slug]);

  const handleFAQClick = (index) => {
    // Toggle the active FAQ or close the currently active FAQ
    setActiveFAQ(activeFAQ === index ? null : index);
  };
  
  return (
    <section className="PP-FAQ-section">
    <h2>Frequently Asked Questions</h2>
    <div className="PP-FAQ-container">
      {error ? (
        <div className="PP-FAQ-error-message">{error}</div>
      ) : doctor ? (
        <>
          <div className="PP-FAQ-image-container">
            <img
              loading="lazy"
              src={faqImage}
              alt="FAQ illustration"
              className="PP-FAQ-image"
            />
          </div>
          <div className="PP-FAQ-content">
            {doctor?.faqs && doctor?.faqs.length > 0 ? (
              <div className="PP-FAQ-list">
                {doctor?.faqs.map((item, index) => (
                  <div className="PP-FAQ-item" key={item._id}>
                    <div
                      className="PP-FAQ-question"
                      aria-expanded={activeFAQ === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      {item.question} ?
                      <span
                        className="PP-FAQ-icon"
                        onClick={() => handleFAQClick(index)}
                        style={{ cursor: "pointer", paddingLeft: "10px" }}
                      >
                        {activeFAQ === index ? "-" : "+"}
                      </span>
                    </div>
                    {activeFAQ === index && (
                      <div
                        id={`faq-answer-${index}`}
                        className="PP-FAQ-answer"
                      >
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No FAQs available for this doctor.</p>
            )}
          </div>
        </>
      ) : (
        <div className="PP-FAQ-loading-message">Loading Frequently Asked Questions...</div>
      )}
    </div>
  </section>
  )
}

export default FAQProviderProfile