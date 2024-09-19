/**
 * This code was generated by Builder.io.
 */
import React from "react";

const AwardCard = ({ image, title }) => {
  return (
    <div className="flex overflow-hidden gap-5 px-4 py-3.5 text-base leading-6 bg-blue-50 rounded-xl border border-solid border-blue-600 border-opacity-50 shadow-[0px_4px_3px_rgba(0,0,0,0.04)] h-[82px]">
      <img
        loading="lazy"
        src={image}
        alt=""
        className="object-contain shrink-0 w-20 aspect-square"
      />
      <div className="my-auto font-medium text-slate-800">{title}</div>
    </div>
  );
};

export default AwardCard;
