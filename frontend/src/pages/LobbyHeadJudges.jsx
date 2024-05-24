import React from "react";
import NavigationBarDefault from "frontend/src/components/NavigationBarDefault";
import TickIcon from "../components/TickIcon";
import XIcon from "../components/XIcon";
import NextArrowIcon from "../components/NextArrowIcon";

export const StartCompetition = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="inline-flex flex-col h-[800px] items-center gap-[40px] relative">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} />
          <div className="relative w-[350px] h-[45px] bg-light-periwinkle rounded-[10px]">
            <p className="absolute w-[322px] h-[31px] top-[6px] left-[14px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
              District MAG Trials Levels 1-3
            </p>
          </div>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto] bg-bright-white">
            <div className="flex w-[400px] h-[24px] items-center justify-center gap-[10px] px-[40px] py-0 relative">
              <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                Accept join requests
              </div>
            </div>
            <div className="flex-col w-[344px] p-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
              <div className="w-[345px] ml-[-10.50px] mr-[-10.50px] flex items-center justify-center relative flex-[0_0_auto]">
                <div className="relative w-[278px] h-[38px] mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Annette Nel (526987)
                </div>
                <TickIcon />
              </div>
              <div className="w-[345px] ml-[-10.50px] mr-[-10.50px] flex items-center justify-center relative flex-[0_0_auto]">
                <div className="relative w-[278px] h-[38px] mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Peter Weibel (126858)
                </div>
                <TickIcon />
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto]">
            <div className="flex w-[400px] h-[24px] items-center justify-center gap-[10px] px-[40px] py-0 relative">
              <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                Judges at the table
              </div>
            </div>
            <div className="flex-col w-[344px] p-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
              <div className="w-[345px] ml-[-10.50px] mr-[-10.50px] flex items-center justify-center relative flex-[0_0_auto]">
                <div className="relative w-[278px] h-[38px] mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Lauryn Giles (549647)
                </div>
                <XIcon />
              </div>
              <div className="w-[345px] ml-[-10.50px] mr-[-10.50px] flex items-center justify-center relative flex-[0_0_auto]">
                <div className="relative w-[278px] h-[38px] mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Debbie Giles (656548)
                </div>
                <XIcon />
              </div>
            </div>
          </div>
          <div className="flex-col h-[245px] justify-end gap-[10px] px-[40px] py-[50px] relative inline-flex items-center">
            <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="relative w-[250px] h-[40px] bg-anti-flash-white rounded-[20px] shadow-[0px_4px_4px_#00000040]" />
              <div className="gap-[20px] absolute top-0 left-[39px] inline-flex items-center">
                <div className="relative w-[127.42px] h-[40px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Start judging
                </div>
                <NextArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};