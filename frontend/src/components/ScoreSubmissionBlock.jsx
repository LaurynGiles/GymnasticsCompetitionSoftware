import React from "react";

const ScoreSubmissionBlock = ( {startScore, deductions, penalties} ) => {
  return (
                <div className="flex flex-col w-[221px] h-[140px] items-start justify-center gap-[10px] relative">
                  <div className="flex w-[221px] items-center px-[15px] py-0 relative flex-[0_0_auto]">
                    <div className="relative w-[147px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      Starting score
                    </div>
                    <div className="relative w-fit mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      {parseFloat(startScore).toFixed(3)}
                    </div>
                  </div>
                  <div className="flex w-[221px] items-center px-[15px] py-0 relative flex-[0_0_auto]">
                    <div className="relative w-[147px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      Deductions
                    </div>
                    <div className="relative w-fit mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      {parseFloat(deductions).toFixed(3)}
                    </div>
                  </div>
                  <div className="flex w-[221px] items-center px-[15px] py-0 relative flex-[0_0_auto]">
                    <div className="relative w-[147px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      Initial score
                    </div>
                    <div className="relative w-fit mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                    {parseFloat(startScore - deductions).toFixed(3)}
                    </div>
                  </div>
                  <div className="flex w-[221px] items-center px-[15px] py-0 relative flex-[0_0_auto]">
                    <div className="relative w-[147px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      Penalties
                    </div>
                    <div className="relative w-fit mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      {parseFloat(penalties).toFixed(3)}
                    </div>
                  </div>
                  <div className="flex w-[221px] items-center px-[15px] py-0 relative flex-[0_0_auto]">
                    <div className="relative w-[147px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                      Final score
                    </div>
                    <div className="relative w-fit mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                    {parseFloat(startScore - deductions - penalties).toFixed(3)}
                    </div>
                  </div>
                </div>
  );
};

export default ScoreSubmissionBlock;