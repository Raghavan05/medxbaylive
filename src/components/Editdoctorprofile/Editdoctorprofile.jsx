import React, { useState, useRef, useEffect } from 'react';
import './editdoctorprofile.css';
import { TbSquareArrowLeft } from "react-icons/tb";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assests/doctorprofile.png';
import currencyCodes from 'currency-codes';
import { TiPlus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import axios from 'axios';  // Import axios for API requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationPicker from './LocationPicker'; // Assuming you have a LocationPicker component
import iso6391 from "iso-639-1";
const Editdoctorprofile = () => {
  const [doctorData, setDoctorData] = useState({
    name: "",
    title: "",
    aboutMe: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    country: "",
    state: "",
    cities: "",
    availability: "",
    consultation: "",
    speciality: [],
    conditions: [],
    languages: [],
    treatmentApproach: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    phoneNumber: "",
    doctorFee: "",
    termsAndConditionsAccepted: false,
    showAwards: false,
    showFaq: false,
    showArticle: false,
    showInsurances: false,
    zip: "",
    hospitals: [
      { name: "", street: "", city: "", state: "", country: "", zip: "", lat: "", lng: "" },
    ],
    insurances: [],
    awards: [],
    profilePicture: null,
    documents: {
      licenseProof: { data: null, contentType: "" },
      certificationProof: { data: null, contentType: "" },
      businessProof: { data: null, contentType: "" },
    },
    faqs: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" }
    ],

  });
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [allInsurances, setAllInsurances] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [allTreatmentApproach, setAllTreatmentApproach] = useState();
  const [allConditions, setAllConditions] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [isOpenFaq, setIsOpenFaq] = useState(false);
  const [isOpenShowDetails, setIsOpenShowDetails] = useState(false);
  const [isOpenPersonal, setIsOpenPersonal] = useState(true);
  const [isOpenDoctor, setIsOpenDoctor] = useState(false);
  const [isOpenFees, setIsOpenFees] = useState(false);
  const [isOpenHospital, setIsOpenHospital] = useState([false]);
  const [isOpenDocumentProof, setIsDocumentProof] = useState(false);
  const [isOpenOthers, setIsOpenOthers] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [newAwards, setNewAwards] = useState('');
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [modalShow, setModalShow] = useState({ show: false, index: null });
  const [isSaving, setIsSaving] = useState(false);
  const togglePersonalSection = () => setIsOpenPersonal(!isOpenPersonal);
  const toggleDoctorSection = () => setIsOpenDoctor(!isOpenDoctor);
  const toggleFeesSection = () => setIsOpenFees(!isOpenFees);
  const toggleFaqSection = () => setIsOpenFaq(!isOpenFaq);
  const toggleShowDetails = () => setIsOpenShowDetails(!isOpenShowDetails);
  const [openIndex, setOpenIndex] = useState(null);
  const toggleHospitalSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleDocumentProofSection = () => setIsDocumentProof(!isOpenDocumentProof);
  const toggleOthersSection = () => setIsOpenOthers(!isOpenOthers);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDoctorData({ ...doctorData, [id]: value });
  };
  const handleToggleChange = (key) => {
    setDoctorData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let base64String;
      if (fileType === "profilePicture") {
        base64String = reader.result.split(',')[1]; // Extract base64 for image
      } else {
        // Convert binary ArrayBuffer to Base64 for PDFs
        const binaryString = Array.from(new Uint8Array(reader.result))
          .map(byte => String.fromCharCode(byte))
          .join('');
        base64String = btoa(binaryString);
      }
      setDoctorData((prevData) => ({
        ...prevData,
        documents: {
          ...prevData.documents,
          [fileType]: {
            data: base64String,
            contentType: file.type,
          },
        },
      }));

      toast.info(`${fileType.replace("Proof", "")} selected for upload.`);
    };
    // Validate and read the file
    if (fileType === "profilePicture") {
      if (!file.type.startsWith("image/")) {
        toast.info("Please upload a valid image file.");
        return;
      }
      reader.readAsDataURL(file);  // Read image as Data URL
    } else if (["licenseProof", "certificationProof", "businessProof"].includes(fileType)) {
      if (file.type !== "application/pdf") {
        toast.info(`Please upload a valid PDF file for ${fileType.replace("Proof", "")}.`);
        return;
      }
      reader.readAsArrayBuffer(file);  // Read PDF as ArrayBuffer
    }
  };
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/profile/update`, {
          withCredentials: true
        });
        const { doctor, insurances, allInsurances, allSpecialties, allConditions } = response.data;
        setDoctorData(doctor);
        const profileImageData = doctor.profilePicture
          ? `data:image/jpeg;base64,${doctor.profilePicture.data}`
          : profileImage;
        setProfilePicturePreview(profileImageData);
        setAllInsurances(allInsurances);
        setAllSpecialties(allSpecialties);
        // setAllTreatmentApproach(allSpecialties);
        setAllConditions(allConditions);
        setInsurances(insurances);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };
    fetchDoctorData();
  }, []);
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the file to a base64 string
        const base64String = btoa(
          new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        // Update doctorData with base64 profile picture
        setDoctorData((prevData) => ({
          ...prevData,
          profilePicture: {
            data: base64String,
            contentType: file.type,
          },
        }));
        // Set preview
        setProfilePicturePreview(URL.createObjectURL(file));
      };
      reader.readAsArrayBuffer(file); // Use ArrayBuffer for correct base64 conversion
    }
  };
  const handleProfilePicDelete = () => {
    setDoctorData((prevData) => ({
      ...prevData,
      profilePicture: null
    }));
    setProfilePicturePreview(null);
  };
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    if (selectedDate > today) {
      setError('Date of birth cannot be in the future');
    } else {
      setError('');
      setDob(e.target.value);
      setDoctorData({ ...doctorData, dateOfBirth: e.target.value });
    }
  };
  // Add treatment from the dropdown
  const handleTreatmentChange = (event) => {
    const selectedTreatment = event.target.value;
    const currentApproach = doctorData?.treatmentApproach || ""; // Default to an empty string
    const treatmentsArray = currentApproach.split(",").map((t) => t.trim());

    if (!treatmentsArray.includes(selectedTreatment)) {
      setDoctorData({
        ...doctorData,
        treatmentApproach: [...treatmentsArray, selectedTreatment].filter(Boolean).join(", "),
      });
    }

    // Reset the dropdown value
    event.target.value = "";
  };

  // Remove treatment tag
  const handleTreatmentRemove = (treatmentToRemove) => {
    const currentApproach = doctorData?.treatmentApproach || "";
    const updatedApproach = currentApproach
      .split(",")
      .map((t) => t.trim())
      .filter((treatment) => treatment !== treatmentToRemove)
      .join(", ");

    setDoctorData({
      ...doctorData,
      treatmentApproach: updatedApproach,
    });
  };

  const handleSpecialitiesChange = (event) => {
    const selectedSpeciality = event.target.value;
    if (!doctorData.speciality.includes(selectedSpeciality)) {
      setDoctorData({
        ...doctorData,
        speciality: [...doctorData.speciality, selectedSpeciality]  // Add the speciality name
      });
    }
  };
  // Function to remove a selected speciality
  const handleSpecialitiesRemove = (specialityToRemove) => {
    setDoctorData({
      ...doctorData,
      speciality: doctorData.speciality.filter(speciality => speciality !== specialityToRemove)
    });
  };
  //conditions
  const handleConditionChange = (event) => {
    const selectedCondition = event.target.value;  // Get selected condition name
    // Ensure the condition is not already in the state
    if (selectedCondition && !doctorData.conditions.includes(selectedCondition)) {
      setDoctorData({
        ...doctorData,
        conditions: [...doctorData.conditions, selectedCondition]  // Add the condition name
      });
    }
  };
  const handleConditionRemove = (conditionToRemove) => {
    setDoctorData({
      ...doctorData,
      conditions: doctorData.conditions.filter(condition => condition !== conditionToRemove)
    });
  };
  //languages
  // Generate language options from iso-639-1
  const languages = iso6391.getAllNames();

  const handleLanguageAdd = (event) => {
    const selectedLanguage = event.target.value;  // Get selected condition name
    if (selectedLanguage && !doctorData.languages.includes(selectedLanguage)) {
      setDoctorData({ ...doctorData, languages: [...doctorData.languages, selectedLanguage] });
      setNewLanguage("");
    }
  };

  const handleLanguageRemove = (language) => {
    setDoctorData({
      ...doctorData,
      languages: doctorData.languages.filter((l) => l !== language),
    });
  };
  //Insurance
  const handleRemoveInsurance = (index) => {
    const updatedInsurances = doctorData.insurances.filter((_, i) => i !== index);
    setDoctorData({ ...doctorData, insurances: updatedInsurances });
  };

  const handleInsuranceChange = (event) => {
    const selectedInsuranceId = event.target.value;

    // Prevent adding duplicates
    if (!doctorData.insurances.includes(selectedInsuranceId)) {
      setDoctorData((prevState) => ({
        ...prevState,
        insurances: [...prevState.insurances, selectedInsuranceId],
      }));
    }
  };

  //Awards
  const handleAwardsKeyDown = (e) => {
    if (e.key === 'Enter' && newAwards && !doctorData.awards.includes(newAwards)) {
      setDoctorData({ ...doctorData, awards: [...doctorData.awards, newAwards] });
      setNewAwards('');
    }
  };
  const handleAwardsRemove = (awards) => {
    setDoctorData({ ...doctorData, awards: doctorData.awards.filter((c) => c !== awards) });
  };
  //end
  const currencyOptions = currencyCodes.data.map((currency) => ({
    code: currency.code,
    currency: currency.currency
  }));//
  const handleHospitalInputChange = (index, field, value) => {
    const updatedHospitals = doctorData.hospitals.map((hospital, i) =>
      i === index ? { ...hospital, [field]: value } : hospital
    );
    setDoctorData({ ...doctorData, hospitals: updatedHospitals }); // Ensure key is 'hospitals'
  };
  const addNewHospital = () => {
    setDoctorData({
      ...doctorData,
      hospitals: [...doctorData.hospitals, { name: '', address: '', city: '', state: '', country: '', zip: '', lat: '', lng: '' }],
    });
    setIsOpenHospital([...isOpenHospital, true]); // Open the newly added hospital section
  };
  const handleRemoveHospital = (index) => {
    setDoctorData(prevData => {
      const updatedHospitals = prevData.hospitals.filter((_, i) => i !== index);
      return { ...prevData, hospitals: updatedHospitals };
    });
    setIsOpenHospital(prevState => prevState.filter((_, i) => i !== index));
  };

  // File input refs
  const profilePicInputRef = useRef(null);
  const certificationProofInputRef = useRef(null);
  const businessProofInputRef = useRef(null);
  const licenseProofInputRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setDoctorData((prevData) => ({
      ...prevData,
      termsAndConditionsAccepted: e.target.checked, // Update termsAndConditionsAccepted
    }));
  };
  const handleLocationSelect = (lat, lng) => {
    setDoctorData((prevData) => ({
      ...prevData,
      hospitals: prevData.hospitals.map((hospital, i) =>
        i === modalShow.index ? { ...hospital, lat, lng } : hospital
      ),
    }));
    // setModalShow({ show: false, index: null });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);  // Set saving state to true
    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      setError('Date of birth cannot be in the future');
      return;
    }
    if (error) {
      toast.info('Please fix the errors before submitting');
      return;
    }
    const formPayload = { ...doctorData };
    const transformedDocuments = {};
    for (const key in formPayload.documents) {
      const doc = formPayload.documents[key];
      if (doc && doc.data) {
        transformedDocuments[key] = {
          data: doc.data,
          contentType: doc.contentType,
        };
      }
    }
    formPayload.documents = transformedDocuments;
    // Proceed with API submission
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
        formPayload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        toast.info('Profile updated successfully');
        setIsSaving(false);  // Reset saving state after the process is done
        // navigate('/doc-profile');
        window.scrollTo(0, 0);
      }
    } catch (error) {
      setIsSaving(false);  // Reset saving state on error
      toast.error('Failed to update profile. Please try again.');
    }
  };

  //Faq
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleFocus = (e, field, index) => {
    // Clear placeholder text on focus
    if (e.target.innerText === (field === 'question' ? 'Enter your question' : 'Enter your answer')) {
      e.target.innerText = '';
    }
  };

  const handleBlur = (e, field, index) => {
    const newFaqasking = [...doctorData.faqs];
    const value = e.target.innerText.trim();

    if (value === '') {
      newFaqasking[index][field] = '';
      e.target.innerText = field === 'question' ? 'Enter your question' : 'Enter your answer';
    } else {
      newFaqasking[index][field] = value;
    }

    setDoctorData({ ...doctorData, faqs: newFaqasking });
  };
  const countries = {
    "USA": {
      "Alabama": ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"],
      "Alaska": ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan"],
      "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
      "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"],
      "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose"],
      "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
      "Connecticut": ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"],
      "Delaware": ["Wilmington", "Dover", "Newark", "Middletown", "Bear"],
      "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
      "Georgia": ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah"],
      "Hawaii": ["Honolulu", "Hilo", "Kailua", "Pearl City", "Kapolei"],
      "Idaho": ["Boise", "Nampa", "Meridian", "Idaho Falls", "Pocatello"],
      "Illinois": ["Chicago", "Springfield", "Peoria", "Naperville", "Aurora"],
      "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
      "Iowa": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
      "Kansas": ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe"],
      "Kentucky": ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
      "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
      "Maine": ["Portland", "Lewiston", "Bangor", "Augusta", "Auburn"],
      "Maryland": ["Baltimore", "Columbia", "Silver Spring", "Rockville", "Germantown"],
      "Massachusetts": ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
      "Michigan": ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Flint"],
      "Minnesota": ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"],
      "Mississippi": ["Jackson", "Gulfport", "Biloxi", "Hattiesburg", "Meridian"],
      "Missouri": ["St. Louis", "Kansas City", "Springfield", "Columbia", "Independence"],
      "Montana": ["Billings", "Missoula", "Bozeman", "Helena", "Great Falls"],
      "Nebraska": ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
      "Nevada": ["Las Vegas", "Reno", "Henderson", "North Las Vegas", "Sparks"],
      "New Hampshire": ["Manchester", "Nashua", "Concord", "Derry", "Keene"],
      "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison"],
      "New Mexico": ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho", "Roswell"],
      "New York": ["New York City", "Buffalo", "Albany", "Syracuse", "Rochester"],
      "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
      "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
      "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
      "Oklahoma": ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond"],
      "Oregon": ["Portland", "Salem", "Eugene", "Gresham", "Beaverton"],
      "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Harrisburg"],
      "Rhode Island": ["Providence", "Cranston", "Warwick", "Pawtucket", "East Providence"],
      "South Carolina": ["Columbia", "Charleston", "Greenville", "Spartanburg", "Myrtle Beach"],
      "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Mitchell"],
      "Tennessee": ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
      "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
      "Utah": ["Salt Lake City", "Provo", "West Valley City", "Sandy", "Orem"],
      "Vermont": ["Burlington", "Montpelier", "Rutland", "Essex Junction", "Barre"],
      "Virginia": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News"],
      "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
      "West Virginia": ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
      "Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Appleton"],
      "Wyoming": ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"]
    },
    "UAE": {
      "Dubai": ["Dubai City", "Jumeirah", "Deira", "Bur Dubai", "Dubai Marina"],
      "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Western Region", "Saadiyat Island"],
      "Sharjah": ["Sharjah City", "Al Majaz", "Al Qasba", "Al Nahda"],
      "Ajman": ["Ajman City", "Al Nuaimiya", "Al Mowaihat"],
      "Fujairah": ["Fujairah City", "Al Badiyah", "Dibba"],
      "Ras Al Khaimah": ["Ras Al Khaimah City", "Al Dhait", "Al Nakheel"]
    },
    "India": {
      "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
      "Arunachal Pradesh": ["Itanagar", "Tawang", "Naharlagun", "Ziro", "Aalo"],
      "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
      "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
      "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Durg", "Korba"],
      "Goa": ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
      "Haryana": ["Chandigarh", "Faridabad", "Gurugram", "Ambala", "Hisar"],
      "Himachal Pradesh": ["Shimla", "Manali", "Kullu", "Dharamshala", "Solan"],
      "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
      "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
      "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Palakkad"],
      "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
      "Manipur": ["Imphal", "Thoubal", "Churachandpur", "Kakching", "Bishnupur"],
      "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar"],
      "Mizoram": ["Aizawl", "Kolasib", "Lunglei", "Champhai", "Serchhip"],
      "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Mon"],
      "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
      "Punjab": ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
      "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
      "Sikkim": ["Gangtok", "Mangan", "Rangpo", "Namchi", "Jorethang"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
      "Telangana": ["Hyderabad", "Warangal", "Khammam", "Karimnagar", "Nizamabad"],
      "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Ambassa", "Kailashahar"],
      "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
      "Uttarakhand": ["Dehradun", "Nainital", "Haridwar", "Rishikesh", "Haldwani"],
      "West Bengal": ["Kolkata", "Siliguri", "Howrah", "Durgapur", "Asansol"],
      "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Mayabunder", "Car Nicobar", "Havelock"],
      "Chandigarh": ["Chandigarh", "Mullanpur", "Manimajra", "Daria", "Palsora"],
      "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Vapi", "Moti Daman"],
      "Lakshadweep": ["Kavaratti", "Minicoy", "Andrott", "Amini", "Kalapeni"],
      "Delhi": ["New Delhi", "Old Delhi", "Dwarka", "Vasant Kunj", "Karol Bagh"],
      "Puducherry": ["Puducherry", "Auroville", "Karaikal", "Mahe", "Yanam"],
      "Ladakh": ["Leh", "Kargil", "Nubra", "Zanskar", "Drass"],
      "Lakshadweep": ["Kavaratti", "Minicoy", "Andrott", "Amini", "Kalapeni"],
    },
    "Africa": {
      "Nigeria": ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City", "Enugu", "Kaduna", "Zaria", "Maiduguri"],
      "South Africa": ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "Polokwane", "Pietermaritzburg", "Nelspruit", "East London"],
      "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kakamega", "Kitale", "Meru"],
      "Egypt": ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh", "Luxor", "Aswan", "Port Said", "Suez", "Tanta", "Mansoura"],
      "Morocco": ["Casablanca", "Marrakech", "Rabat", "Fes", "Tangier", "Agadir", "Meknes", "Tétouan", "Oujda", "Essaouira"],
      "Ghana": ["Accra", "Kumasi", "Takoradi", "Tamale", "Koforidua", "Sekondi", "Ashaiman", "Cape Coast", "Techiman", "Ho"],
      "Ethiopia": ["Addis Ababa", "Gondar", "Dire Dawa", "Mekelle", "Hawassa", "Adama", "Bahir Dar", "Jijiga", "Debre Markos", "Hossana"],
      "Uganda": ["Kampala", "Entebbe", "Mbarara", "Jinja", "Masaka", "Mbale", "Lira", "Fort Portal", "Kabale", "Arua"],
      "Algeria": ["Algiers", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif", "Béjaïa", "Tizi Ouzou", "Chlef"],
      "Morocco": ["Casablanca", "Marrakech", "Rabat", "Fes", "Tangier", "Agadir", "Meknes", "Tétouan", "Oujda", "Essaouira"],
      "Sudan": ["Khartoum", "Omdurman", "Port Sudan", "Kassala", "Nyala", "Juba", "El Obeid", "Kadugli", "Wad Madani", "Dongola"],
      "Mozambique": ["Maputo", "Beira", "Nampula", "Chimoio", "Quelimane", "Tete", "Nacala", "Pemba", "Xai-Xai", "Lichinga"],
      "Angola": ["Luanda", "Huambo", "Lobito", "Benguela", "Kuito", "Malanje", "Cabinda", "Uige", "Cuito Cuanavale", "Sumbe"],
      "Democratic Republic of the Congo": ["Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kananga", "Kisangani", "Bukavu", "Goma", "Kolwezi", "Matadi", "Kikwit"],
      "Tanzania": ["Dar es Salaam", "Dodoma", "Arusha", "Mbeya", "Mwanza", "Morogoro", "Tanga", "Zanzibar", "Shinyanga", "Mtwara"],
      "Senegal": ["Dakar", "Touba", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Rufisque", "Tambacounda", "Mbour", "Diourbel"],
      "Madagascar": ["Antananarivo", "Toamasina", "Antsirabe", "Fianarantsoa", "Mahajanga", "Toliara", "Diego Suarez", "Antsiranana", "Nosy Be", "Mahanoro"],
      "Côte d'Ivoire": ["Abidjan", "Yamoussoukro", "Bouaké", "San Pedro", "Daloa", "Korhogo", "Man", "San Pédro", "Tiebissou", "Odienné"],
      "Zimbabwe": ["Harare", "Bulawayo", "Mutare", "Gweru", "Kwekwe", "Marondera", "Chinhoyi", "Masvingo", "Zvishavane", "Chegutu"],
      "Zambia": ["Lusaka", "Kitwe", "Ndola", "Kabwe", "Livingstone", "Mufulira", "Chingola", "Chililabombwe", "Luanshya", "Solwezi"],
      "Liberia": ["Monrovia", "Gbarnga", "Buchanan", "Harper", "Paynesville", "Kakata", "Bomi", "Bopolu", "Voinjama", "Sanniquellie"],
      "Somalia": ["Mogadishu", "Hargeisa", "Kismayo", "Baidoa", "Galkayo", "Merca", "Burao", "Bosaso", "Jowhar", "Kismayo"],
      "Botswana": ["Gaborone", "Francistown", "Molepolole", "Maun", "Selibe Phikwe", "Serowe", "Palapye", "Jwaneng", "Orapa", "Kasane"],
      "Namibia": ["Windhoek", "Swakopmund", "Walvis Bay", "Rundu", "Rehoboth", "Okahandja", "Tsumeb", "Ondangwa", "Keetmanshoop", "Grootfontein"],
      "Gabon": ["Libreville", "Port-Gentil", "Franceville", "Moanda", "Oyem", "Bitam", "Koulamoutou", "Tchibanga", "Mouila", "Lambaréné"],
      "Mali": ["Bamako", "Ségou", "Koutiala", "San", "Mopti", "Tombouctou", "Kayes", "Gao", "Kadiolo", "Koulikoro"]
    }
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Handle Country Change
  const handleCountryChange = (event) => {
    const country = event.target.value;

    // Update doctorData with the selected country
    setDoctorData({ ...doctorData, country, state: "", city: "" });

    // Update local states
    setSelectedCountry(country);
    setSelectedState("");
    setCities([]);

    // Populate states based on the selected country
    if (country) {
      setStates(Object.keys(countries[country]));
    } else {
      setStates([]);
    }
  };

  // Handle State Change
  const handleStateChange = (event) => {
    const state = event.target.value;

    // Update doctorData with the selected state
    setDoctorData({ ...doctorData, state, city: "" });

    // Update local state
    setSelectedState(state);

    // Populate cities based on the selected state
    if (state) {
      setCities(countries[selectedCountry][state]);
    } else {
      setCities([]);
    }
  };

  // Handle City Change
  const handleCityChange = (event) => {
    const city = event.target.value;

    // Update doctorData with the selected city
    setDoctorData({ ...doctorData, city });
  };

  return (
    <>
      <div className='edit-your-profile-container'>
        <ToastContainer />
        <div className="edit-doctor-our-profile-header">
          <TbSquareArrowLeft className="back-arrow" onClick={() => window.history.back()} />
          <span className='title-head-to-title'>Edit your Profile</span>
        </div>

        <div className='edit-your-profile-support-to-support-conatiner' onSubmit={handleSubmit}>
          <div className="profile-picture-section">
            <p className='profile-picture-title'>Profile picture</p>
            <div className='profile-picture-flex-direction'>
              {profilePicturePreview ? (
                <img
                  src={profilePicturePreview}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                <img src={profileImage} alt="Profile" className="profile-picture" />
              )}
              <p className='profile-text'>This will be displayed on your profile</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
                id="upload-new"
                style={{ display: 'none' }}
                ref={profilePicInputRef}
              />
              <div className='profile-picture-all-buttons'>
                <button className="upload-btn" onClick={() => profilePicInputRef.current.click()}>Upload new</button>
                <button className="delete-btn" onClick={handleProfilePicDelete}>Delete</button>
              </div>
            </div>
          </div>

          <div className='edit-doctor-scroll-conatiner'>
            <div className='edit-your-profile-all-input-details-header'>
              {/* Personal Details Section */}
              <div className={`edit-your-profile-details-section ${isOpenPersonal ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header" onClick={togglePersonalSection}>
                  <h3>Personal details</h3>
                  <span>{isOpenPersonal ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
                </div>
                {isOpenPersonal && (
                  <div className="edit-your-profile-section-content">
                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='Enter your full name' value={doctorData.name} onChange={handleInputChange} />
                      </div>
                      <div className="edop-form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" placeholder='Eg., Vascular Surgery' value={doctorData.title} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="edop-form-row">
                      <div className="edop-form-group edop-full-width">
                        <label htmlFor="about">About</label>
                        <textarea id="aboutMe" placeholder='Describe yourself...' value={doctorData.aboutMe} onChange={handleInputChange}></textarea>
                      </div>
                    </div>
                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          placeholder='mm-dd-yyyy'
                          value={doctorData && doctorData.dateOfBirth ? doctorData.dateOfBirth.split('T')[0] : ''}
                          onChange={handleDateChange}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                      </div>



                      <div className="edop-form-group edop-select-box-header">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" value={doctorData.gender} onChange={handleInputChange} className='edop-select-box-input'>
                          <option >Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                      </div>
                    </div>

                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder='Enter your email' value={doctorData.email} onChange={handleInputChange} />
                      </div>

                      <div className="edop-form-group">
                        <label htmlFor="phoneNumber">Mobile number</label>
                        <input type="tel" id="phoneNumber" placeholder='Enter mobile number' value={doctorData.phoneNumber} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor="country">Country</label>
                        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                          <option value="">{doctorData.country || "Select Country"}</option>
                          {Object.keys(countries).map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="edop-form-group">
                        <label htmlFor="state">State/Province</label>
                        <select
                          id="state"
                          value={selectedState}
                          onChange={handleStateChange}
                          disabled={!states?.length}
                        >
                          <option value="">{doctorData.state || "Select State"}</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="edop-form-row">
                      <div className="edop-form-group">
                        <label htmlFor="city">City</label>
                        <select
                          id="city"
                          value={doctorData.city}
                          onChange={handleCityChange}
                          disabled={!cities?.length}
                        >
                          <option value="">{doctorData.city || "Select City"}</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="edop-form-group">
                        <label htmlFor="zip">Zip code</label>
                        <input
                          type="text"
                          id="zip"
                          placeholder="Enter your zipcode"
                          value={doctorData.zip || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Doctor Details Section */}
              <div className={`edit-your-profile-details-section ${isOpenDoctor ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header" onClick={toggleDoctorSection}>
                  <h3>Doctor details</h3>
                  <span>{isOpenDoctor ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
                </div>
                {isOpenDoctor && (
                  <div className="edit-your-profile-section-content">
                    {/* Specialties Section */}
                    <div className="edop-form-row">
                      <div className="edop-form-group edop-full-width">
                        <label>Specialities</label>
                        <div className="tag-container">
                          {/* Display selected specialties as tags */}
                          {[...doctorData.speciality].sort().map((speciality, index) => (
                            <span key={index} className="tag-edit-doctor">
                              {speciality}
                              <button onClick={() => handleSpecialitiesRemove(speciality)}>x</button>
                            </span>
                          ))}

                          {/* Dropdown for adding new specialities */}
                          <select
                            value=""
                            onChange={handleSpecialitiesChange}
                            className="edit-doctor-profile-dropdown"
                          >
                            <option value="" disabled>Select Speciality</option>
                            {[...allSpecialties]
                              .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                              .map((specialityObj, index) => (
                                <option key={index} value={specialityObj.name}>
                                  {specialityObj.name} {/* Display the name, not the object */}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Conditions Section */}
                    <div className="edop-form-row">
                      <div className="edop-form-group edop-full-width">
                        <label>Conditions</label>
                        <div className="tag-container">
                          {[...doctorData.conditions].sort().map((condition, index) => (
                            <span key={index} className="tag-edit-doctor">
                              {condition}
                              <button onClick={() => handleConditionRemove(condition)}>x</button>
                            </span>
                          ))}

                          <select
                            value=""
                            onChange={handleConditionChange}
                            className="edit-doctor-profile-dropdown"
                          >
                            <option value="" disabled>Select Condition</option>
                            {[...allConditions]
                              .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                              .map((conditionObj, index) => (
                                <option key={index} value={conditionObj.name}>
                                  {conditionObj.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>


                    {/* Languages Section */}
                    <div className="edop-form-row">
                      <div className="edop-form-group edop-full-width">
                        <label>Languages</label>
                        <div className="tag-container">
                          {/* Display Selected Languages */}
                          {doctorData.languages.map((language, index) => (
                            <span key={index} className="tag-edit-doctor">
                              {language}{" "}
                              <button onClick={() => handleLanguageRemove(language)}>x</button>
                            </span>
                          ))}

                          {/* Dropdown for Languages */}
                          <select
                            value={newLanguage}
                            onChange={handleLanguageAdd}

                          >
                            <option value="">Select a language</option>
                            {languages.map((lang, index) => (
                              <option key={index} value={lang}>
                                {lang}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* TreatmentApproach */}
                    <div className="edop-form-row">
                      <div className="edop-form-group edop-full-width">
                        <label>Treatment Approach</label>
                        <div className="tag-container">
                          {/* Display selected treatmentApproach as tags
                          <span className="tag-edit-doctor">
                            {doctorData?.treatmentApproach &&
                              doctorData.treatmentApproach.split(",").map((treatment, index) => (
                                <span key={index} className="treatment-tag">
                                  {treatment}
                                  <button onClick={() => handleTreatmentRemove(treatment)}>x</button>
                                </span>
                              ))}
                          </span> */}
                          {/* Dropdown for adding new treatmentApproach */}
                          <select
                            id="treatmentApproach"
                            value={doctorData.treatmentApproach || ''}
                            onChange={handleInputChange}
                            className='edop-select-box-input'
                          >
                            <option value="" disabled>
                              Select Treatment Approach
                            </option>
                            {["Conventional", "Holistic", "Traditional", "Speciality"].map((approach) => (
                              <option
                                value={approach}
                              >
                                {approach}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>


                    {/* Availability and Consultation Section */}
                    <div className="edop-form-row">

                      <div className="edop-form-group edop-select-box-header">
                        <label htmlFor="availability">Availability</label>
                        <select
                          id="availability"
                          value={doctorData.availability || ''} // Ensure the value is either 'available', 'unavailable', or an empty string
                          onChange={handleInputChange}
                          className='edop-select-box-input'
                        >
                          <option value="">Select availability</option>
                          <option value="available">Available</option>
                          <option value="unavailable">Unavailable</option>
                        </select>
                        <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                      </div>


                      <div className="edop-form-group edop-select-box-header">
                        <label htmlFor="consultation">Consultation</label>
                        <select
                          id="consultation"
                          value={doctorData.consultation || ''} // Ensure value matches one of the options or is empty
                          onChange={handleInputChange}
                          className='edop-select-box-input'
                        >
                          <option value="">Select consultation</option>
                          <option value="Video call">Online</option>
                          <option value="In-person">In Person</option>
                          <option value="Both">Both</option>
                        </select>
                        <RiArrowDownSLine className="edop-select-box-arrow-icon" />
                      </div>

                    </div>
                  </div>
                )}
              </div>
              {/* Hospital Section */}
              {doctorData?.hospitals?.length === 0 && (
                addNewHospital()
              )}

              {doctorData?.hospitals.map((hospital, index) => (
                <div key={index} className={`edit-your-profile-details-section ${openIndex === index ? 'open' : 'closed'}`}>
                  <div className="edit-your-profile-section-header" onClick={() => toggleHospitalSection(index)}>
                    <h3>Hospital details {index + 1}</h3>
                    <div className='edit-another-hospital-container'>
                      {doctorData?.hospitals?.length < 5 && (

                        <div className='edit-another-hospital-container-icon-text'>
                          <div className='edit-another-hospital-container'>
                            <TiPlus />
                            <span className='edit-another-hospital-container-text' onClick={addNewHospital}>
                              Add another hospital
                            </span>

                          </div>

                        </div>
                      )}
                      <span>
                        {openIndex === index ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
                      </span>
                    </div>
                  </div>
                  {openIndex === index && (
                    <div className="hospital-content">
                      <div className="edop-form-row">
                        <div className="edop-form-group">
                          <label htmlFor={`hospitalName-${index}`}>Hospital Name</label>
                          <input
                            type="text"
                            id={`hospitalName-${index}`}
                            placeholder='Enter Hospital name'
                            value={hospital.name}
                            onChange={(e) => handleHospitalInputChange(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="edop-form-group">
                          <label htmlFor={`address-${index}`}>Address</label>
                          <input
                            type="text"
                            id={`address-${index}`}
                            placeholder='Enter Hospital full address'
                            value={hospital.street}
                            onChange={(e) => handleHospitalInputChange(index, 'street', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="edop-form-row">
                        <div className="edop-form-group">
                          <label htmlFor={`city-${index}`}>City</label>
                          <input
                            type="text"
                            id={`city-${index}`}
                            placeholder='Enter city'
                            value={hospital.city}
                            onChange={(e) => handleHospitalInputChange(index, 'city', e.target.value)}
                          />
                        </div>
                        <div className="edop-form-group">
                          <label htmlFor={`state-${index}`}>State</label>
                          <input
                            type="text"
                            id={`state-${index}`}
                            placeholder='Enter state'
                            value={hospital.state}
                            onChange={(e) => handleHospitalInputChange(index, 'state', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="edop-form-row">
                        <div className="edop-form-group">
                          <label htmlFor={`country-${index}`}>Country</label>
                          <input
                            type="text"
                            id={`country-${index}`}
                            placeholder='Enter country'
                            value={hospital.country}
                            onChange={(e) => handleHospitalInputChange(index, 'country', e.target.value)}
                          />
                        </div>
                        <div className="edop-form-group">
                          <label htmlFor={`pinCode-${index}`}>Zip Code</label>
                          <input
                            type="text"
                            id={`pinCode-${index}`}
                            placeholder='Enter pinCode'
                            value={hospital.zip}
                            onChange={(e) => handleHospitalInputChange(index, 'zip', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="edit-doctor-Update-container edit-doctor-location-button">
                        <button className="edit-doctor-Update-btn" onClick={() => setModalShow({ show: true, index })}>
                          Pin your location
                        </button>
                        {doctorData.hospitals?.length > 1 && (
                          <button className="edit-doctor-Remove-btn" onClick={() => handleRemoveHospital(index)}>
                            <MdDelete />Remove
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}



              {/* Document verification Details Section */}
              <div className={`edit-your-profile-details-section ${isOpenDocumentProof ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header" onClick={toggleDocumentProofSection}>
                  <h3>Document verification details</h3>
                  <span>
                    {isOpenDocumentProof ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
                  </span>
                </div>

                {isOpenDocumentProof && (
                  <div>
                    <div className="edop-form-row">
                      {/* Certification Proof */}
                      <div className='edop-form-group'>
                        <label>Certification Proof</label>
                        <div className="edit-doctor-profile-doc-Proof-file">
                          {doctorData && doctorData.documents && doctorData.documents.certificationProof && (
                            <p className="edit-doctor-profile-doc-Proof-file-name">
                              {typeof doctorData.documents.certificationProof === 'object'
                                ? doctorData.documents.certificationProof.name || 'File Uploaded'
                                : doctorData.documents.certificationProof}
                            </p>
                          )}


                          <input
                            type="file"
                            id="certificationProof"
                            ref={certificationProofInputRef}
                            className="edit-doctor-profile-doc-Proof-input"
                            onChange={(e) => handleFileChange(e, "certificationProof")}
                          />
                          <p className="edit-doctor-profile-doc-Proof-file-name"></p>
                          <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => certificationProofInputRef.current.click()}>
                            <span>Choose File</span>
                          </div>
                        </div>
                      </div>

                      {/* Business Proof */}
                      <div className='edop-form-group'>
                        <label>Business Proof</label>
                        <div className="edit-doctor-profile-doc-Proof-file">
                          {doctorData && doctorData.documents && doctorData.documents.businessProof && (
                            <p className="edit-doctor-profile-doc-Proof-file-name">
                              {typeof doctorData.documents.businessProof === 'object'
                                ? doctorData.documents.businessProof.name || 'File Uploaded'
                                : doctorData.documents.businessProof}
                            </p>
                          )}


                          <input
                            type="file"
                            id="businessProof"
                            ref={businessProofInputRef}
                            className="edit-doctor-profile-doc-Proof-input"
                            onChange={(e) => handleFileChange(e, "businessProof")}
                          />
                          <p className="edit-doctor-profile-doc-Proof-file-name"></p>
                          <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => businessProofInputRef.current.click()}>
                            <span>Choose File</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* License Proof */}
                    <div className="edop-form-group edop-form-padding-or-magin">
                      <label>License Proof</label>
                      <div className="edit-doctor-profile-doc-Proof-file">
                        {doctorData && doctorData.documents && doctorData.documents.licenseProof && (
                          <p className="edit-doctor-profile-doc-Proof-file-name">
                            {typeof doctorData.documents.licenseProof === 'object'
                              ? doctorData.documents.licenseProof.name || 'File Uploaded'
                              : doctorData.documents.licenseProof}
                          </p>
                        )}


                        <input
                          type="file"
                          id="licenseProof"
                          ref={licenseProofInputRef}
                          className="edit-doctor-profile-doc-Proof-input"
                          onChange={(e) => handleFileChange(e, "licenseProof")}
                        />
                        <p className="edit-doctor-profile-doc-Proof-file-name">  </p>
                        <div className="edit-doctor-profile-doc-Proof-choose-file" onClick={() => licenseProofInputRef.current.click()}>
                          <span>Choose File</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fees details Section */}
              <div className={`edit-your-profile-details-section ${isOpenFees ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header" onClick={toggleFeesSection}>
                  <h3>Fees details</h3>
                  <span>{isOpenFees ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}</span>
                </div>
                {isOpenFees && (
                  <div className="edit-doctor-fees-details-conatiner">
                    <span>Enter your fees for online consultation</span>
                    <div className="fees-input-container">
                      <div className=''>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="currency-dropdown"
                        >
                          {currencyOptions?.map((option) => (
                            <option key={option.code} value={option.code}>
                              {option.code} ({option.currency})
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="number"
                        value={doctorData.doctorFee}
                        onChange={(e) => setDoctorData(prevData => ({ ...prevData, doctorFee: e.target.value }))}
                        className="fees-input"
                        placeholder="Enter fee amount"
                      />
                      <span>Please note that {doctorData.adminCommissionFee}% charge will be incurred for each call so we recommend adding that on top of your normal fee.</span>
                    </div>
                  </div>

                )}
              </div>

              {/* Others Details Section */}
              <div className={`edit-your-profile-details-section ${isOpenOthers ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header" onClick={toggleOthersSection}>
                  <h3>Others details</h3>
                  <span>
                    {isOpenOthers ? <RiArrowUpSLine className='toggle-arrow' /> : <RiArrowDownSLine className='toggle-arrow' />}
                  </span>
                </div>

                {isOpenOthers && (
                  <div className="edit-your-profile-section-content">
                    <div className="edop-form-row">
                      <div className="edop-form-group edop-full-width">
                        <label>Insurance</label>
                        <div className="tag-container">
                          {/* Display selected insurances as tags */}
                          {doctorData.insurances?.map((insurance, index) => (
                            <span key={index} className="tag-edit-doctor">
                              {/* Find and display insurance name */}
                              {allInsurances.find(ins => ins._id === insurance)?.name}
                              <button onClick={() => handleRemoveInsurance(index)}>x</button>
                            </span>
                          ))}

                          {/* Dropdown for adding new insurance */}
                          <select
                            value=""
                            onChange={handleInsuranceChange}
                            className="edit-doctor-profile-dropdown"
                          >
                            <option value="" disabled>Select Insurance</option>
                            {allInsurances.map((insurance) => (
                              <option key={insurance._id} value={insurance._id}>
                                {insurance.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <ToggleButton
                          label="Show Insurances"
                          isChecked={doctorData.showInsurances}
                          onChange={() => handleToggleChange("showInsurances")}
                        />
                        <p className='edop-toggle-note'>
                          *If you turn this ON, these details will be visible on the Doctor Profile.
                        </p>
                      </div>
                    </div>

                    <div className="edop-form-row">
                      <div className="edop-form-group edop-full-width">
                        <label>Awards</label>
                        <div className="tag-container">
                          {doctorData?.awards.map((award, index) => (
                            <span key={index} className="tag-edit-doctor">
                              {award} <button onClick={() => handleAwardsRemove(award)}>x</button>
                            </span>
                          ))}
                          <input
                            type="text"
                            placeholder="Add Awards"
                            value={newAwards}
                            onChange={(e) => setNewAwards(e.target.value)}
                            onKeyDown={handleAwardsKeyDown}
                          />
                        </div>
                        <ToggleButton
                          label="Show Awards"
                          isChecked={doctorData.showAwards}
                          onChange={() => handleToggleChange("showAwards")}
                        />
                        <p className='edop-toggle-note'>
                          *If you turn this ON, these details will be visible on the Doctor Profile.
                        </p>
                      </div>
                    </div>

                    {/* Optional FAQ section */}
                    {/* 
                      <div className="edop-form-row">
                        <div className="edop-form-group edop-full-width">
                          <label>FAQ’s</label>
                          <div className="tag-container">
                            {doctorData.faq.map((faqs, index) => (
                              <span key={index} className="tag-edit-doctor">
                                {faqs} <button onClick={() => handleFaqRemove(faqs)}>x</button>
                              </span>
                            ))}
                            <input
                              type="text"
                              placeholder="Add FAQ’s"
                              value={newFaq}
                              onChange={(e) => setNewFaq(e.target.value)}
                              onKeyDown={handleFaqKeyDown}
                            />
                          </div>
                        </div>
                      </div>
                  */}
                  </div>
                )}
              </div>

              {/* FAQ  Details Section */}
              <div className={`edit-your-profile-details-section ${isOpenFaq ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header" onClick={toggleFaqSection}>
                  <h3>FAQ's details</h3>
                  <span>
                    {isOpenFaq ? <RiArrowUpSLine className="toggle-arrow" /> : <RiArrowDownSLine className="toggle-arrow" />}
                  </span>
                </div>

                {isOpenFaq && (
                  <div className="edop-qustion-container">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="edop-qustion-item">
                        <div
                          className={`accordion-question ${activeIndex === index ? 'active' : ''}`}
                          onClick={() => toggleAccordion(index)}
                        >
                          <div className="edop-count-text-conatiner">
                            <span className="edop-count-question">{index + 1}</span>
                            <div
                              className={`editable-text ${!doctorData.faqs[index]?.question ? 'placeholder' : ''}`}
                              contentEditable
                              suppressContentEditableWarning
                              onFocus={(e) => handleFocus(e, 'question', index)}
                              onBlur={(e) => handleBlur(e, 'question', index)}
                            >
                              {doctorData.faqs[index]?.question || 'Enter your question'}
                            </div>
                          </div>
                          <span className="plus-icon-less-icon">{activeIndex === index ? '-' : '+'}</span>
                        </div>

                        {activeIndex === index && (
                          <div className="accordion-answer">
                            <div
                              className={`editable-text ${!doctorData.faqs[index]?.answer ? 'placeholder' : ''}`}
                              contentEditable
                              suppressContentEditableWarning
                              onFocus={(e) => handleFocus(e, 'answer', index)}
                              onBlur={(e) => handleBlur(e, 'answer', index)}
                            >
                              {doctorData.faqs[index]?.answer || 'Enter your answer'}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <ToggleButton
                      label="Show FAQ"
                      isChecked={doctorData.showFaq}
                      onChange={() => handleToggleChange("showFaq")}
                    />
                    <p className='edop-toggle-note'>
                      *If you turn this ON, these details will be visible on the Doctor Profile.
                    </p>
                  </div>

                )}
              </div>
              <div className={`edit-your-profile-details-section ${isOpenShowDetails ? 'open' : 'closed'}`}>
                <div className="edit-your-profile-section-header" onClick={toggleShowDetails}>
                  <h3>Doctor Profile details</h3>
                  <span>
                    {isOpenShowDetails ? <RiArrowUpSLine className="toggle-arrow" /> : <RiArrowDownSLine className="toggle-arrow" />}
                  </span>
                </div>

                {isOpenShowDetails && (
                  <div className="edop-qustion-container">
                    <div className="edop-profile-settings">
                      <h3>Profile Settings</h3>
                      {/* <ToggleButton
                            label="Show Awards"
                            isChecked={doctorData.showAwards}
                            onChange={() => handleToggleChange("showAwards")}
                          /> */}
                      {/* <ToggleButton
                            label="Show FAQ"
                            isChecked={doctorData.showFaq}
                            onChange={() => handleToggleChange("showFaq")}
                          /> */}
                      <ToggleButton
                        label="Show Article"
                        isChecked={doctorData.showArticle}
                        onChange={() => handleToggleChange("showArticle")}
                      />
                      <p className='edop-toggle-note'>
                        *If you turn this ON, these details will be visible on the Doctor Profile.
                      </p>
                      {/* <ToggleButton
                            label="Show Insurances"
                            isChecked={doctorData.showInsurances}
                            onChange={() => handleToggleChange("showInsurances")}
                          /> */}
                    </div>
                  </div>
                )}
              </div>

              {/* check box and Update button Details Section */}
              <div>
                <div className='checkbox-container-edit-profile'>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={doctorData.termsAndConditionsAccepted} // Reflect current state
                    onChange={handleCheckboxChange} // Handle state update
                  />
                  <span htmlFor="terms">I agree to the{" "}<a href="https://medxbay.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></span>
                </div>
                <small>Please read and accept our Terms and Conditions before submitting.</small>
                <div className={`edit-doctor-Update-container`} >
                  <button className="edit-doctor-Update-btn mt-3" type="submit" onClick={handleSubmit} disabled={isSaving || !doctorData.termsAndConditionsAccepted}>
                    <span className="edit-doctor-Update-btn-text">Update Profile</span>
                    {isSaving && <div className="spinner-overlay">
                      <div className="small-spinner"></div>
                    </div>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LocationPicker
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        dragging={true}
        zoomControl={true}
        show={modalShow.show}
        handleClose={() => setModalShow({ show: false, index: null })}
        handleLocationSelect={handleLocationSelect}
      />
    </>
  );
};

const ToggleButton = ({ label, isChecked, onChange }) => {
  return (
    <div className="edop-toggle-container">
      <label className="edop-toggle-switch">
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        <span className="edop-slider"></span>
      </label>
      <span className="edop-toggle-label">{label}</span>
    </div>
  );
};

export default Editdoctorprofile;