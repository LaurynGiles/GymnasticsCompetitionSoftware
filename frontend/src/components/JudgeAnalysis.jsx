import React from "react";

const JudgeAnalysis = ({ deductions }) => {

  const formattedDeductions = Array.isArray(deductions) ? deductions.join(' + ') : deductions;

  return (
    <div className="flex flex-col w-full gap-4 p-2 bg-anti-flash-white items-center">
      <div className="flex w-full px-4 py-0">
        <p className="w-full text-prussian-blue text-base md:text-lg lg:text-xl font-montserrat font-medium">
          {formattedDeductions}
        </p>
      </div>
    </div>
  );
};

export default JudgeAnalysis;