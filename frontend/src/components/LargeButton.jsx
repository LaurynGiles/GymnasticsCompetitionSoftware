import React from "react";

const LargeButton = ({ value }) => {
  return (
    <div className="flex w-[128px] h-[89px] items-center justify-center gap-[10px] px-[30px] py-[25px] relative bg-notification-box rounded-[20px]">
        <div className="relative w-[68px] h-[39px] mt-[0.00px] font-montserrat font-semibold text-prussian-blue text-[35px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            {value}
        </div>
    </div>
  );
}

export default LargeButton;