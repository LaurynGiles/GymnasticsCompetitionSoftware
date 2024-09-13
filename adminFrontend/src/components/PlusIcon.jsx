import React from "react";

const PlusIcon = ({onClick}) => {
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

  );
};

export default PlusIcon;