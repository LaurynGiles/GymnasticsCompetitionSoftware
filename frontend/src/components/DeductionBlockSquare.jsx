import React from "react";
import Deduction from "./Deduction";

const DeductionBlockSquare = ({ values, removeValue }) => {
  return (
    <div className="flex flex-wrap gap-4 px-4 md:py-20 border border-solid border-notification-box w-[85%] md:w-[60%] lg:w-[30%] items-center justify-center">
      {values.map((value, index) => (
        <Deduction key={index} value={value} index={index} removeValue={removeValue} />
      ))}
    </div>
  );
};

export default DeductionBlockSquare;