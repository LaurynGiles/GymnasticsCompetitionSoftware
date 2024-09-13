import React from "react";
import SmallLogo from "../components/SmallLogo";
import HomeIcon from "../components/HomeIcon";
import ConfigIcon from "../components/ConfigIcon";
import ClockIcon from "../components/ClockIcon";
import GymnastIcon from "../components/GymnastIcon";
import BookIcon from "../components/BookIcon";
import TickIcon from "../components/TickIcon";

const NavigationBar = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-start gap-6 md:gap-8 lg:gap-16 top-0 left-0 absolute bg-anti-flash-white p-4 md:p-6 lg:p-8">
        <img 
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover"
          alt="Logo" 
          src="logo.png" 
        />
        <div className="flex flex-col items-start gap-6 md:gap-8 lg:gap-16">
          <div className="flex items-center gap-4 md:gap-6">
            <HomeIcon />
            <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Welcome</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <ConfigIcon />
            <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Configuration</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <ClockIcon />
            <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Sessions</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <GymnastIcon />
            <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Gymnasts</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <BookIcon />
            <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Judges</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <TickIcon />
            <span className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-medium font-montserrat">Complete</span>
          </div>
        </div>
      </div>
    );
  };

export default NavigationBar;