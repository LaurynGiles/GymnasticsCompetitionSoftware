import React from "react";
import SmallLogo from "../components/SmallLogo";
import HomeIcon from "../components/HomeIcon";
import ConfigIcon from "../components/ConfigIcon";
import ClockIcon from "../components/ClockIcon";
import GymnastIcon from "../components/GymnastIcon";
import BookIcon from "../components/BookIcon";
import TickIcon from "../components/TickIcon";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  
  return (
    <div className="fixed top-0 left-0  h-full w-[18%] bg-anti-flash-white p-4 md:p-6 lg:p-8 flex flex-col items-center">
      <img 
        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover mb-6"
        alt="Logo" 
        src="logo.png" 
      />
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-16">
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/createWelcome')}>
          <HomeIcon onClick={() => handleNavigation('/createWelcome')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Welcome</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/competitionConfig')}>
          <ConfigIcon onClick={() => handleNavigation('/competitionConfig')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Configuration</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={() => handleNavigation('/timeslotConfig')}>
          <ClockIcon onClick={() => handleNavigation('/timeslotConfig')}/>
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Time Slots</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded">
          <GymnastIcon />
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Gymnasts</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded">
          <BookIcon />
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Judges</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-gray-200 p-2 rounded">
          <TickIcon />
          <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Complete</span>
        </div>
      </div>
    </div>
  );
};


export default NavigationBar;