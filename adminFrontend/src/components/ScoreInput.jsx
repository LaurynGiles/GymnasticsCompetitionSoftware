import PropTypes from "prop-types";
import React from "react";

const ScoreInput = ({ text = "00.00" }) => {
  return (
    <div className="relative w-[157px] h-[42px] bg-anti-flash-white">
      <div className="absolute w-[133px] h-[41px] top-0 left-3 [font-family:'Montserrat-Medium',Helvetica] font-medium text-prussian-blue text-[26px] text-center tracking-[0] leading-[normal]">
        {text}
      </div>
    </div>
  );
};

ScoreInput.propTypes = {
  text: PropTypes.string,
};

export default ScoreInput;