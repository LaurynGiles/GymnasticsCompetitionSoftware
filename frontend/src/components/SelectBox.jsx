import React, { useState } from "react";
import ArrowIcon from "./ArrowIcon";
import SelectOptions from "./SelectOptions";

const SelectBox = ({ title, option , setOption, allOptions}) => {

  const [showPopup, setShowPopup] = useState(false);

  const handleArrowClick = () => {
    setShowPopup(!showPopup);
  };

  const handleOptionClick = (selectedOption) => {
    console.log(selectedOption); // You can handle the selected option here
    setOption(selectedOption);
    setShowPopup(false);
  };

  return (
    <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
      <div className="relative w-[200px] h-[25px] mt-[3.00px] font-montserrat font-medium text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
        {title}
      </div>
      <div className="flex w-[255px] items-center justify-center gap-[20px] px-[15px] py-[8px] relative flex-[0_0_auto] bg-bright-white rounded-[20px] overflow-hidden border-2 border-solid border-[#6279b8]">
        <div className="relative w-[185px] mt-[3.00px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
          {option}
        </div>
        <div onClick={handleArrowClick}>
          <ArrowIcon />
        </div>
      </div>
      {showPopup && <SelectOptions allOptions={allOptions} handleOptionClick={handleOptionClick}/>}
    </div>
  );
};

export default SelectBox;