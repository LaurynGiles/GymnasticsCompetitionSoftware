import PropTypes from "prop-types";
import React from "react";

const RadioButtonOption = ({ className, text = "MAG" }) => {
  return (
    <div className={`inline-flex items-center gap-5 px-2.5 py-0 relative bg-anti-flash-white ${className}`}>
      <img className="relative w-6 h-6" alt="Empty radio button" />
      <div className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#12263a] text-2xl tracking-[0] leading-[normal]">
        {text}
      </div>
    </div>
  );
};

RadioButtonOption.propTypes = {
  text: PropTypes.string,
};

export default RadioButtonOption;