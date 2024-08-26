import React from "react";

const BlueButton = ({ title, onClick }) => {
  return (
    <button
      className="all-[unset] box-border bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer flex items-center justify-center gap-2 px-4 py-4 md:px-8 md:py-3 lg:px-16 lg:py-4 rounded-full shadow-md text-white font-montserrat font-medium text-base md:text-lg lg:text-xl"
      onClick={onClick}
    >
      <div className="relative text-center">
        {title}
      </div>
    </button>
  );
};

export default BlueButton;