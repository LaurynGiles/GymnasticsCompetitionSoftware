import React from "react";
import HomeIcon from "../components/HomeIcon"
import BellIcon from "../components/BellIcon"
import SettingsIcon from "../components/SettingsIcon"

const NavigationBar = () => {
  return (
    <div className="flex items-center w-full justify-center px-[13px] py-[12px] relative bg-glaucous">
      <LeftHeader className="!relative !w-[180px]" />
      <RightHeader className="!relative !w-[180px]" />
    </div>
  );
};

const LeftHeader = () => {
  return (
    <div className="flex w-[180px] items-center relative">
    </div>
  );
};

const RightHeader = () => {
  return (
    <div className="flex w-[180px] items-center justify-end gap-[30px] relative">
      <HomeIcon />
      <BellIcon />
      <SettingsIcon />
    </div>
  );
};


export default NavigationBar;