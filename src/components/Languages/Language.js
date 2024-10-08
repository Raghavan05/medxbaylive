import React from 'react';
import './Language.css';
import tick from "../../assests/img/tick.png";



const Languages = ({Languages}) => {
  return (
    <div className="languages-container text-center py-4">
      <h2>Languages</h2>
      <div className="d-flex justify-content-center languages-column-container">
      <div className="languages-column ">
            {Languages?.map(language => (
              <div key={language} className="language-item d-flex align-items-center mb-2">
                <img src={tick} alt="tick" />
                <span className='language-text'>{language}</span>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Languages;
