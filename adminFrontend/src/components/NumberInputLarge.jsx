import PropTypes from "prop-types";
import React from "react";

const NumberInputLarge = ({ value, onChange, title, hasError }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    const parsedValue = newValue === "" ? null : parseInt(newValue, 10);
    onChange(isNaN(parsedValue) ? null : parsedValue);
  };

  return (
    <div className="flex flex-col justify-between items-center">
      {/* Render title if provided */}
      {title && (
        <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg text-center">
          {title}
        </div>
      )}
      <input
        type="text"
        value={value !== null ? value : ''}
        onChange={handleChange}
        className={`w-[200px] h-[50px] bg-bright-white text-prussian-blue text-center text-base md:text-xl border rounded-lg ${
          hasError ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="0"
        inputMode="numeric" // Suggests numeric keyboard on mobile devices
        pattern="\d*" // Ensures only digits are accepted in HTML5
      />
    </div>
  );
};

NumberInputLarge.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string, // Title is optional
  error: PropTypes.bool, // Add error as a prop
};

export default NumberInputLarge;
