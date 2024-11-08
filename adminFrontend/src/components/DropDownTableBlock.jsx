import PropTypes from "prop-types";
import React from "react";

const DropdownTableBlock = ({ value, onChange, options, title }) => {
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
      <select
        value={value}
        onChange={handleChange}
        className="w-full h-[50px] bg-bright-white border border-gray-300 rounded-lg font-montserrat font-medium text-prussian-blue text-base md:text-xl text-center"
      >
        <option value="" disabled></option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

DropdownTableBlock.propTypes = {
  value: PropTypes.string, // Assuming the selected value is a string
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired, // List of options
  title: PropTypes.string, // Title is optional
};

export default DropdownTableBlock;