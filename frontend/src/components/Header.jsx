import React from "react";

const Header = ({ text }) => {
    return (
      <div className="flex items-center justify-start w-[95%] md:w-[75%] lg:w-[50%] px-4 py-2">
        <div className="font-montserrat font-medium text-prussian-blue text-center text-lg md:text-xl lg:text-2xl tracking-wide leading-normal">
          {text}
        </div>
      </div>
    );
  };
  
  export default Header;