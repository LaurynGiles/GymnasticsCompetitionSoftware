import PropTypes from "prop-types";
import React, { useState } from "react";

const ScoreInput = ({ text, setText, hasError = false }) => {

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    // Format the score to 3 decimal places on blur
    const formattedValue = parseFloat(text).toFixed(3);
    console.log(formattedValue);
    setText(isNaN(formattedValue) ? "" : formattedValue);
  };

  return (
    <div className={`flex flex-col items-center gap-2 w-full max-w-[300px] px-4 py-2 bg-anti-flash-white rounded-lg shadow-sm ${hasError ? 'border-2 border-red-500' : ''}`}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0.000"
        className={`w-full bg-transparent font-montserrat font-medium text-prussian-blue text-lg md:text-xl lg:text-2xl text-center p-2 rounded-lg ${hasError ? 'text-red-500' : ''}`}
      />
    </div>
  );
};

ScoreInput.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
};

export default ScoreInput;