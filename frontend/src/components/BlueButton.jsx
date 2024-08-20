import React from "react";

const BlueButton = ({title, onClick}) => {
    return (
      <button className="all-[unset] box-border bg-prussian-blue hover:bg-prussian-blue-dark cursor-pointer flex w-[120px] items-center justify-center gap-[px] px-[20px] py-[10px] relative rounded-[20px] shadow-[0px_4px_4px_#00000040]"
              onClick={onClick} >
        <div className="relative w-fit mt-[1.00px] font-montserrat font-medium text-bright-white text-[20px] text-center tracking-[0] leading-[normal]">
          {title}
        </div>
      </button>
    );
};

export default BlueButton;