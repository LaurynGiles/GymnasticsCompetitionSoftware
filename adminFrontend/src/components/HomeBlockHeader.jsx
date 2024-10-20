import React from "react";
import SettingsIcon from "./SettingsIcon";
import ExitIcon from "./ExitIcon";

const HomeBlockHeader = ({ text, exitOnClick }) => {
    return (
      <div className="w-[90%] px-4 py-2 md:py-4 bg-light-periwinkle rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <ExitIcon onClick={exitOnClick}/>
          <SettingsIcon />

        </div>
        <p className="font-montserrat font-medium text-prussian-blue text-xl lg:text-3xl md:text-2xl text-center flex-grow">
          {text}
        </p>
      </div>
    );
  };
  
  
  export default HomeBlockHeader;