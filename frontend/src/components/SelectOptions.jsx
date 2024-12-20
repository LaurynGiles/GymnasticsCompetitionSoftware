import React from "react";

const SelectOptions = ({ allOptions, handleOptionClick, optionType }) => {
  if (allOptions.length === 0) {
    return null;
  }

  const renderOption = (option) => {
    if (optionType === "Competition") {
      const position = allOptions.indexOf(option);
      const letter = String.fromCharCode(65 + position);  // Convert position to letter (A=65 in ASCII)
      return `Competition ${letter}`;
    } else {
      return option;
    }
  };

  return (
    <div className="absolute top-[100%] mt-2 w-[255px] bg-white rounded-lg z-10">
      <ul className="flex flex-col">
        {allOptions.map((option, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleOptionClick(option)}
          >
            {renderOption(option)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectOptions;