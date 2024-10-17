import React from "react";
import UploadIcon from "./UploadIcon";

const UploadLink = ({ onFileChange, fileInputId }) => {
  const handleClick = () => {
    document.getElementById(fileInputId).click(); // Trigger the hidden file input when clicked
  };

  return (
    <div className="flex items-end gap-2 pb-2 hover:cursor-pointer" onClick={handleClick}>
      <span className="text-base font-medium font-montserrat text-lg md:text-xl">upload (.csv)</span>
      <UploadIcon />
      
      {/* Hidden file input */}
      <input 
        id={fileInputId}
        type="file" 
        accept=".csv" 
        onChange={onFileChange} 
        style={{ display: 'none' }} // Hide the file input
      />
    </div>
  );
};

export default UploadLink;