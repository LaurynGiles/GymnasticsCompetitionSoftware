import React from "react";

const AddButton = ({ title, onClick }) => {
  return (
    <button
      className="all-[unset] box-border bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer flex items-center justify-center gap-2 px-6 py-4 md:px-8 md:py-3 lg:px-16 lg:py-2 rounded-full shadow-md text-white font-montserrat font-medium text-lg md:text-xl lg:text-4xl"
      onClick={onClick}
    >
      <div className="relative text-center">
        {title}
      </div>
    </button>
  );
};

export default AddButton;