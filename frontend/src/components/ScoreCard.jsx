import React from "react";
import ScoreBlock from "../components/ScoreBlock";

const ScoreCard = () => {
  return (
    <div className="inline-flex flex-col items-center gap-[25px] p-[20px] relative bg-light-periwinkle">
      <div className="relative w-[150px] h-[27px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
        SCORE CARD
      </div>
      <ScoreBlock title="Starting score:" score={"9.1"}/>
      <ScoreBlock title="Your deductions:" score={"2.1"}/>
      <ScoreBlock title="Initial score:" score={"7.0"}/>
      <ScoreBlock title="Penalty deductions:" score={"0.0"}/>
      <ScoreBlock title="Final score:" score={"7.0"}/>
    </div>
  );
};

export default ScoreCard;