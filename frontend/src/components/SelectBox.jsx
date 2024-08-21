import React, { useState } from "react";
import ArrowIcon from "./ArrowIcon";
import SelectOptions from "./SelectOptions";

const SelectBox = ({ noSelect, title, option , setOption, setOptionId, allOptions, allOptionsMap, optionType}) => {

  const [showPopup, setShowPopup] = useState(false);
  const [rotateArrow, setRotateArrow] = useState(180);

  const handleArrowClick = () => {
    setShowPopup(!showPopup);
    setRotateArrow(rotateArrow === 0 ? 180 : 0);
  };

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
    console.log(selectedOption);
    if (setOptionId) {
      const selectedOptionId = allOptionsMap[selectedOption];
      console.log(selectedOptionId);
      setOptionId(selectedOptionId);
    }
    setShowPopup(false);
    setRotateArrow(180);
  };

  const renderOption = (option) => {
    if (optionType === "Competition") {
        return `Competition ${option}`;
    } else {
        return option;
    }
};

  return (
    <div className="flex flex-col items-center justify-center gap-2 relative">
      <div className="w-full md:w-auto text-center font-montserrat font-medium text-prussian-blue text-lg md:text-xl px-4">
        {title}
      </div>
      <div className="flex w-[90%] items-center justify-center gap-2 px-3 py-2 bg-bright-white rounded-3xl border-2 border-glaucous">
        <div className="relative w-[185px] mt-[3.00px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
          {option != "" && renderOption(option)}
        </div>
        <div onClick={!noSelect ? handleArrowClick : null}>
          <ArrowIcon rotation={rotateArrow} noSelect={noSelect}/>
        </div>
      </div>
      {showPopup && <SelectOptions allOptions={allOptions} handleOptionClick={handleOptionClick} optionType={optionType}/>}
    </div>
  );
};

export default SelectBox;