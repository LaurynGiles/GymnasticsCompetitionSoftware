import React from "react";

const JudgeAnalysis = ({ deductions }) => {

  const formattedDeductions = Array.isArray(deductions) ? deductions.join(' + ') : deductions;

  return (
    <div className="flex-col w-[380px] gap-[15px] p-[10px] bg-anti-flash-white flex items-center relative flex-[0_0_auto]">
        <div className="flex w-[360px] items-center px-[15px] py-0 relative flex-[0_0_auto]">
            <p className="w-[333px] mr-[-3.00px] font-montserrat font-medium relative mt-[-1.00px] text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                {formattedDeductions}
            </p>
        </div>
    </div>
  );
};

export default JudgeAnalysis;