import React, { useState } from "react";
import HomeIcon from "./HomeIcon"
import BellIcon from "./BellIcon"
import SettingsIcon from "./SettingsIcon"
import BackIcon from "./BackIcon";
import { Link } from "react-router-dom";

const NavigationBarDefault = ({ showBackIcon }) => {
  // const [showBackIconVar, setShowBackIcon] = useState(true); // true to show, false to hide

  return (
    <div className="flex items-center w-full justify-center px-[13px] py-[12px] relative bg-glaucous">
      <LeftHeader showBackIcon={showBackIcon}/>
      <RightHeader />
    </div>
  );
};

const LeftHeader = ({ showBackIcon }) => {
  return (
    <div className="flex w-[180px] items-center relative">
      {showBackIcon && <BackIcon />}
    </div>
  );
};

const RightHeader = () => {
  return (
    <div className="flex w-[180px] items-center justify-end gap-[30px] relative">
      <Link to="/home">
        <HomeIcon />
      </Link>
      <Link to="/notifications">
        <BellIcon />
      </Link>
      <SettingsIcon />
    </div>
  );
};


export default NavigationBarDefault;