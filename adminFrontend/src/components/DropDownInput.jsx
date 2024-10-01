import PropTypes from "prop-types";
import React from "react";

const DropdownInput = ({ selectedOption, setSelectedOption, options, hasError }) => {

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className={`flex w-full max-w-[500px] items-center gap-2.5 px-4 py-2 bg-anti-flash-white rounded-lg shadow-sm ${hasError ? 'border-2 border-red-500' : ''}`}>
      <select
        value={selectedOption}
        onChange={handleChange}
        className={`w-full bg-transparent font-montserrat font-medium text-prussian-blue text-lg md:text-xl lg:text-2xl tracking-normal leading-normal outline-none ${hasError ? 'text-red-500' : ''}`}
      >
        <option value="" disabled>Select an option</option> {/* Optional placeholder */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

DropdownInput.propTypes = {
  selectedOption: PropTypes.string, // Holds the selected value
  setSelectedOption: PropTypes.func.isRequired, // Function to update the selected option
  options: PropTypes.arrayOf(PropTypes.string).isRequired, // List of options for the dropdown
  hasError: PropTypes.bool,
};

export default DropdownInput;
