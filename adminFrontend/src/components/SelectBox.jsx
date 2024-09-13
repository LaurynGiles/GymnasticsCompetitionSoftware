import React, { useState } from "react";
import ArrowIcon from "./ArrowIcon";
// import SelectOptions from "./SelectOptions";

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
  <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-6 relative">
    <div className="text-center font-montserrat font-medium text-prussian-blue text-lg md:text-xl lg:text-2xl px-4">
      {title}
    </div>
    <div className="flex flex-row w-[250px] lg:w-[300px] items-center justify-between px-6 lg:px-8 py-2 bg-bright-white rounded-3xl border-2 border-glaucous">
      <div className="relative flex-1 font-montserrat font-medium text-prussian-blue text-base md:text-lg lg:text-xl">
        {option !== "" && renderOption(option)}
      </div>
      <div onClick={!noSelect ? handleArrowClick : null} className="cursor-pointer">
        <ArrowIcon rotation={rotateArrow} noSelect={noSelect} />
      </div>
    </div>
    {showPopup && (
      <SelectOptions
        allOptions={allOptions}
        handleOptionClick={handleOptionClick}
        optionType={optionType}
      />
    )}
  </div>
);
};

export default SelectBox;