import React from "react";
import PropTypes from "prop-types";

const LargeTableHeader = ({text}) => {
  return (
    <div className="flex items-center justify-center relative w-[300px]">
      <div className="relative w-full h-auto py-3 px-4 font-montserrat font-semibold text-prussian-blue text-xl md:text-2xl text-center tracking-tight leading-normal">
        {text}
      </div>
    </div>
  );
};

LargeTableHeader.propTypes = {
    text: PropTypes.string,
  };

  
export default LargeTableHeader;