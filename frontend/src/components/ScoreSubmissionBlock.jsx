import React from "react";

const ScoreSubmissionBlock = ( {startScore, deductions, penalties} ) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="w-full grid grid-cols-2 gap-2 text-prussian-blue font-montserrat font-medium text-base">
        <div className="text-left w-full">Starting score</div>
        <div className="text-right">{parseFloat(startScore).toFixed(3)}</div>
      </div>
      <div className="w-full grid grid-cols-2 gap-2 text-prussian-blue font-montserrat font-medium text-base">
        <div className="text-left w-full">Deductions</div>
        <div className="text-right">{parseFloat(deductions).toFixed(3)}</div>
      </div>
      <div className="w-full grid grid-cols-2 gap-2 text-prussian-blue font-montserrat font-medium text-base">
        <div className="text-left">Initial score</div>
        <div className="text-right">{parseFloat(startScore - deductions).toFixed(3)}</div>
      </div>
      <div className="w-full grid grid-cols-2 gap-2 text-prussian-blue font-montserrat font-medium text-base">
        <div className="text-left">Penalties</div>
        <div className="text-right">{parseFloat(penalties).toFixed(3)}</div>
      </div>
      <div className="w-full grid grid-cols-2 gap-2 text-prussian-blue font-montserrat font-medium text-base">
        <div className="text-left">Final score</div>
        <div className="text-right">{parseFloat(startScore - deductions - penalties).toFixed(3)}</div>
      </div>
    </div>
  ); 
};

export default ScoreSubmissionBlock;