import React from "react";
import SettingsIcon from "./SettingsIcon";
import ExitIcon from "./ExitIcon";
import QRIcon from "./QRIcon";
import { useNavigate } from "react-router-dom";

const HomeBlockHeader = ({ text, exitOnClick }) => {

  const navigate = useNavigate();

  const handleQRCodeClick = () => {
    navigate("/qrcode");
  };

  return (
    <div className="w-[90%] px-16 py-2 md:py-4 bg-light-periwinkle rounded-lg flex items-center justify-between">
      {/* Left Icons */}
      <div className="flex items-center gap-2 md:gap-4">
        <ExitIcon onClick={exitOnClick} />
        <SettingsIcon />
        {/* <QRIcon onClick={handleQRCodeClick} /> */}
      </div>
      
      {/* Center Text */}
      <div className="flex-grow flex justify-center">
        <p className="font-montserrat font-medium text-prussian-blue text-xl lg:text-3xl md:text-2xl text-center">
          {text}
        </p>
      </div>

      {/* Right Placeholder for Centering */}
      <div className="flex items-center gap-2 md:gap-4" style={{ visibility: 'hidden' }}>
        <ExitIcon />
        <SettingsIcon />
        {/* <QRIcon /> */}
      </div>
    </div>
  );
};

export default HomeBlockHeader;