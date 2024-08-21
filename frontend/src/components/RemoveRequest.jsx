import React from "react";
import XIcon from "../components/XIcon";

const RemoveRequest = ({ name }) => {
  return (
    <div className="flex items-center justify-center w-full px-4">
      <div className="flex items-center w-full justify-between">
        <div className="font-montserrat font-normal text-prussian-blue text-center text-lg md:text-xl truncate w-full">
          {name}
        </div>
        <div>
          {/* <XIcon /> Uncomment this if you want to use the icon */}
        </div>
      </div>
    </div>
  );
};

export default RemoveRequest;