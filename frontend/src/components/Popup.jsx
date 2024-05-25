import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
        <p className="text-prussian-blue font-montserrat font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 p-2 bg-prussian-blue text-white font-semibold font-montserrat rounded-[20px]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;