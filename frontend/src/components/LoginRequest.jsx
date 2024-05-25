import React from "react";
import TickIcon from "../components/TickIcon";

const LoginRequest = ({ name, removeAccept, addJoined , index}) => {

  const handleTickClick = () => {
    removeAccept(index);
    addJoined(name);
  };

  return (
    <div className="flex items-center justify-center w-[345px]">
      <div className="flex items-center gap-[70px]">
        <div className="font-montserrat font-normal text-prussian-blue w-[200px] text-[18px] text-center">
          {name}
        </div>
        <div className="group" onClick={handleTickClick}>
          <TickIcon />
        </div>
      </div>
    </div>
  );
};

export default LoginRequest;