import React from "react";
import DownloadIcon from "./DownloadIcon";

const DownloadLink = ({onClick}) => {
  return (
    <div className="flex items-end gap-2 pb-2 hover:cursor-pointer"
        onClick={onClick}>
        <span className="text-base font-medium font-montserrat text-lg md:text-xl">template</span> {/* Add download text here */}
        <DownloadIcon />
    </div>
  );
};


export default DownloadLink;