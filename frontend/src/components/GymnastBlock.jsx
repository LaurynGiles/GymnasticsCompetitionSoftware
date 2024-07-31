import React from "react";
import RadioSelectIcon from "./RadioSelectIcon";
import FilledRadioSelectIcon from "./FilledRadioSelectIcon";

const GymnastBlock = ({ number, name, level, age, club, isSelected, onSelect, index, competed }) => {
  return (
    <div className="inline-flex items-center gap-[5px] px-[20px] py-[5px] relative bg-anti-flash-white">
      <div className="flex w-[64px] items-center justify-center gap-[10px] px-[9px] py-[20px] relative">
        <div className="relative w-[50px] h-[50px] ml-[-2.00px] mr-[-2.00px] bg-glaucous rounded-[25px]">
          <div className="absolute w-[34px] h-[32px] top-[8px] left-[8px] font-montserrat font-medium text-anti-flash-white text-[20px] text-center tracking-[0] leading-[normal]">
            {number}
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col items-start justify-center gap-[5px] pt-[12px] pb-[13px] px-0 relative flex-[0_0_auto]">
        <div className="flex w-[202px] items-center gap-[10px] relative flex-[0_0_auto]">
          <div className="relative w-[202px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
            {name}
          </div>
        </div>
        <div className="flex w-[202px] items-center gap-[10px] relative flex-[0_0_auto]">
          <div className="relative w-[202px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[14px] tracking-[0] leading-[normal]">
            Level {level}&nbsp;&nbsp;{age} yrs
          </div>
        </div>
        <div className="flex w-[202px] items-center gap-[10px] relative flex-[0_0_auto]">
          <div className="relative w-[202px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[14px] tracking-[0] leading-[normal]">
            {club}
          </div>
        </div>
      </div>
      {!competed &&
      <div onClick={() => onSelect(index)} className="cursor-pointer">
        {isSelected ? <FilledRadioSelectIcon /> : <RadioSelectIcon />}
        </div>
      }
      
    </div>
  );
};

export default GymnastBlock;