import React from "react";
import '../index.css';

const SmallLogo = () => {
  return (
    <div className="mt-[-185px] overflow-hidden flex flex-xol justify-center relative w-full h-[175%] bg-bright-white rounded-[80%]">
      <img className="mt-[35px] absolute w-[175px] h-[175px] md:w-[200px] md:h-[200px] top-[40%] object-cover" 
          alt="Logo" 
          src="logo.png" 
          />
    </div>
  );
};


export default SmallLogo;