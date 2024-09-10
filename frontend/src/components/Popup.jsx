import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
        <p className="text-prussian-blue font-montserrat font-semibold text-center text-base md:text-lg lg:text-xl">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 p-2 w-[70px] h-[40px] md:w-[100px] md:h-[60px] bg-prussian-blue text-white text-base md:text-lg lg:text-xl font-semibold font-montserrat rounded-[20px] md:rounded-[40px]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;