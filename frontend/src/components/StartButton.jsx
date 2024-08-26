import React from "react";
import NextArrowIcon from "../components/NextArrowIcon";

const StartButton = ({ title, onClick }) => {
  return (
    <div
      className="w-full max-w-[250px] bg-anti-flash-white rounded-[20px] h-[40px] shadow-md flex items-center justify-between px-10 cursor-pointer"
      onClick={onClick}
    >
      <div className="font-montserrat font-medium text-prussian-blue text-md md:text-lg lg:text-xl text-left tracking-[0] leading-[normal]">
        {title}
      </div>
      <div>
        <NextArrowIcon />
      </div>
    </div>
  );
};

export default StartButton;