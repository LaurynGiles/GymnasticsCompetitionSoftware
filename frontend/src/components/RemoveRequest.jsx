import React from "react";
import XIcon from "../components/XIcon";

const RemoveRequest = ({ name, removeJoined, index }) => {

  const handleXClick = () => {
    removeJoined(index);
  };

  return (
    <div className="flex items-center justify-center w-[345px]">
      <div className="flex items-center gap-[70px]">
        <div className="font-montserrat font-normal text-prussian-blue w-[200px] text-[18px] text-center">
          {name}
        </div>
        <div className="group" onClick={handleXClick}>
          <XIcon />
        </div>
      </div>
    </div>
  );
};

export default RemoveRequest;