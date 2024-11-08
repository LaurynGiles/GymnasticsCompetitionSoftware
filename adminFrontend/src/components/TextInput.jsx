import PropTypes from "prop-types";
import React, { useState } from "react";

const TextInput = ({ text, setText, hasError }) => {

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={`flex w-full max-w-[500px] items-center gap-2.5 px-4 py-2 bg-anti-flash-white rounded-lg shadow-sm ${hasError ? 'border-2 border-red-500' : ''}`}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={"Enter"}
        className={`w-full bg-transparent font-montserrat font-medium text-prussian-blue text-lg md:text-xl lg:text-2xl tracking-normal leading-normal outline-none ${hasError ? 'text-red-500' : ''}`}
      />
    </div>
  );
};

TextInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool,
};

export default TextInput;