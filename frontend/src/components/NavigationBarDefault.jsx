import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "./HomeIcon"
import BellIcon from "./BellIcon"
import SettingsIcon from "./SettingsIcon"
import BackIcon from "./BackIcon";
import BookIcon from "./BookIcon"
import PeopleIcon from "./PeopleIcon";

const NavigationBarDefault = ({ showBackIcon, showPeopleIcon, showBookIcon, prevPage, currPage, setLeaveGroup }) => {

  return (
    <div className="flex items-center w-full justify-between px-4 py-[12px] relative bg-glaucous">
      <LeftHeader showBackIcon={showBackIcon} showBookIcon={showBookIcon} showPeopleIcon={showPeopleIcon} prevPage={prevPage} currPage={currPage}/>
      <RightHeader currPage={currPage}/>
    </div>
  );
};

const LeftHeader = ({ showBackIcon, showBookIcon, showPeopleIcon, prevPage, currPage }) => {
  const navigate = useNavigate();

  const handleBackNavigation = (path) => {
    navigate(path);
  };

  const handleLobbyNavigation = () => {
    console.log(currPage)
    navigate("/lobby", { state: { currPage } });
  };


  return (
    <div className="flex w-[180px] items-center relative">
      {showBackIcon && 
        <BackIcon onClick={() => handleBackNavigation(prevPage)} />
      }
      {showPeopleIcon && 
        <PeopleIcon onClick={() => handleLobbyNavigation()}/>
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
      <HomeIcon onClick={() => setLeaveGroup(true)} />
      <BellIcon onClick={() => handleNavigation('/notificationsjudges')} />
      <SettingsIcon onClick={() => handleNavigation('/settings')} />
    </div>
  );
};


export default NavigationBarDefault;