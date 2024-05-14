import React from "react";
import { LargeBackButton } from "./LargeBackButton";
import NavigationBarDefault from "../components/NavigationBarDefault";

export const CalculationPage = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="inline-flex flex-col items-center gap-[15px] relative">
          <NavigationBarDefault showBackIcon={false}/>
          <div className="flex flex-col w-[365.35px] items-center gap-[3px] px-[3px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle rounded-[10px]">
            <div className="flex w-[328px] items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <p className="relative w-[319px] mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
                Floor event - Level 3
              </p>
            </div>
            <div className="flex w-[328px] items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="relative w-[319px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                07-09 yrs
              </div>
            </div>
            <div className="flex w-[328px] items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="relative w-[319px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                [56] Travis Giles
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-center justify-center gap-[15px] px-[20px] py-[10px] relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-[20px] relative flex-[0_0_auto]">
              <div className="flex w-[170px] h-[130px] items-center justify-center gap-[10px] px-[60px] py-[50px] relative bg-notification-box rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
                <div className="relative w-fit mt-[-7.50px] mb-[-5.50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[35px] text-center tracking-[0] leading-[normal]">
                  0.1
                </div>
              </div>
              <div className="flex w-[170px] h-[130px] items-center justify-center gap-[10px] px-[60px] py-[50px] relative bg-notification-box rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
                <div className="relative w-fit mt-[-7.50px] mb-[-5.50px] ml-[-1.50px] mr-[-1.50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[35px] text-center tracking-[0] leading-[normal]">
                  0.5
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-[20px] relative flex-[0_0_auto]">
              <div className="flex w-[170px] h-[130px] items-center justify-center gap-[10px] px-[60px] py-[50px] relative bg-notification-box rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
                <div className="relative w-fit mt-[-7.50px] mb-[-5.50px] ml-[-1.50px] mr-[-1.50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[35px] text-center tracking-[0] leading-[normal]">
                  0.3
                </div>
              </div>
              <div className="flex w-[170px] h-[130px] items-center justify-center gap-[10px] px-[60px] py-[50px] relative bg-notification-box rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
                <div className="relative w-fit mt-[-7.50px] mb-[-5.50px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[35px] text-center tracking-[0] leading-[normal]">
                  1.0
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <LargeBackButton className="!relative !w-[188px] !h-[78px] !mb-[-8.00px] !ml-[-4.00px] !mr-[-4.00px]" />
            </div>
          </div>
          <div className="inline-flex flex-col items-center justify-center gap-[8px] px-[16px] py-[10px] relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-[10px] px-[22px] py-[16px] relative flex-[0_0_auto] bg-anti-flash-white">
              <p className="relative w-[321px] mt-[-1.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal text-prussian-blue text-[22px] tracking-[0] leading-[normal]">
                0.1 + 0.1 + 0.3 + 0.3 + 0.5 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.3
              </p>
            </div>
          </div>
          <div className="flex w-[365px] items-center justify-center gap-[40px] p-[10px] relative flex-[0_0_auto] bg-light-periwinkle">
            <div className="inline-flex items-center justify-center relative flex-[0_0_auto]">
              <div className="relative w-[100px] h-[47px] mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
                Total:
              </div>
              <div className="relative w-[69px] h-[47px] mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-prussian-blue text-[25px] tracking-[0] leading-[normal]">
                2.1
              </div>
            </div>
            <button className="all-[unset] box-border flex w-[100px] items-center justify-center gap-[10px] px-[20px] py-[10px] relative bg-prussian-blue rounded-[20px] shadow-[0px_4px_4px_#00000040]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-bright-white text-[16px] text-center tracking-[0] leading-[normal]">
                Submit
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};