import React from "react";
import '../index.css';

const SmallLogo = () => {
  return (
    <div className="relative w-[446px] h-[450px] bg-bright-white rounded-[360px]">
      <img className="absolute w-[220px] h-[220px] top-[189px] left-[113px] object-cover" alt="Logo" src="logo.png" />
    </div>
  );
};

export default SmallLogo;