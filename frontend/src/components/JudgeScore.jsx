import React from "react";
import ArrowIcon from "./ArrowIcon";

const JudgeScore = ({ name, deduction, total, onUpdateAnalysis, rotation }) => {
    return (
        <div className="flex flex-col w-full items-center justify-center gap-2 p-2 md:p-4 bg-light-periwinkle rounded-lg">
          <div className="flex w-full items-center gap-2">
            <div className="flex-1 text-center font-montserrat font-medium text-prussian-blue text-base md:text-lg lg:text-xl">
              {name}
            </div>
            <div className="flex-1 text-center font-montserrat font-medium text-prussian-blue text-base md:text-lg lg:text-xl">
              {deduction}
            </div>
            <div className="flex-1 text-center font-montserrat font-medium text-prussian-blue text-base md:text-lg lg:text-xl">
              {total}
            </div>
              <ArrowIcon rotation={rotation} onClick={onUpdateAnalysis} />
          </div>
        </div>
      );
    };

export default JudgeScore;



