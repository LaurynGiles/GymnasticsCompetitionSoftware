import React from "react";
import PropTypes from "prop-types";

const LargeTableHeader = ({text}) => {
  return (
    <div className="flex items-center justify-center w-[300px]">
      <div className="relative w-full h-auto font-montserrat font-semibold text-prussian-blue text-lg md:text-xl text-center tracking-tight leading-normal">
        {text}
      </div>
    </div>
  );
};

LargeTableHeader.propTypes = {
    text: PropTypes.string,
  };

  
export default LargeTableHeader;