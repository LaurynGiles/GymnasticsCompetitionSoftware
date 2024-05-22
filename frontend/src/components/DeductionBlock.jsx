import React from "react";
import Deduction from "./Deduction";

const DeductionBlock = ( {values} ) => {
  return (
    <div className="flex flex-wrap w-[230px] items-start gap-[10px] px-[18px] py-[45px] relative border border-solid border-notification-box">
        {values.map((value, index) => (
            <Deduction key={index} value={value} />
        ))}
    </div>
  );
}

export default DeductionBlock;