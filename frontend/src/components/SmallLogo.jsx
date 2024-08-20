import React from "react";
import '../index.css';

const SmallLogo = () => {
  return (
    <div className="overflow-hidden flex flex-xol justify-center relative w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] bg-bright-white rounded-[360px]">
      <img className="absolute w-[100px] h-[100px] md:w-[40%] md:h-[40%] lg:w-[40%] lg:h-[40%] top-[40%] object-cover" 
          alt="Logo" 
          src="logo.png" 
          />
    </div>
  );
};


export default SmallLogo;