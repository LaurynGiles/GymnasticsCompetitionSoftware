import React from "react";
import NavigationBar from "../components/NavigationBar";
// import { Vector } from "./Vector";

const HomeJudges = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="inline-flex flex-col h-[800px] items-center gap-[40px] relative">
          <NavigationBar className="!relative !self-stretch !w-full !flex-[0_0_auto]" />
          <div className="relative w-[350px] h-[45px] bg-light-periwinkle rounded-[10px]">
            <p className="absolute w-[322px] h-[31px] top-[6px] left-[14px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
              District MAG Trials Levels 1-3
            </p>
          </div>
          <div className="flex flex-col w-[400px] items-center gap-[15px] px-[31px] py-0 relative flex-[0_0_auto]">
            <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto] ml-[-31.00px] mr-[-31.00px]">
              <div className="relative w-[313px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                Join a judging table
              </div>
            </div>
            <div className="inline-flex flex-col items-center justify-center gap-[40px] px-[70px] py-[50px] relative flex-[0_0_auto] bg-anti-flash-white">
              <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                <div className="relative w-[138px] h-[23px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Session
                </div>
                <div className="inline-flex items-center px-[15px] py-0 relative flex-[0_0_auto] bg-bright-white rounded-[20px] overflow-hidden border-2 border-solid border-[#6279b8]">
                  <div className="relative w-[148px] h-[34px] mt-[-2.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                    Session 1
                  </div>
                  <Vector className="!relative !w-[13px] !h-[10px]" />
                </div>
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                <div className="relative w-[165px] h-[23px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Level : Age group
                </div>
                <div className="inline-flex items-center px-[15px] py-0 relative flex-[0_0_auto] bg-bright-white rounded-[20px] overflow-hidden border-2 border-solid border-[#6279b8]">
                  <p className="relative w-[148px] h-[34px] mt-[-2.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                    Lvl 1 : 7-8 yrs
                  </p>
                  <Vector className="!relative !w-[13px] !h-[10px]" />
                </div>
              </div>
              <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                <div className="relative w-[138px] h-[23px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                  Apparatus
                </div>
                <div className="inline-flex items-center px-[15px] py-0 relative flex-[0_0_auto] bg-bright-white rounded-[20px] overflow-hidden border-2 border-solid border-[#6279b8]">
                  <div className="relative w-[148px] h-[34px] mt-[-2.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
                    Vault
                  </div>
                  <Vector className="!relative !w-[13px] !h-[10px]" />
                </div>
              </div>
              <button className="all-[unset] box-border flex w-[83px] items-center justify-center gap-[10px] px-[20px] py-[10px] relative flex-[0_0_auto] bg-prussian-blue rounded-[20px] shadow-[0px_4px_4px_#00000040]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-bright-white text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Join
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJudges;