import React from "react";

const InputBox = ({ number, setNumber, hasError, title }) => {
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div
      className={`flex w-[30%] items-center gap-2 px-4 py-3 bg-bright-white rounded-lg ${
        hasError ? 'border-2 border-red-500' : ''
      }`}
    >
      <input
        type="text"
        value={number}
        onChange={handleChange}
        placeholder={title}
        className={`w-full bg-transparent font-montserrat font-medium text-prussian-blue text-xl outline-none ${
          hasError ? 'text-red-500' : ''
        }`}
      />
    </div>
  );
};

export default InputBox;