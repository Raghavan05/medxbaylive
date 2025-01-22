import React from "react";
import DoctorProfile from "./DoctorProfile";
import DoctorInfo from "./DoctorInfo";
import Articles from "./Articles";
import FAQ from "./FAQ";
import { blue } from "@mui/material/colors";
// import "./Maincontent.css";

const MainContent = () => {
  return (
    <main className="">
      <div className="">
        <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"100%", border:"" }}>
           <div style={{border:"", width:"40%", paddingLeft:"5%", paddingRight:"5%"}}>
            <DoctorProfile />
          </div>
          <div style={{border:"", width:"60%", paddingLeft:"", paddingRight:"5%"}}>
            <DoctorInfo />
            {/* <Articles /> */}
            <FAQ />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
