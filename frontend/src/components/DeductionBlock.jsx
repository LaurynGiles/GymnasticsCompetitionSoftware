import React from "react";
import Deduction from "./Deduction";

const DeductionBlock = ( {values, removeValue} ) => {
  return (
    <div className="flex flex-wrap gap-4 px-4 py-16 md:py-20 border border-solid border-notification-box w-[60%] md:w-[50%] lg:w-[25%] items-center justify-center">
        {values.map((value, index) => (
          <Deduction key={index} value={value} index={index} removeValue={removeValue} />
        ))}
    </div>
  );
}

export default DeductionBlock;