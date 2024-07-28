import React from "react";

const EventBox = () => {
  return (
    <div className="inline-flex flex-col items-center gap-[3px] px-[15px] py-[15px] relative bg-anti-flash-white rounded-[10px] overflow-hidden">
      <div className="flex w-[337px] items-center justify-center gap-[147px] px-[3px] py-0 relative flex-[0_0_auto]">
        <div className="relative w-[137.04px] h-[30px]">
          <div className="relative w-[135px] h-[30px] bg-periwinkle rounded-[10px]">
            <div className="absolute w-[100px] mt-[4.00px] h-7 top-px left-[18px] font-montserrat font-medium text-prussian-blue text-base text-center tracking-[0] leading-[normal]">
              R1: Floor
            </div>
          </div>
        </div>
        <div className="relative w-[38px] h-5">
          <div className="relative w-9 h-5">
            {/* <img className="absolute w-5 h-5 top-0 left-4" alt="People icon" /> */}
            <div className="absolute w-[18px] h-[18px] top-0.5 left-0 font-montserrat font-semibold text-prussian-blue text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
              4
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[337px] items-center gap-2.5 pl-[15px] pr-[21px] py-[5px] relative flex-[0_0_auto]">
        <div className="relative w-[297px] mt-[4.00px] font-montserrat font-medium text-prussian-blue text-base tracking-[0] leading-[normal]">
          Level 3&nbsp;&nbsp;07-09 yrs
        </div>
      </div>
      <div className="flex w-[337px] items-center justify-center gap-[25px] pl-[15px] pr-[13px] py-1.5 relative flex-[0_0_auto]">
        <p className="relative w-[221.21px] ml-[-3.61px] font-montserrat font-normal text-prussian-blue text-base tracking-[0] leading-[normal]">
          <span className="font-medium">Status</span>
          <span className="font-medium">: </span>
          <span className="font-medium">Waiting for judges</span>
        </p>
        <button className="all-[unset] box-border flex w-[70px] items-center justify-center gap-2.5 px-5 py-2.5 relative mr-[-3.61px] bg-prussian-blue rounded-[20px] shadow-[0px_4px_4px_#00000040]">
          <div className="relative w-fit mt-[4.00px] font-montserrat font-medium text-bright-white text-sm text-center tracking-[0] leading-[normal]">
            Join
          </div>
        </button>
      </div>
    </div>
  );
};

export default EventBox;