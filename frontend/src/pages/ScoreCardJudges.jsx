import React, {useState} from "react";
import BlueButton from "../components/BlueButton";
import EventInfoBlock from "../components/EventInfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";

const ScoreCardJudges = () => {

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white overflow-hidden w-[400px] h-[800px]">
        <div className="flex flex-col w-[401px] items-center gap-[25px] relative">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false}/>
          <EventInfoBlock apparatus={"Floor"} level={"3"} age={"07-09"} number={"56"} name={"Travis Giles"}/>
          <div className="inline-flex flex-col items-center gap-[25px] p-[20px] relative flex-[0_0_auto] bg-light-periwinkle">
            <div className="relative w-[150px] h-[27px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
              SCORE CARD
            </div>
            <div className="relative w-[331px] h-[47px]">
              <div className="inline-flex items-center justify-center gap-[10px] absolute top-[14px] left-0">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[16px] text-right tracking-[0] leading-[normal]">
                  Starting score:
                </div>
              </div>
              <div className="absolute w-[122px] h-[46px] top-px left-[200px] bg-bright-white rounded-[10px]">
                <div className="absolute w-[121px] h-[36px] top-[4px] left-px [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  9.1
                </div>
              </div>
            </div>
            <div className="relative w-[331px] h-[47px]">
              <div className="inline-flex items-center justify-center gap-[10px] absolute top-[14px] left-0">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[16px] text-right tracking-[0] leading-[normal]">
                  Your deductions:
                </div>
              </div>
              <div className="absolute w-[122px] h-[46px] top-px left-[200px] bg-bright-white rounded-[10px]">
                <div className="absolute w-[121px] h-[36px] top-[4px] left-px [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  2.1
                </div>
              </div>
            </div>
            <div className="relative w-[331px] h-[47px]">
              <div className="inline-flex items-center justify-center gap-[10px] absolute top-[14px] left-0">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[16px] text-right tracking-[0] leading-[normal]">
                  Initial score:
                </div>
              </div>
              <div className="absolute w-[122px] h-[46px] top-px left-[200px] bg-bright-white rounded-[10px]">
                <div className="absolute w-[121px] h-[36px] top-[4px] left-px [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  7.0
                </div>
              </div>
            </div>
            <div className="relative w-[331px] h-[47px]">
              <div className="inline-flex items-center justify-center gap-[10px] absolute top-[14px] left-0">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[16px] text-right tracking-[0] leading-[normal]">
                  Penalty deductions:
                </div>
              </div>
              <div className="absolute w-[122px] h-[46px] top-px left-[200px] bg-bright-white rounded-[10px]">
                <div className="absolute w-[121px] h-[36px] top-[4px] left-px [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  0.0
                </div>
              </div>
            </div>
            <div className="relative w-[331px] h-[47px]">
              <div className="inline-flex items-center justify-center gap-[10px] absolute top-[14px] left-0">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[16px] text-right tracking-[0] leading-[normal]">
                  Final score:
                </div>
              </div>
              <div className="absolute w-[122px] h-[46px] top-px left-[200px] bg-bright-white rounded-[10px]">
                <div className="absolute w-[121px] h-[36px] top-[4px] left-px [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  7.0
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[324px] items-center gap-[10px] px-0 py-[5px] relative flex-[0_0_auto] bg-notification-box rounded-[10px]">
            <p className="relative w-[324px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
              Waiting for head judge to accept the request
            </p>
          </div>
          <BlueButton title="Request resubmission" />
        </div>
      </div>
    </div>
  );
};

export default ScoreCardJudges;