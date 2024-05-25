import React, {useState, useEffect} from "react";
import BlueButton from "../components/BlueButton";
import EventInfoBlock from "../components/EventInfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreBlock from "../components/ScoreBlock";
import SelectBox from "../components/SelectBox";
import Header from "../components/Header";
import ArrowIcon from "../components/ArrowIcon";

const SubmissionHeadJudges = () => {
  const [startScore, setStartScore] = useState("0.000");
  const [penalty, setPenalty] = useState("0.000");

  useEffect(() => {
    setStartScore(localStorage.getItem("startscore"));
    setPenalty(localStorage.getItem("penalty"));
  }, []);

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} />
        </div>
        <div className="inline-flex flex-col w-full h-full items-center overflow-y-auto pt-[75px] gap-[30px] relative overflow-hidden">
          <EventInfoBlock />
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto]">
            <Header text={"Starting score and Penalties"}/>
            <div className="inline-flex flex-col items-center gap-[19px] px-[20px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle">
              <ScoreBlock title={"Starting score"} score={startScore}/>
              <ScoreBlock title={"Penalty deductions"} score={penalty}/>
            </div>
          </div>
          <div className="inline-flex flex-col items-center gap-[10px] px-0 py-[10px] relative flex-[0_0_auto]">
            <Header text={"Execution scores"} />
            <div className="w-[360px] flex items-center relative flex-[0_0_auto]">
              <div className="relative w-[150px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Judge
              </div>
              <div className="relative w-[106px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Deduction
              </div>
              <div className="relative w-[78px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Score
              </div>
            </div>
            <div className="flex flex-col w-[374px] items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-light-periwinkle rounded-[10px]">
              <div className="flex w-[360px] items-center relative flex-[0_0_auto] ml-[-3.00px] mr-[-3.00px]">
                <div className="relative w-[150px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[16px] text-center tracking-[0] leading-[normal]">
                  Debbie Giles
                </div>
                <div className="w-[106px] h-[26px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-center relative mt-[-1.00px] text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                  2.1
                </div>
                <div className="w-[80px] h-[26px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-center relative mt-[-1.00px] text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                  7.0
                </div>
                <ArrowIcon />
              </div>
            </div>
            <div className="flex-col w-[380px] gap-[15px] p-[10px] bg-anti-flash-white flex items-center relative flex-[0_0_auto]">
              <div className="flex w-[360px] items-center px-[15px] py-0 relative flex-[0_0_auto]">
                <p className="w-[333px] mr-[-3.00px] [font-family:'Montserrat-Regular',Helvetica] font-normal relative mt-[-1.00px] text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                  0.1 + 0.1 + 0.3 + 0.3 + 0.5 + 0.1 + 0.2 + 0.1 + 0.1 + 0.1 + 0.3.
                </p>
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