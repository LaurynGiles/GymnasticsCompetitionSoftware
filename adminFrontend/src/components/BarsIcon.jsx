import React from "react";

const BarsIcon = ({onClick}) => {
  return (
    <svg 
        onClick ={onClick}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="w-8 h-8 md:w-10 md:h-10 text-prussian-blue cursor-pointer">
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
  );
};

export default BarsIcon;