import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "./HomeIcon"
import BellIcon from "./BellIcon"
import SettingsIcon from "./SettingsIcon"
import BackIcon from "./BackIcon";
import BookIcon from "./BookIcon"

const NavigationBarDefault = ({ showBackIcon, showBookIcon, prevPage, currPage }) => {

  return (
    <div className="flex items-center w-full justify-between px-4 py-[12px] relative bg-glaucous">
      <LeftHeader showBackIcon={showBackIcon} showBookIcon={showBookIcon} prevPage={prevPage}/>
      <RightHeader currPage={currPage}/>
    </div>
  );
};

const LeftHeader = ({ showBackIcon, showBookIcon, prevPage }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex w-[180px] items-center relative">
      {showBackIcon && 
        <BackIcon onClick={() => handleNavigation(prevPage)} />
      }
      {showBookIcon && <BookIcon />}
    </div>
  );
};

const RightHeader = ({ currPage }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { state: { currPage } });
  };

  return (
    <div className="flex w-[180px] items-center justify-end gap-[30px] relative">
      <HomeIcon onClick={() => handleNavigation('/homejudges')} />
      <BellIcon onClick={() => handleNavigation('/notificationsjudges')} />
      <SettingsIcon onClick={() => handleNavigation('/settings')} />
    </div>
  );
};


export default NavigationBarDefault;