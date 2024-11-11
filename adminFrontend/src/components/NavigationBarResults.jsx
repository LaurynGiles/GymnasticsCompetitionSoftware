import React from "react";
import SmallLogo from "../components/SmallLogo";
import HomeIcon from "../components/HomeIcon";
import ConfigIcon from "../components/ConfigIcon";
import ClockIcon from "../components/ClockIcon";
import GymnastIcon from "../components/GymnastIcon";
import BookIcon from "../components/BookIcon";
import TickIcon from "../components/TickIcon";
import ExitIcon from "./ExitIcon";
import { useNavigate } from "react-router-dom";

const NavigationBarResults = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  
  return (
    <div className="fixed top-0 left-0 h-full w-[18%] bg-anti-flash-white p-4 md:p-6 lg:p-8 flex flex-col items-center">
      <img 
        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover mb-6"
        alt="Logo" 
        src="logo.png" 
      />
      <div className="flex flex-col gap-6 md:gap-12">
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/results')}>
          <BookIcon onClick={() => handleNavigation('/results')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">App Results</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/finalResults')}>
          <BookIcon onClick={() => handleNavigation('/finalResults')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Final Results</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/qualifications')}>
          <BookIcon onClick={() => handleNavigation('/qualifications')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Qualifications</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/gymnastData')}>
          <BookIcon onClick={() => handleNavigation('/gymnastData')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Gymnast Info</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/judgeData')}>
          <BookIcon onClick={() => handleNavigation('/judgeData')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Judge Info</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/homeAdmin')}>
          <ExitIcon onClick={() => handleNavigation('/homeAdmin')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Exit</span>
        </div>
      </div>
    </div>
  );
};


export default NavigationBarResults;