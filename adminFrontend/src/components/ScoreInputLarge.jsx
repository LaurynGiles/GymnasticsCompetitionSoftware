import PropTypes from "prop-types";
import React from "react";

const ScoreInputLarge = ({ value, onChange, title, hasError }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;

    // Allow the input of valid decimal points and empty string
    if (/^\d*\.?\d*$/.test(newValue) || newValue === "") {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    // Format the score to 3 decimal places on blur
    const parsedValue = parseFloat(value);
    const formattedValue = isNaN(parsedValue) ? "" : parsedValue.toFixed(3);
    onChange(formattedValue);
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
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-[162px] h-[50px] bg-bright-white text-prussian-blue text-center text-base md:text-xl border rounded-lg ${
          hasError ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="0.000"
      />
    </div>
  );
};

ScoreInputLarge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Changed to string for intermediate states
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string, // Title is optional
  hasError: PropTypes.bool, // Error handling
};

export default ScoreInputLarge;