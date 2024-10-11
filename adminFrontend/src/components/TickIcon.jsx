import React from "react";

const TickIcon = ({onClick}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="green" 
        className="w-8 h-8 md:w-8 md:h-8 text-prussian-blue group-hover:text-glaucous hover:stroke-prussian-blue"
    >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
        />
    </svg>
  );
};

export default TickIcon;



