import React from "react";
import LargeButton from "./LargeButton";

const DeductionButtonsGroup = ({ addValue }) => {

  const handleButtonClick = (value) => {
    addValue(value);
  };

  return (
    <div className="flex-col inline-flex items-center justify-center gap-[20px] relative flex-[0_0_auto]">
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