import React from "react";
import TickIcon from "../components/TickIcon";
import XIcon from "../components/XIcon";

const ResubmitRequest = ({ name, onApprove, onReject }) => {

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-[70px]">
        <div className="font-montserrat font-normal text-prussian-blue w-[200px] text-[18px] text-center">
          {name}
        </div>
        <div className="flex items-center gap-[15px]">
          <div className="group" onClick={onApprove}>
            <TickIcon />
          </div>
          <div className="group" onClick={onReject}>
            <XIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResubmitRequest;