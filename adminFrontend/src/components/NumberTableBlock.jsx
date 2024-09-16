import PropTypes from "prop-types";
import React from "react";

const NumberTableBlock = ({ value, onChange }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    // Allow empty input or valid numbers
    const parsedValue = newValue === "" ? null : parseInt(newValue, 10);
    onChange(isNaN(parsedValue) ? null : parsedValue);
  };

  return (
    <input
      type="text"
      value={value !== null ? value : ''}
      onChange={handleChange}
      className="w-[200px] py-2 px-4 bg-anti-flash-white border text-center border-gray-300 rounded-lg"
      placeholder="Enter number"
      inputMode="numeric" // Suggests numeric keyboard on mobile devices
      pattern="\d*" // Ensures only digits are accepted in HTML5
    />
  );
};

NumberTableBlock.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default NumberTableBlock;

