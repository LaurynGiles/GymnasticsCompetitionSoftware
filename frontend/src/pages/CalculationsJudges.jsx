import React from "react";
import BlueButton from "../components/BlueButton";
import NavigationBarDefault from "../components/NavigationBarDefault";
import EventInfoBlock from "../components/EventInfoBlock";
import DeductionButtonsGroup from "../components/DeductionButtonsGroup";
import DeductionBlock from "../components/DeductionBlock";

const CalculationsJudges = () => {
  return (
    <div className="bg-[#feffff] flex justify-center w-full h-screen">
      <div className="bg-bright-white overflow-hidden w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} />
        </div>
        <div className="flex flex-col w-full h-full items-center gap-[15px] overflow-y-auto pt-[75px] relative">
          {/* <NavigationBarDefault showBackIcon={false} showBookIcon={true}/> */}
          <EventInfoBlock apparatus={"Floor"} level={"3"} age={"07-09"} number={"56"} name={"Travis Giles"}/>
          <div className="inline-flex items-center justify-center gap-[15px] relative flex-[0_0_auto]">
            <DeductionButtonsGroup/>
            <DeductionBlock/>
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
            <BlueButton title='submit'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsJudges;