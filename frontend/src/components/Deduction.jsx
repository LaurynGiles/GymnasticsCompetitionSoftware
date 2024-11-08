import React from "react";

const Deduction = ({ index, value, removeValue }) => {
  return (
    <div
      className="flex w-16 h-16 md:w-24 md:h-24 items-center justify-center gap-2 p-2 bg-notification-box rounded-lg cursor-pointer"
      onClick={() => removeValue(index)}
    >
      <div className="w-8 h-7 font-montserrat font-semibold text-prussian-blue text-lg text-center">
        {value}
      </div>
    </div>
  );
};

export default Deduction;