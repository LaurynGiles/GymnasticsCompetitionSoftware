import React from "react";

const AddButton = ({ onClick, isActive=true }) => {
  return (
    <button
      className={`all-[unset] box-border cursor-pointer ${isActive ? 'bg-prussian-blue hover:bg-prussian-blue-dark' : 'bg-gray-400 cursor-not-allowed'} flex items-center justify-center gap-2 px-14 py-1 rounded-full shadow-md text-white font-montserrat font-medium text-lg md:text-xl lg:text-4xl`}
      onClick={isActive ? onClick : null} // Prevent onClick when not active
      disabled={!isActive} // Disable button if not active
    >
      <div className="relative text-center">
        +
      </div>
    </button>
  );
};

export default AddButton;