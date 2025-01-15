import React, { useState, useEffect, useRef } from "react";
import "./HeroAlterNavbar.css";
import logobrand from "../Assets/White-BrandLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HeroAlterNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Ref for dropdown container
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (title) => {
    setActiveDropdown((prevTitle) => (prevTitle === title ? null : title)); // Toggle active dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingDown(true); // Hide navbar when scrolling down
      } else {
        setIsScrollingDown(false); // Show navbar when scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`Real-one-heroalter-navbar ${isScrollingDown ? "hidden" : ""}`}>
      <nav className="Real-one-heroalter-navbar-nav" ref={dropdownRef}>
        {/* Logo */}
        <div className="Real-one-heroalter-navbar-brand">
          <Link to={"https://medxbay.com"}>
            <img src={logobrand} alt="Brand Logo" className="Real-one-heroalter-brand-img" />
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <button className="Real-one-heroalter-hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

       {/* Navbar Links */}
        <div className={`Real-one-heroalter-navbar-container ${isMenuOpen ? "active" : ""}`}>
          <ul className={`Real-one-heroalter-nav-links ${isMenuOpen ? "active" : ""}`}>
            {/* Find Provider Dropdown */}
            <li className="nav-item ROAdropdown">
              <Link
                className="nav-link Real-one-heroalter-nav-link-style Real-one-heroalter-dropdown-toggle"
                to="#"
                role="button"
                onClick={() => toggleDropdown("Find Provider")}
              >
                Find Provider
                <FontAwesomeIcon
                  icon={activeDropdown === "Find Provider" ? faChevronUp : faChevronDown}
                  className="ml-2"
                />
              </Link>
              <div
                className={`ROA-dropdown-menu ${
                  activeDropdown === "Find Provider" ? "show" : ""
                }`}
              >
                <Link className="ROA-dropdown-item" to="#">
                  Find Provider
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Find Corporate
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Find Supplier
                </Link>
              </div>
            </li>

            {/* Who We Serve Dropdown */}
            <li className="nav-item ROAdropdown">
              <Link
                className="nav-link Real-one-heroalter-nav-link-style Real-one-heroalter-dropdown-toggle"
                to="#"
                role="button"
                onClick={() => toggleDropdown("Who We Serve")}
              >
                Who We Serve
                <FontAwesomeIcon
                  icon={activeDropdown === "Who We Serve" ? faChevronUp : faChevronDown}
                  className="ml-2"
                />
              </Link>
              <div
                className={`ROA-dropdown-menu ${
                  activeDropdown === "Who We Serve" ? "show" : ""
                }`}
              >
                <Link className="ROA-dropdown-item" to="#">
                  Dr/Physician
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Patients
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Enterprise
                </Link>
              </div>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item ROAdropdown">
              <Link
                className="nav-link Real-one-heroalter-nav-link-style Real-one-heroalter-dropdown-toggle"
                to="#"
                role="button"
                onClick={() => toggleDropdown("Services")}
              >
                Services
                <FontAwesomeIcon
                  icon={activeDropdown === "Services" ? faChevronUp : faChevronDown}
                  className="ml-2"
                />
              </Link>
              <div
                className={`ROA-dropdown-menu ${
                  activeDropdown === "Services" ? "show" : ""
                }`}
              >
                <Link className="ROA-dropdown-item" to="#">
                  Hospitals/Clinics
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Labs
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Surgery
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Aesthetic
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  Med Store
                </Link>
              </div>
            </li>

            <li>
              <Link className="nav-link Real-one-heroalter-nav-link-style" to="#">
                Medx AI
              </Link>
            </li>
            <li>
              <Link className="nav-link Real-one-heroalter-nav-link-style" to="#">
                Condition Libraries
              </Link>
            </li>

            {/* About Dropdown */}
            <li className="nav-item ROAdropdown">
              <Link
                className="nav-link Real-one-heroalter-nav-link-style Real-one-heroalter-dropdown-toggle"
                to="#"
                role="button"
                onClick={() => toggleDropdown("About")}
              >
                About
                <FontAwesomeIcon
                  icon={activeDropdown === "About" ? faChevronUp : faChevronDown}
                  className="ml-2"
                />
              </Link>
              <div
                className={`ROA-dropdown-menu ${
                  activeDropdown === "About" ? "show" : ""
                }`}
              >
                <Link className="ROA-dropdown-item" to="#">
                  About Us
                </Link>
                <Link className="ROA-dropdown-item" to="#">
                  NewsRoom
                </Link>
              </div>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className={`auth-buttons ${isMenuOpen ? "active" : ""}`}>
          <button className="ROA-signin-button">Sign In</button>
          <button className="ROA-register-button">Register</button>
        </div>
        
      </nav>
    </div>
  );
};

export default HeroAlterNavbar;
