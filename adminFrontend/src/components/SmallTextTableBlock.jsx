import PropTypes from "prop-types";
import React from "react";

const SmallTextTableBlock = ({ value, onChange, title }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue); // Call onChange directly with the new value
  };

  return (
    <div className="flex flex-col items-center justify-between w-[200px] relative overflow-x-auto">
      {/* Render title if provided */}
      {title && (
        <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg text-center mb-1">
          {title}
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full h-[50px] bg-bright-white border border-gray-300 rounded-lg font-montserrat font-medium text-prussian-blue text-base md:text-xl text-center"
        placeholder="Enter"
      />
    </div>
  );
};

SmallTextTableBlock.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string, // Title is optional
};

export default SmallTextTableBlock;