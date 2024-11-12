import React from "react";

const LargeHeader = ({ text }) => {
    return (
      <div className="flex items-center justify-start w-[95%] md:w-[75%] lg:w-[50%] px-4 py-2">
        <div className="font-montserrat font-medium text-prussian-blue text-center text-xl md:text-2xl lg:text-3xl tracking-wide leading-normal">
          {text}
        </div>
      </div>
    );
  };
  
  export default LargeHeader;