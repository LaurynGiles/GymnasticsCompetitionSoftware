import PropTypes from "prop-types";
import React from "react";

const InputLabel = ({ text = "Competition name" }) => {
  return (
    <div className={`relative w-full md:w-1/3 lg:w-1/3`}>
      <div className="text-[#12263a] text-2xl font-medium font-montserrat tracking-[0] leading-[normal]">
        {text}
      </div>
    </div>
  );
};

InputLabel.propTypes = {
  text: PropTypes.string,
};

export default InputLabel;