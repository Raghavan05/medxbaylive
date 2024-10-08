import React from 'react';
import './Patientscaring.css'; 
import PatientCaringimg from '../Assets/patientcaringimg.png'; 
import Tickimg from '../Assets/Tickimg.png'; 

const PatientCaring = () => {
    return (
        <div className="patientcaring-container">
            <div className="patientcaring-content">
                <div className="patientcaring-image-section">
                    <div className="patientcaring-image">
                        <img src={PatientCaringimg} alt="Patient Care" />
                    </div>
                </div>
                <div className="patientcaring-text-section">
                    <h1>Helping Patients From Around The Globe</h1>
                    <h2>Patient <span className="patientcaring-highlight">Caring</span></h2>
                    <p>
                        Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner.
                        We hope you will allow us to care for you and strive to be the first and best choice for healthcare.
                    </p>
                    <div className="patientcaring-features">
                        <div className="patientcaring-feature-item">
                            <img src={Tickimg} className='patientcaring-features-tick' alt="Tick" />
                            <p>Stay Updated About Your Health</p>
                        </div>
                        <div className="patientcaring-feature-item">
                            <img src={Tickimg} className='patientcaring-features-tick' alt="Tick" />
                            <p>Check Your Results Online</p>
                        </div>
                        <div className="patientcaring-feature-item">
                            <img src={Tickimg} className='patientcaring-features-tick' alt="Tick" />
                            <p>Manage Your Appointments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientCaring;
