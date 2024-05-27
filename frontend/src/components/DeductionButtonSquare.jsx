import React from "react";
import LargeButton from "./LargeButton";

const DeductionButtonsSquare = ({ addValue }) => {
  const handleButtonClick = (value) => {
    addValue(value);
  };

  return (
    <div className="inline-flex flex-col items-center justify-center gap-[15px] px-[20px] py-[10px] relative flex-[0_0_auto]">
        <div className="inline-flex items-center justify-center gap-[20px] relative flex-[0_0_auto]">
            <div onClick={() => handleButtonClick(0.100)}>
                <LargeButton value={0.1} />
            </div>
            
            <div onClick={() => handleButtonClick(0.300)}>
                <LargeButton value={0.3} />
            </div>
        </div>
        <div className="inline-flex items-center justify-center gap-[20px] relative flex-[0_0_auto]">
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