import React from "react";
import XIcon from "../components/XIcon";

const RemoveRequest = ({ name }) => {
  return (
    <div className="flex items-center justify-center md:justify-start w-full px-4">
      <div className="flex items-center w-full justify-between">
        <div className="font-montserrat font-normal text-prussian-blue text-lg md:text-xl text-left truncate">
          {name}
        </div>
        <div>
          {/* <XIcon /> */}
        </div>
      </div>
    </div>
  );
};

export default RemoveRequest;