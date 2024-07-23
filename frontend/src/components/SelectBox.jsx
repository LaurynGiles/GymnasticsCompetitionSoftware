import React, { useState } from "react";
import ArrowIcon from "./ArrowIcon";
import SelectOptions from "./SelectOptions";

const SelectBox = ({ title, option , setOption, allOptions, optionType}) => {

  const [showPopup, setShowPopup] = useState(false);
  const [rotateArrow, setRotateArrow] = useState(0);

  const handleArrowClick = () => {
    setShowPopup(!showPopup);
    setRotateArrow(rotateArrow === 0 ? 180 : 0);
  };

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
    setShowPopup(false);
    setRotateArrow(0);
  };

  const renderOption = (option) => {
    if (optionType === "Level") {
        return `Level ${option}`;
    } else if (optionType === "Age") {
        return `${option} yrs`;
    } else {
        return option;
    }
};

  return (
    <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
      <div className="relative w-[200px] h-[25px] mt-[3.00px] font-montserrat font-medium text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
        {title}
      </div>
      <div className="flex w-[255px] items-center justify-center gap-[20px] px-[15px] py-[8px] relative flex-[0_0_auto] bg-bright-white rounded-[20px] overflow-hidden border-2 border-solid border-[#6279b8]">
        <div className="relative w-[185px] mt-[3.00px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
          {option != "" && renderOption(option)}
        </div>
        <div onClick={handleArrowClick}>
          <ArrowIcon rotation={rotateArrow}/>
        </div>
      </div>
      {showPopup && <SelectOptions allOptions={allOptions} handleOptionClick={handleOptionClick} optionType={optionType}/>}
    </div>
  );
};

export default SelectBox;