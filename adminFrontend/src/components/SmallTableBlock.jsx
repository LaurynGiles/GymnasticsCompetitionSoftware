import PropTypes from "prop-types";
import React from "react";

const SmallTableBlock = ({ text, title }) => {
  return (
    <div className="flex flex-col items-center w-[200px] justify-between gap-2 relative">
      {/* Render title if provided */}
      {title && (
        <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg text-center mb-1">
          {title}
        </div>
      )}
      <div className="flex items-center justify-center w-full h-[50px] font-montserrat font-medium text-prussian-blue text-base md:text-xl text-center">
        {text}
      </div>
    </div>
  );
};

SmallTableBlock.propTypes = {
  text: PropTypes.string.isRequired, // Make text required
  title: PropTypes.string, // Title is optional
};

export default SmallTableBlock;


