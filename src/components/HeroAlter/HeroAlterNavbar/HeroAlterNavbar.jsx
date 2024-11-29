import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { SlBell } from "react-icons/sl";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./HeroAlterNavbar.css";
import brand from "../Assets/White-BrandLogo.png";
import profilePlaceholder from "../Assets/Patients.png";
import SignupCard from "../../signup/signup";
import LoginCard from "../../login/login";
import Provider from "../../Navbar/Provider";
import BlogPopup from "../../patientBlog/BlogPopup";
import axios from "axios";

const HeroAlterNavbar = () => {
    const [isWhoWeDropdownOpen, setWhoWeDropdownOpen] = useState(false);
    const [isServiceDropdownOpen, setServiceDropdownOpen] = useState(false);
    const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [isSignInClicked, setIsSignInClicked] = useState(false);
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const [showBlogPopup, setShowBlogPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [profileImage, setProfileImage] = useState(profilePlaceholder);
    const [verified, setVerified] = useState(false);
    const [trialCountdown, setTrialCountdown] = useState(null);
    const [trialEndDate, setTrialEndDate] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    const toggleWhoWeDropdown = () => setWhoWeDropdownOpen(!isWhoWeDropdownOpen);
    const toggleServiceDropdown = () => setServiceDropdownOpen(!isServiceDropdownOpen);
    const toggleAboutDropdown = () => setAboutDropdownOpen(!isAboutDropdownOpen);

    const WhoWeDropdownRef = useRef(null);

    const AboutDropdownRef = useRef(null);
    //   const AboutDropdownRefMobile = useRef(null);

    const ServiceDropdownRef = useRef(null);
    //   const ServiceDropdownRefMobile = useRef(null);

    const navigate = useNavigate();

    const handleShowBlogPopup = () => setShowBlogPopup(true); // Handler to show Blog Popup
    const handleCloseBlogPopup = () => setShowBlogPopup(false); // Handler to close Blog Popup

    const [showProviderModal, setShowProviderModal] = useState(false);

    const toggleProviderModal = () => setShowProviderModal(!showProviderModal);

    const handleShowLoginPopup = () => setShowLoginPopup(true);
    const handleCloseLoginPopup = () => setShowLoginPopup(false);
    const handleShowPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

    const handleClickOutside = (event) => {
        if (WhoWeDropdownRef.current && !WhoWeDropdownRef.current.contains(event.target)) {
            setWhoWeDropdownOpen(false);
        }
        if (AboutDropdownRef.current && !AboutDropdownRef.current.contains(event.target)) {
            setAboutDropdownOpen(false);
        }
        if (ServiceDropdownRef.current && !ServiceDropdownRef.current.contains(event.target)) {
            setServiceDropdownOpen(false);

        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const bufferToBase64 = (buffer) => {
        if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
            const bytes = new Uint8Array(buffer.data);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return `data:image/jpeg;base64,${btoa(binary)}`;
        } else {
            console.error('Unexpected buffer type:', typeof buffer);
            return '';
        }
    };

    const getProfileImage = (formData) => {
        if (formData?.data?.type === "Buffer") {
            return bufferToBase64(formData.data);
        } else if (typeof formData?.data === "string") {
            return `data:image/jpeg;base64,${formData.data}`;
        } else {
            return profilePlaceholder;
        }
    };

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const role = sessionStorage.getItem("role");
                const baseUrl = process.env.REACT_APP_BASE_URL;
                let apiUrl;

                // Determine API URL based on role
                switch (role) {
                    case "doctor":
                        apiUrl = `${baseUrl}/doctor/profile/update`;
                        break;
                    case "patient":
                        apiUrl = `${baseUrl}/patient/profile`;
                        break;
                    case "corporate":
                        apiUrl = `${baseUrl}/corporate/profile`;
                        break;
                    case "supplier":
                        apiUrl = `${baseUrl}/supplier/profile`;
                        break;
                    default:
                        apiUrl = `${baseUrl}/default/profile`;
                }

                const response = await axios.get(apiUrl, { withCredentials: true });
                const userData = response.data;

                if (userData) {
                    // Handle role-specific logic
                    if (role === "doctor") {
                        setVerified(userData.doctor.verified === "Verified");

                        if (userData.doctor.profilePicture) {
                            const profileImageData = getProfileImage(userData.doctor.profilePicture);
                            setProfileImage(profileImageData);
                        } else {
                            setProfileImage(profilePlaceholder);
                        }

                        // Handle subscription logic
                        if (userData.doctor.subscriptionType === "Free") {
                            const parsedTrialEndDate = new Date(userData.doctor.trialEndDate);
                            setTrialEndDate(parsedTrialEndDate);

                            const calculateCountdown = () => {
                                const now = new Date();
                                if (parsedTrialEndDate > now) {
                                    const timeDifference = parsedTrialEndDate - now;
                                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                                    const hours = Math.floor(
                                        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                                    );
                                    const minutes = Math.floor(
                                        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                                    );
                                    const seconds = Math.floor(
                                        (timeDifference % (1000 * 60)) / 1000
                                    );
                                    setTrialCountdown({ days, hours, minutes, seconds });
                                } else {
                                    setTrialCountdown(null);
                                }
                            };

                            calculateCountdown();
                            const intervalId = setInterval(calculateCountdown, 1000);
                            return () => clearInterval(intervalId);
                        }
                    } else if (role === "patient" || role === "corporate" || role === "supplier") {
                        if (role === "patient") {
                            console.log(userData.patient);
                            const profileData = userData.patient.profilePicture;
                            if (profileData) {
                                const profileImageData = getProfileImage(userData.patient.profilePicture);
                                setProfileImage(profileImageData);
                            } else {
                                setProfileImage(profilePlaceholder);
                            }
                        } else if (role === "corporate") {
                            const profileData = userData.data[role].profilePicture.data;
                            if (profileData) {
                                const profileImageData = bufferToBase64(profileData);
                                setProfileImage(profileImageData);
                            } else {
                                setProfileImage(profilePlaceholder);
                            }
                        } else {
                            const profileData = userData[role].profilePicture.data;
                            if (profileData) {
                                const profileImageData = bufferToBase64(profileData)
                                setProfileImage(profileImageData);
                            } else {
                                setProfileImage(profilePlaceholder);
                            }
                        }
                        // console.log(userData.data[role]);

                    }
                } else {
                    setProfileImage(profilePlaceholder);
                }
            } catch (error) {
                console.error("Error fetching profile details:", error);
                setProfileImage(profilePlaceholder);
            }
        };

        fetchProfileDetails();

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem("loggedIn");
        const role = sessionStorage.getItem("role");
        if (loggedInStatus === "true") {
            setIsLoggedIn(true);
            setUserRole(role);
        }
    }, []);

    const handleLogin = (role) => {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("role", role);
        setIsLoggedIn(true);
        setUserRole(role);
    };
    const handleSignInClick = () => {
        setIsSignInClicked(true);
        setIsRegisterClicked(false);
    };

    const handleRegisterClick = () => {
        setIsRegisterClicked(true);
        setIsSignInClicked(false);
    };

    const handleCloseSignupCard = () => {
        setIsSignInClicked(false);
    };

    const handleCloseLoginCard = () => {
        setIsRegisterClicked(false);
    };

    const handleCloseLogin = () => {
        setShowLoginPopup(false);
    };

    const handleCloseRegister = () => {
        setShowPopup(false);
    };

    const handleShowLogin = () => {
        setShowLoginPopup(true);
    };

    const handleShowRegister = () => {
        setShowPopup(true);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        setUserRole("");
        setProfileImage(profilePlaceholder);
        navigate("/");
    };

    return (
        <nav className={`heroalter-navbar ${isScrollingDown ? "hidden" : ""}`}>
            <div className="heroalter-navbar-brand">
                <img src={brand} alt="Brand Logo" className="heroalter-navbar-logo" />
            </div>
            <div className="heroalter-navbar-collapse">
                <ul className="heroalter-navbar-links ml-auto">
                    {userRole !== "doctor" && (
                        <li className="heroalter-nav-item ml-md-3">
                            <Link className="heroalter-about-nav nav-link" to="/Filters">Find Provider</Link>
                        </li>
                    )}

                    {/* Who We Serve Dropdown */}
                    <li className={`heroalter-nav-item ml-md-4 ${isWhoWeDropdownOpen ? "show" : ""}`} ref={WhoWeDropdownRef}>
                        <button className="heroalter-nav-link" onClick={toggleWhoWeDropdown}>
                            Who We Serve
                            <FontAwesomeIcon icon={isWhoWeDropdownOpen ? faChevronUp : faChevronDown} />
                        </button>
                        <div className="heroalter-dropdown-menu">
                            <Link className="heroalter-dropdown-item" to="/doctor/physician">Dr/Physician</Link>
                            <Link className="heroalter-dropdown-item" to="/patients">Patients</Link>
                            <Link className="heroalter-dropdown-item" to="/enterprise">Enterprise</Link>
                        </div>
                    </li>

                    {/* Services Dropdown */}
                    <li className={`heroalter-nav-item ml-md-4 ${isServiceDropdownOpen ? "show" : ""}`} ref={ServiceDropdownRef}>
                        <button className="heroalter-nav-link" onClick={toggleServiceDropdown}>
                            Services
                            <FontAwesomeIcon icon={isServiceDropdownOpen ? faChevronUp : faChevronDown} />
                        </button>
                        <div className="heroalter-dropdown-menu">
                            <Link className="heroalter-dropdown-item" to="#" onClick={() => setShowBlogPopup(true)}>Hospitals/Clinics</Link>
                            <Link className="heroalter-dropdown-item" to="#" onClick={() => setShowBlogPopup(true)}>Labs</Link>
                            <Link className="heroalter-dropdown-item" to="#" onClick={() => setShowBlogPopup(true)}>Surgery</Link>
                            <Link className="heroalter-dropdown-item" to="#" onClick={() => setShowBlogPopup(true)}>Aesthetic</Link>
                            <Link className="heroalter-dropdown-item" to="#" onClick={() => setShowBlogPopup(true)}>Med Store</Link>
                        </div>
                    </li>

                    <li className="heroalter-nav-item ml-md-3">
                        <Link className="heroalter-about-nav nav-link" to="https://www.medxbay.org/medxai/" target="_blank">Medx AI</Link>
                    </li>

                    <li className="heroalter-nav-item ml-md-3">
                        <Link className="heroalter-about-nav nav-link" to="https://conditions.medxbay.com/">Condition Libraries</Link>
                    </li>

                    {/* About Dropdown */}
                    <li className={`heroalter-nav-item ml-md-4 ${isAboutDropdownOpen ? "show" : ""}`}>
                        <button className="heroalter-nav-link " onClick={toggleAboutDropdown}>
                            About
                            <FontAwesomeIcon icon={isAboutDropdownOpen ? faChevronUp : faChevronDown} />
                        </button>
                        {isAboutDropdownOpen && (
                            <div className="heroalter-dropdown-menu">
                                <Link className="heroalter-dropdown-item" to="/about/section">About us</Link>
                                <Link className="heroalter-dropdown-item" to="/Spotlights">NewsRoom</Link>
                            </div>
                        )}
                    </li>
                </ul>

                {/* User Authentication */}
                {!isLoggedIn ? (
                    <ul className="heroalter-navbar-nav ml-auto">
                        {/* Sign In Button */}
                        <li className="heroalter-nav-item ml-md-3">
                            <button
                                type="button"
                                className="heroalter-nav-signin-button"
                                onClick={handleShowLoginPopup}
                            >
                                Sign In
                            </button>
                        </li>

                        {/* Register Button */}
                        <li className="heroalter-nav-item ml-md-3">
                            <button
                                type="button"
                                className="heroalter-nav-register-button"
                                onClick={handleShowPopup}
                            >
                                Register
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="heroalter-navbar-nav ml-auto mr-md-2">
                        {/* Dashboard Link */}
                        {userRole === "doctor" && (
                            <li className="heroalter-nav-item active ml-md-3">
                                <Link
                                    className="heroalter-nav-link heroalter-nav-link-style"
                                    to={
                                        userRole === "patient"
                                            ? "/profile/userprofile/edit/profile"
                                            : userRole === "doctor"
                                                ? "/doctorprofile/dashboardpage/"
                                                : userRole === "corporate"
                                                    ? "/corporate/dashboardpage/"
                                                    : userRole === "suppliers"
                                                        ? "/OurProducts"
                                                        : "/"
                                    }
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {/* Upgrade Link for Doctors */}
                        {userRole === "doctor" && verified && (
                            <li className="heroalter-nav-item active ml-md-3">
                                <Link className="heroalter-nav-link heroalter-nav-link-style" to="/SubscriptionPlans">
                                    Upgrade
                                </Link>
                            </li>
                        )}

                        {/* Free Trial Countdown */}
                        {trialCountdown && (
                            <li className="heroalter-nav-item active ml-md-3">
                                <div className="heroalter-trial-count-head">
                                    <p className="heroalter-free-trial-doctor">Free Trial period</p>
                                    <div className="heroalter-trial-countdown">
                                        {trialCountdown.days}d: {trialCountdown.hours}h: {trialCountdown.minutes}m: {trialCountdown.seconds}s
                                    </div>
                                </div>
                            </li>
                        )}

                        <div className="d-flex flex-row ">
                            {/* Profile Link */}
                            {isLoggedIn && (
                                <li className="heroalter-nav-item active ml-md-3">
                                    <div className="heroalter-profile-container">
                                        <Link
                                            to={
                                                userRole === "patient"
                                                    ? "/profile/userprofile/edit/profile"
                                                    : userRole === "doctor"
                                                        ? "/doc-profile"
                                                        : userRole === "corporate"
                                                            ? "/OurProviders"
                                                            : userRole === "suppliers"
                                                                ? "/OurProducts"
                                                                : "/"
                                            }
                                        >
                                            <div className="heroalter-image-container">
                                                <img src={profileImage} alt="Profile" />
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            )}

                            {/* Notifications */}
                            {isLoggedIn && (
                                <li className="heroalter-nav-item ml-md-3">
                                    <Link
                                        to={
                                            userRole === "patient"
                                                ? "/profile/userprofile/edit/profile/notification"
                                                : userRole === "doctor"
                                                    ? "/doc-profile/notification"
                                                    : userRole === "corporate"
                                                        ? "/OurProviders/notification"
                                                        : userRole === "suppliers"
                                                            ? "/OurProducts/notification"
                                                            : "/"
                                        }
                                    >
                                        <div className="heroalter-dashboard-setting-bell">
                                            <button type="button" className="heroalter-nav-notification-button">
                                                <SlBell className="heroalter-notification-icon" />
                                            </button>
                                        </div>
                                    </Link>
                                </li>
                            )}
                        </div>

                        {/* Logout Button */}
                        <li className="heroalter-nav-item ml-md-3">
                            <div className="heroalter-logout-container-button">
                                <button className="heroalter-logout-button" onClick={handleLogout}>
                                    <RiLogoutCircleRLine size="1.1rem" />
                                </button>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
            <SignupCard
                show={showPopup}
                handleClose={handleClosePopup}
                openLoginModal={handleShowLogin}
            />
            <LoginCard
                show={showLoginPopup}
                handleClose={handleCloseLoginPopup}
                openRegisterModal={handleShowRegister}
                handleLogin={handleLogin}
            />
            <Provider
                show={showProviderModal}
                handleClose={() => setShowProviderModal(false)}
            />
            <BlogPopup show={showBlogPopup} handleClose={handleCloseBlogPopup} />{" "}
            {/* Add BlogPopup component */}
        </nav>
    );
};

export default HeroAlterNavbar;
