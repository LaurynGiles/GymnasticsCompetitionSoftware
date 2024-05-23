import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import HomeIcon from "./HomeIcon"
import BellIcon from "./BellIcon"
import SettingsIcon from "./SettingsIcon"
import BackIcon from "./BackIcon";
import BookIcon from "./BookIcon"

const NavigationBarDefault = ({ showBackIcon, showBookIcon, prevPage }) => {

  // const location = useLocation();
  // const [prevPage, setPrevPage] = useState("/home");

  // useEffect(() => {
  //   if (location.pathname !== "/notifications") {
  //     console.log(`Setting prevPage to ${location.pathname}`);
  //     setPrevPage(location.pathname);
  //   }
  // }, [location.pathname]);

  return (
    <div className="flex items-center w-full justify-center px-[13px] py-[12px] relative bg-glaucous">
      <LeftHeader showBackIcon={showBackIcon} showBookIcon={showBookIcon} prevPage={prevPage}/>
      <RightHeader/>
    </div>
  );
};

const LeftHeader = ({ showBackIcon, showBookIcon, prevPage }) => {
  return (
    <div className="flex w-[180px] items-center relative">
      {showBackIcon && 
        <Link to={prevPage}>
          <BackIcon />
        </Link>
      }
      {showBookIcon && <BookIcon />}
    </div>
  );
};

const RightHeader = () => {

  return (
    <div className="flex w-[180px] items-center justify-end gap-[30px] relative">
      <Link to="/home">
        <HomeIcon />
      </Link>
      <Link to="/notifications" >
        <BellIcon />
      </Link>
      <SettingsIcon />
    </div>
  );
};


export default NavigationBarDefault;