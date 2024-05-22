import React from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import EventInfoBlock from "../components/EventInfoBlock";
import DeductionButtonsGroup from "../components/DeductionButtonsGroup";
import DeductionBlock from "../components/DeductionBlock";
import TotalDeductionsBlock from "../components/TotalDeductionsBlock";

const CalculationsJudges = () => {

  const values = ["0.1", "0.1", "0.3", "0.1", "0.5"];

  return (
    <div className="bg-[#feffff] flex justify-center w-full h-screen">
      <div className="bg-bright-white overflow-hidden w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} />
        </div>
        <div className="flex flex-col w-full h-full items-center gap-[40px] overflow-y-auto pt-[75px] relative">
          {/* <NavigationBarDefault showBackIcon={false} showBookIcon={true}/> */}
          <EventInfoBlock apparatus={"Floor"} level={"3"} age={"07-09"} number={"56"} name={"Travis Giles"}/>
          <div className="inline-flex items-center justify-center gap-[15px] relative flex-[0_0_auto]">
            <DeductionButtonsGroup/>
            <DeductionBlock values={values}/>
          </div>
            <TotalDeductionsBlock total={"2.1"}/>
        </div>
      </div>
    </div>
  );
};

export default CalculationsJudges;