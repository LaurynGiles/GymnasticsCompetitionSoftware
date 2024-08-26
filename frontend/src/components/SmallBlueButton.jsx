import React from "react";

const SmallBlueButton = ({ title, onClick }) => {
  return (
    <button
      className="bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer flex items-center justify-center gap-2 px-6 md:px-8 lg:px-10 py-4 rounded-full shadow-md text-white font-montserrat font-medium text-md md:text-lg lg:text-xl"
      onClick={onClick}
    >
      <div className="text-center">
        {title}
      </div>
    </button>
  );
};

export default SmallBlueButton;