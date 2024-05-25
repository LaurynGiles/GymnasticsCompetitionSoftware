import React from "react";
import BlueButton from "../components/BlueButton";
import EventInfoBlock from "../components/EventInfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreBlock from "../components/ScoreBlock";
import SelectBox from "../components/SelectBox";

const SubmissionHeadJudges = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="inline-flex flex-col h-[800px] items-center gap-[30px] relative overflow-hidden">
          <NavigationBarDefault />
          <EventInfoBlock />
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto]">
            <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto]">
              <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                Starting score and Penalties
              </div>
            </div>
            <div className="inline-flex flex-col items-center gap-[19px] px-[20px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle">
              <ScoreBlock />
              <ScoreBlock />
            </div>
          </div>
          <div className="inline-flex flex-col items-center gap-[10px] px-0 py-[10px] relative flex-[0_0_auto]">
            <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto]">
              <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                Execution scores
              </div>
            </div>
            <div className="flex w-[360px] items-center relative flex-[0_0_auto]">
              <div className="relative w-[170px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Judge
              </div>
              <div className="relative w-[111px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Deduction
              </div>
              <div className="relative w-[78px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Score
              </div>
            </div>
            <div className="flex flex-col w-[374px] items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-anti-flash-white">
              <div className="flex w-[360px] items-center relative flex-[0_0_auto] ml-[-3.00px] mr-[-3.00px]">
                <div className="relative w-[170px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  Debbie Giles
                </div>
                <div className="w-[111px] relative h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  2.1
                </div>
                <div className="w-[78px] relative h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  7.0
                </div>
              </div>
              <div className="flex w-[360px] items-center relative flex-[0_0_auto] ml-[-3.00px] mr-[-3.00px]">
                <div className="relative w-[170px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  Annette Nel
                </div>
                <div className="relative w-[111px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  2.2
                </div>
                <div className="relative w-[78px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  6.9
                </div>
              </div>
              <div className="flex w-[360px] items-center relative flex-[0_0_auto] ml-[-3.00px] mr-[-3.00px]">
                <div className="relative w-[170px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  Peter Weibel
                </div>
                <div className="relative w-[111px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  2.4
                </div>
                <div className="relative w-[78px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  6.7
                </div>
              </div>
              <div className="flex w-[360px] items-center relative flex-[0_0_auto] ml-[-3.00px] mr-[-3.00px]">
                <div className="relative w-[170px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  Lauryn Giles
                </div>
                <div className="relative w-[111px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  2.0
                </div>
                <div className="relative w-[78px] h-[26px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  7.1
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
            <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto]">
              <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                Request re-submission
              </div>
            </div>
            <div className="inline-flex flex-col items-center justify-center gap-[10px] px-[30px] py-[10px] relative flex-[0_0_auto] bg-anti-flash-white">
              <div className="inline-flex items-start justify-center gap-[30px] relative flex-[0_0_auto]">
                <SelectBox />
                <BlueButton title="Send" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionHeadJudges