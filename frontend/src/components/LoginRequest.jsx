import React from "react";
import TickIcon from "../components/TickIcon";
import XIcon from "../components/XIcon";

const LoginRequest = ({ name, onApprove, onReject }) => {
  return (
    <div className="flex items-center justify-center w-full pl-14">
      <div className="flex items-center w-full">
        <div className="font-montserrat font-normal text-prussian-blue text-center text-lg md:text-xl truncate w-full">
          {name}
        </div>
        <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
          <div className="group cursor-pointer" onClick={onApprove}>
            <TickIcon />
          </div>
          <div className="group cursor-pointer" onClick={onReject}>
            <XIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequest;