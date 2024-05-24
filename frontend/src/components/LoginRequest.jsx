import React from "react";
import TickIcon from "../components/TickIcon";

const LoginRequest = ({ number, name }) => {
  return (
    <div className="flex items-center justify-center w-[345px]">
      <div className="flex items-center gap-[70px]">
        <div className="font-montserrat font-normal text-prussian-blue w-[200px] text-[18px] text-center">
          ({number}) {name}
        </div>
        <TickIcon />
      </div>
    </div>
  );
};

export default LoginRequest;