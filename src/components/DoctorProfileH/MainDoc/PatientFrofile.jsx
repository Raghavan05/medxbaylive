import React from "react";
import Articles from "../Articles";
import DoctorInfo from "../DoctorInfo";
import FAQ from "../FAQ";
import MainPac from "./MainPac";
import BookAppointment from "../BookAppointment";


function PatientFrofile() {
  return (
    <div>
      <main className="">
      <div className="">
        <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"100%", border:"" }}>
           <div style={{border:"", width:"40%", paddingLeft:"5%", paddingRight:"5%"}}>
            <MainPac />
            <BookAppointment/>
          </div>
          <div style={{border:"", width:"60%", paddingLeft:"", paddingRight:"5%"}}>
            <DoctorInfo />
            {/* <Articles /> */}
            <FAQ />
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}

export default PatientFrofile;
