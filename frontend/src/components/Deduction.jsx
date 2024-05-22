import React from "react";

const Deduction = ({value}) => {
  return (
    <div className="flex w-[53px] items-center justify-center gap-[10px] p-[10px] relative bg-notification-box rounded-[10px]">
        <div className="relative w-[33px] h-[28px] mt-[3.00px] font-montserrat font-semibold text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
            {value}
        </div>
    </div>
  );
};

export default Deduction;