import PropTypes from "prop-types";
import React from "react";

const TinyTableHeader = ({ text }) => {
  return (
    <div className="flex items-center justify-center w-[100px]">
      <div className="flex items-center justify-center w-full font-montserrat font-semibold text-prussian-blue text-xl md:text-2xl text-center">
        {text}
      </div>
    </div>
  );
};

TinyTableHeader.propTypes = {
  text: PropTypes.string,
};

export default TinyTableHeader;