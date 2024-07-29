import React from "react";
import NextArrowIcon from "../components/NextArrowIcon";

const StartButton = ({title}) => {
    return (
      <div className="w-[250px] bg-anti-flash-white rounded-[20px] h-[40px] shadow-[0px_4px_4px_#00000040] relative cursor-pointer">
        <div className="absolute inset-y-0 left-10 flex items-center ml-4 gap-[25px]">
          <div className="w-[127.42px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
            {title}
          </div>
          <NextArrowIcon />
        </div>
      </div>
    );
  };

export default StartButton;