import React from "react";
import LargeButton from "./LargeButton";

const DeductionButtonsGroup = ({ addValue }) => {

  const handleButtonClick = (value) => {
    addValue(value);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 justify-center">
      <div onClick={() => handleButtonClick(0.100)}>
        <LargeButton value={0.1} />
      </div>

      <div onClick={() => handleButtonClick(0.300)}>
        <LargeButton value={0.3} />
      </div>

      <div onClick={() => handleButtonClick(0.500)}>
        <LargeButton value={0.5} />
      </div>

      <div onClick={() => handleButtonClick(1.000)}>
        <LargeButton value={1} />
      </div>
    </div>
  );
};

export default DeductionButtonsGroup;