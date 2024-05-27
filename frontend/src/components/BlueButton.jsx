import React from "react";

const BlueButton = ({title}) => {
    return (
      <button className="all-[unset] box-border bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer flex w-[100px] items-center justify-center gap-[10px] px-[20px] py-[10px] relative rounded-[20px] shadow-[0px_4px_4px_#00000040]">
        <div className="relative w-fit mt-[1.00px] font-montserrat font-medium text-bright-white text-[20px] text-center tracking-[0] leading-[normal]">
          {title}
        </div>
      </button>
    );
};

export default BlueButton;