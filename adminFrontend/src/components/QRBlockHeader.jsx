import React from "react";
import SettingsIcon from "./SettingsIcon";
import ExitIcon from "./ExitIcon";
import QRIcon from "./QRIcon";
import { useNavigate } from "react-router-dom";
import HomeIcon from "./HomeIcon";

const QRBlockHeader = ({ text }) => {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/homeAdmin");
  };

  return (
    <div className="w-[90%] px-16 py-2 md:py-4 bg-light-periwinkle rounded-lg flex items-center justify-between">
      {/* Left Icons */}
      <div className="flex items-center gap-2 md:gap-4">
        <HomeIcon onClick={handleHomeClick}/>
      </div>
      
      {/* Center Text */}
      <div className="flex-grow flex justify-center">
        <p className="font-montserrat font-medium text-prussian-blue text-xl lg:text-3xl md:text-2xl text-center">
          {text}
        </p>
      </div>

    </div>
  );
};

export default QRBlockHeader;