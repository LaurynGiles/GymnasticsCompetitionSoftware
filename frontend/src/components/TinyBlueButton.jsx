import React from "react";

const TinyBlueButton = ({title}) => {
    return (
        <button className="all-[unset] box-border flex w-[70px] items-center justify-center gap-2.5 px-5 py-2.5 relative mr-[-3.61px] bg-prussian-blue rounded-[20px] shadow-[0px_4px_4px_#00000040]">
            <div className="relative w-fit mt-[3.00px] font-montserrat font-medium text-bright-white text-center tracking-[0] leading-[normal]">
            {title}
            </div>
        </button>
    );
};

export default TinyBlueButton;