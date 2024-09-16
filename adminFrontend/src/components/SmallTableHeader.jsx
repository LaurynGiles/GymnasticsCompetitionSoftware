import PropTypes from "prop-types";
import React from "react";

const SmallTableHeader = ({ text }) => {
  return (
    <div className="flex items-center justify-center w-[200px]">
      <div className="flex items-center justify-center w-full h-auto py-2 px-4 font-montserrat font-semibold text-prussian-blue text-xl md:text-2xl text-center">
        {text}
      </div>
    </div>
  );
};

SmallTableHeader.propTypes = {
  text: PropTypes.string,
};

export default SmallTableHeader;