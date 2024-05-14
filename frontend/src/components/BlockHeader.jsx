import React from "react";

const BlockHeader = ({text}) => {
    return (
        <div className="relative w-[350px] h-[45px] bg-light-periwinkle rounded-[10px]">
            <p className="absolute w-[320px] h-[31px] top-[10px] left-[14px] font-montserrat font-medium text-prussian-blue text-[22px] text-center tracking-[0] leading-[normal]">
              {text}
            </p>
        </div>
    );
  };
  
  export default BlockHeader;