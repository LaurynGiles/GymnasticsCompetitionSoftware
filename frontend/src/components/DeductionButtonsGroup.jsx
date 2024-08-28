import React from "react";
import LargeButton from "./LargeButton";

const DeductionButtonsGroup = ({ addValue }) => {

  const handleButtonClick = (value) => {
    addValue(value);
  };

  return (
    <div className="flex flex-col gap-2 w-[50%] md:w-[30%] lg:w-[15%] items-center">
      {[0.1, 0.3, 0.5, 1.0].map((value) => (
        <div key={value} onClick={() => handleButtonClick(value)}>
          <LargeButton value={value} />
        </div>
      ))}
    </div>
  );
};

export default DeductionButtonsGroup;