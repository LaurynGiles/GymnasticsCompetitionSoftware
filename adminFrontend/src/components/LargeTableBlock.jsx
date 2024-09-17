import PropTypes from "prop-types";
import React from "react";

const LargeTableBlock = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] relative">
      <div className="w-full font-montserrat font-medium text-prussian-blue text-base md:text-xl text-center">
        {text}
      </div>
    </div>
  );
};

LargeTableBlock.propTypes = {
  text: PropTypes.string,
};

export default LargeTableBlock;