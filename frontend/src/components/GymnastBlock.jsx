import React from "react";
import RadioSelectIcon from "./RadioSelectIcon";
import FilledRadioSelectIcon from "./FilledRadioSelectIcon";

const GymnastBlock = ({ number, name, level, age, club, isSelected, onSelect, competed }) => {

  const details = [
    `Level ${level}`,
    `${age} yrs`,
    club
  ];

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[60%] h-auto md:h-[120px] lg:h-[120px] flex flex-row items-center md:justify-center gap-4 md:gap-8 lg:gap-16 p-4 bg-anti-flash-white rounded-lg shadow-md"
    onClick={() => onSelect(number)}
    >
      {/* Circle with number */}
      <div className="flex items-center justify-center w-16 h-16 lg:h-20 lg:w-20 bg-glaucous rounded-full text-anti-flash-white text-lg md:text-xl lg:text-2xl font-montserrat font-medium">
        {number}
      </div>

      <div className="w-full flex-1 flex flex-col gap-2 md:gap-4">
        {/* Name at the top for medium and above */}
        <div className="text-prussian-blue text-lg md:text-xl lg:text-2xl font-montserrat font-medium">
          {name}
        </div>

        {/* Dynamically render details */}
        <div className="w-full flex flex-col md:flex-row md:gap-4 lg:gap-8 md:items-center">
          {details.map((detail, index) => (
            <div
              key={index}
              className="w-full text-prussian-blue text-sm md:text-md lg:text-lg font-montserrat font-medium"
            >
              {detail}
            </div>
          ))}
        </div>
      </div>

      {!competed && (
        <div
          className="cursor-pointer flex items-center justify-center"
        >
          {isSelected ? <FilledRadioSelectIcon /> : <RadioSelectIcon />}
        </div>
      )}
    </div>
  );
};

export default GymnastBlock;