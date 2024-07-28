import React from "react";

const SelectOptions = ({ allOptions, handleOptionClick, optionType }) => {

    const renderOption = (option) => {
        if (optionType === "Competition") {
            return `Competition ${option}`;
        } else {
            return option;
        }
    };

    return (
        <div className="absolute top-[100%] mt-2 w-[255px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
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