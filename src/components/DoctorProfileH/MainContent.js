/**
 * This code was generated by Builder.io.
 */
import React from "react";
import DoctorProfile from "./DoctorProfile";
import DoctorInfo from "./DoctorInfo";
import Articles from "./Articles";
import FAQ from "./FAQ";

const MainContent = () => {
  return (
    <main className="flex flex-col items-end px-20 mt-10 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="self-stretch max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <DoctorProfile />
          <DoctorInfo />
        </div>
      </div>
      <Articles />
      <FAQ />
    </main>
  );
};

export default MainContent;