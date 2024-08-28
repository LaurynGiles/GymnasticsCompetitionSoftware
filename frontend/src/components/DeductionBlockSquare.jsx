import React from "react";
import Deduction from "./Deduction";

const DeductionBlockSquare = ({ values, removeValue }) => {
  return (
    <div className="flex flex-wrap gap-4 w-full py-24 md:py-24 border border-solid border-notification-box items-center justify-center">
      {values.map((value, index) => (
        <Deduction key={index} value={value} index={index} removeValue={removeValue} />
      ))}
    </div>
  );
};

export default DeductionBlockSquare;