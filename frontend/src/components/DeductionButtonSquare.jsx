import React from "react";
import LargeButton from "./LargeButton";

const DeductionButtonsSquare = ({ addValue }) => {
  const handleButtonClick = (value) => {
    addValue(value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-full h-full flex flex-row items-center justify-center gap-4 md:gap-8">
        <div onClick={() => handleButtonClick(0.100)}>
          <LargeButton value={0.1} />
        </div>
        <div className="" onClick={() => handleButtonClick(0.300)}>
          <LargeButton value={0.3} />
        </div>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-center gap-4 md:gap-8">
        <div onClick={() => handleButtonClick(0.500)}>
          <LargeButton value={0.5} />
        </div>
        <div onClick={() => handleButtonClick(1.000)}>
          <LargeButton value={1} />
        </div>
      </div>
    </div>
  );
};

export default DeductionButtonsSquare;