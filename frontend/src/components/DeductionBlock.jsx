import React from "react";
import Deduction from "./Deduction";

const DeductionBlock = ({ values, removeValue }) => {
  return (
    <div className="flex flex-wrap gap-2 border border-solid border-notification-box p-2 w-[60%] lg:w-[30%] items-center justify-center py-16 md:py-24">
      {values.map((value, index) => (
        <Deduction key={index} value={value} index={index} removeValue={removeValue} />
      ))}
    </div>
  );
};

export default DeductionBlock;