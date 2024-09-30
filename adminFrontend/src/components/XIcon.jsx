import React from "react";

const XIcon = ({ onClick, isVisible }) => {
  if (!isVisible) {
    return null; // Hide the icon if isVisible is false
  }

  return (
    <svg 
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="1.5" 
      stroke="currentColor" 
      className="w-8 h-8 md:w-8 md:h-8 text-prussian-blue hover:text-red-700 items-center"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
      />
    </svg>
  );
};

export default XIcon;