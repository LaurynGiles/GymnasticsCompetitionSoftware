import React from "react";
import ArrowIcon from "./ArrowIcon";

const JudgeScore = ({ name, deduction, total, onUpdateAnalysis, rotation }) => {
  return (
    <div className="flex flex-col w-[374px] items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-light-periwinkle rounded-[10px]">
        <div className="flex w-[360px] items-center relative flex-[0_0_auto] ml-[-3.00px] mr-[-3.00px]">
            <div className="w-[150px] h-[26px] font-montserrat font-medium text-center relative mt-[5.00px] text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                {name}
            </div>
            <div className="w-[106px] h-[26px] font-montserrat font-medium text-center relative mt-[5.00px] text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                {deduction}
            </div>
            <div className="w-[80px] h-[26px] font-montserrat font-medium text-center relative mt-[5.00px] text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                {total}
            </div>
            <div onClick={onUpdateAnalysis}>
                <ArrowIcon rotation={rotation}/>
            </div>
            
        </div>
    </div>
  );
};

export default JudgeScore;



