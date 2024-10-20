import React from "react";

const LeavePopup = ({ message, onYes, onNo }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white md:w-[60%] p-4 rounded shadow-lg flex flex-col items-center">
        <p className="text-prussian-blue font-montserrat font-semibold text-center text-base md:text-lg lg:text-xl">{message}</p>
        <div className="mt-2 flex gap-4">
          <button
            onClick={onYes}
            className="p-2 w-[70px] h-[40px] md:w-[100px] md:h-[60px] bg-prussian-blue text-white text-base md:text-lg lg:text-xl font-semibold font-montserrat rounded-[20px] md:rounded-[40px]"
          >
            Yes
          </button>
          <button
            onClick={onNo}
            className="p-2 w-[70px] h-[40px] md:w-[100px] md:h-[60px] bg-text text-white font-semibold text-base md:text-lg lg:text-xl font-montserrat rounded-[20px] md:rounded-[40px]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeavePopup;