import PropTypes from "prop-types";
import React from "react";
import ScoreInput from "../components/ScoreInput";

const ScoreRange = ({ className, scoreInputText = "0.00", scoreInputText1 = "33.99" }) => {
  return (
    <div className={`inline-flex items-end gap-6 relative ${className}`}>
      <ScoreInput text={scoreInputText} />
      <div className="relative w-[72px] h-10 [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-xl text-center tracking-[0] leading-[normal]">
        to
      </div>
      <ScoreInput text={scoreInputText1} />
    </div>
  );
};

ScoreRange.propTypes = {
  scoreInputText: PropTypes.string,
  scoreInputText1: PropTypes.string,
};

export default ScoreRange;