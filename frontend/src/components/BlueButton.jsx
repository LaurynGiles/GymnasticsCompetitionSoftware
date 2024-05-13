import React from "react";
import '../index.css';

const BlueButton = () => {
    return (
      <button className="all-[unset] box-border bg-prussian-blue hover:bg-prussian-blue-dark flex w-[109px] items-center justify-center gap-[10px] px-[20px] py-[10px] relative rounded-[20px] shadow-[0px_4px_4px_#00000040]">
        <div className="relative w-fit mt-[-1.00px] font-medium text-bright-white text-[24px] text-center tracking-[0] leading-[normal]">
          Login
        </div>
      </button>
    );
};

export default BlueButton;