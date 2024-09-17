import PropTypes from "prop-types";
import React from "react";

const SmallTextTableBlock = ({ value, onChange }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue); // Call onChange directly with the new value
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-[200px] relative overflow-x-auto">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full py-2 px-4 bg-bright-white border border-gray-300 rounded-lg font-montserrat font-medium text-prussian-blue text-base md:text-xl text-center"
        placeholder="Enter"
      />
    </div>
  );
};

SmallTextTableBlock.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SmallTextTableBlock;