import React from "react";

const ScoreBlock = ({ title, score }) => {
    return (
      <div className="relative w-[331px] h-[47px] flex items-center">
        <div className="w-[200px] flex items-center justify-end pr-[30px]">
          <div className="font-montserrat font-semibold text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
            {title}
          </div>
        </div>
        <div className="w-[122px] h-[46px] bg-bright-white rounded-[10px] flex items-center justify-center">
          <div className="font-montserrat font-semibold text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
            {parseFloat(score).toFixed(3)}
          </div>
        </div>
      </div>
    );
  };    

export default ScoreBlock;