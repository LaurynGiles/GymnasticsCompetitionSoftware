import React from "react";

const AddButton = ({ onClick }) => {
  return (
    <button
      className="all-[unset] box-border bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer flex items-center justify-center gap-2 px-14 py-1 rounded-full shadow-md text-white font-montserrat font-medium text-lg md:text-xl lg:text-4xl"
      onClick={onClick}
    >
      <div className="relative text-center">
        +
      </div>
    </button>
  );
};

export default AddButton;