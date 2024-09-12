import React, { useState } from "react";
import "./SubscriptionPlans.css";
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import tee from '../../assests/tee.svg'
import 'react-toastify/dist/ReactToastify.css';
const SubscriptionPlans = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const monthlyPlans = [
    {
      name: "Free",
      price: "$0",
      features: {
        "Basic Profile": true,
        "Premium Profile": false,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": false,
        "Patients can book appointment": false,
        "Chat with patients with our integrated messaging app": false,
        "Access to email customer support": false,
        "1 free article in our condition library": false,
      },
    },
    {
      name: "Standard",
      price: "$765",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": "3% service charge",
        "Access to Knowledge base": false,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "1 free article in our condition library": true,
      },
    },
    {
      name: "Premium",
      price: "$1,020",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": false,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "1 free article in our condition library": "When paid yearly",
      },
    },
    {
      name: "Enterprise",
      price: "Contact Support",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "1 free article in our condition library": true,
      },
    },
  ];

  const yearlyPlans = [
    {
      name: "Free",
      price: "$0",
      features: {
        "Basic Profile": true,
        "Premium Profile": false,
        "Accept Telehealth calls": false,
        "Access to Knowledge base": false,
        "Patients can book appointment": false,
        "Chat with patients with our integrated messaging app": false,
        "Access to email customer support": false,
        "1 free article in our condition library": false,
      },
    },
    {
      name: "Standard",
      price: "$7,500",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": "3% service charge",
        "Access to Knowledge base": false,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "1 free article in our condition library": true,
      },
    },
    {
      name: "Premium",
      price: "$9,600",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": false,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "1 free article in our condition library": "When paid yearly",
      },
    },
    {
      name: "Enterprise",
      price: "Contact Support",
      features: {
        "Basic Profile": false,
        "Premium Profile": true,
        "Accept Telehealth calls": true,
        "Access to Knowledge base": true,
        "Patients can book appointment": true,
        "Chat with patients with our integrated messaging app": true,
        "Access to email customer support": true,
        "1 free article in our condition library": true,
      },
    },
  ];

  const handleMonthlyClick = () => setSelectedPeriod("Monthly");
  const handleYearlyClick = () => setSelectedPeriod("Yearly");
  const handlePlanClick = (planName) => setSelectedPlan(planName);

  const features = [
    {
      title: "Basic Profile",
      subtitle: "Name, photo, specialty, conditions, location, URL",
    },
    {
      title: "Premium Profile",
      subtitle:
        "Everything in basic profile, Hospitals/Facilities you work in, Languages, Awards, FAQs, Ratings, Insurance you take, About Me",
    },
    {
      title: "Accept Telehealth calls",
    },
    {
      title: "Access to Knowledge base",
    },
    {
      title: "Patients can book appointment",
    },
    {
      title: "Chat with patients with our integrated messaging app",
    },
    {
      title: "Access to email customer support",
    },
    {
      title: "1 free article in our condition library",
    },
  ];

  const currentPlans = selectedPeriod === "Monthly" ? monthlyPlans : yearlyPlans;

  const handleSubscribe = async () => {
    if (!selectedPlan) {
       toast.info("Please select a subscription plan");
      return;
    }
  
    const selectedPlanDetails = currentPlans.find((plan) => plan.name === selectedPlan);
  
    if (selectedPlan === "Enterprise") {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/doctor/subscribe`;
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/subscribe`,
        {
          subscriptionType: selectedPlan,
          subscriptionDuration: selectedPeriod,
          paymentDetails: {
            amount: parseInt(
              selectedPlanDetails.price.replace("$", "").replace(",", ""),
              10
            ) * 100,
          },
        },
        { withCredentials: true }
      );
  
      window.location.href = response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
         toast.info(error.response.data); 
      } else {
        console.error("Subscription error:", error);
         toast.info("Failed to initiate subscription. Please try again.");
      }
    }
  };
  

  return (
    <div className="subscription-background">
    <div className="subscription-plans">
      <h2 className="title">Choose the best plan for you</h2>
      {/* <p className="subtitle">Choose the best plan for you</p> */}
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${selectedPeriod === "Monthly" ? "selected" : ""}`}
          onClick={handleMonthlyClick}
        >
          Monthly
        </button>
        <button
          className={`toggle-btn ${selectedPeriod === "Yearly" ? "selected" : ""}`}
          onClick={handleYearlyClick}
        >
          Yearly
        </button>
      </div>
      <div className="discount-banner">15% off for annual subscriptions</div>
      <p className="enterprise-notice">For individual users, Enterprise requires 10 or more users</p>
      <div className="plans-wrapper">
        <table className="plans-table">
          <thead>
            <tr>
              <th className="features-column">
                <div className="feature-space">
                  <div className="feature-title"><b>Features</b></div>
                  <div className="special-note">Get started to watch <br /> premium doctor’s profile</div>
                </div>
              </th>
              {currentPlans.map((plan, index) => (
                <th
                  key={index}
                  className={`plan-header ${selectedPlan === plan.name ? "plan-column-selected" : ""}`}
                  onClick={() => handlePlanClick(plan.name)}
                  aria-selected={selectedPlan === plan.name}
                >
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">{plan.price}</div>
                  {plan.name === "Enterprise" ? (
                    <button
                      className={`add-contact-btn ${selectedPlan === plan.name ? "active" : ""}`}
                      // onClick={handleSubscribe}
                    >
                      Contact Sales
                    </button>
                  ) : (
                    <button
                      className={`add-contact-btn ${selectedPlan === plan.name ? "active" : ""}`}
                      onClick={handleSubscribe}
                    >
                      Subscribe
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-color">
            {features.map((feature, index) => (
              <tr key={index}>
                <td
                  className={`feature-titles ${
                    feature.title === "1 free article in our condition library"
                      ? "feature-1-free-article"
                      : ""
                  }`}
                >
                  <div className="feature-titlee">{feature.title}</div>
                  {feature.subtitle && (
                    <div className="feature-subtitle">{feature.subtitle}</div>
                  )}
                </td>
                {currentPlans.map((plan, planIndex) => (
                  <td
                    key={planIndex}
                    className={`plan-feature ${
                      selectedPlan === plan.name ? "plan-column-selected" : ""
                    } ${
                      feature.title === "1 free article in our condition library"
                        ? "feature-1-free-article"
                        : ""
                    }`}
                  >
                    {plan.features[feature.title] === true && (
                        <img src={tee} alt="Team of Doctors" style={{ width: '30px' ,height:"30px",marginBottom:"20px",marginTop:"20px"}} />
                      )}
                    {plan.features[feature.title] === false ? "" : (typeof plan.features[feature.title] === "string" && plan.features[feature.title])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default SubscriptionPlans;
