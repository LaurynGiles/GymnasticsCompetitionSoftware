import React from "react";
const ScoreBlock = ({ title, score }) => {
  return (
    <div className="relative flex flex-col items-center gap-2 md:gap-4 p-4 bg-light-periwinkle rounded-lg">
      <div className="flex-1 flex items-center justify-end">
        <div className="font-montserrat font-semibold text-prussian-blue text-lg md:text-xl leading-normal">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-center bg-bright-white rounded-lg py-4 px-16 md:py-6 md:px-24">
        <div className="font-montserrat font-semibold text-prussian-blue text-lg md:text-2xl text-center leading-normal">
          {parseFloat(score).toFixed(3)}
        </div>
      </div>
    </div>
  );
}; 

export default ScoreBlock;