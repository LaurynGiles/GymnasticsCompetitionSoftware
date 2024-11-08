import PropTypes from "prop-types";
import React from "react";

const LargeTableBlock = ({ text, title }) => {
  return (
    <div className="flex flex-col items-center justify-between w-[300px] relative">
      {/* Render title if provided */}
      {title && (
        <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg text-center">
          {title}
        </div>
      )}
      <div className="w-full h-[50px] flex items-center justify-center font-montserrat font-medium text-prussian-blue text-base md:text-xl text-center">
        {text}
      </div>
    </div>
  );
};

LargeTableBlock.propTypes = {
  text: PropTypes.string.isRequired, // Make text required
  title: PropTypes.string, // Title is optional
};

export default LargeTableBlock;
