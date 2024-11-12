import React from "react";
import TickIcon from "../components/TickIcon";
import XIcon from "../components/XIcon";

const ResubmitRequest = ({ name, onApprove, onReject }) => {
  return (
    <div className="flex items-center justify-start ml-[612px] w-full">
      <div className="flex items-center gap-4 pl-4"> {/* Reduce gap and add padding to shift left */}
        <div className="font-montserrat font-normal text-prussian-blue w-[200px] text-[18px] text-left">
          {name}
        </div>
        <div className="flex items-center gap-3"> {/* Adjust icon spacing */}
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