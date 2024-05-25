import React from "react";

const Header = ({text}) => {
    return (
        <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto] ml-[-31.00px] mr-[-31.00px]">
            <div className="relative w-[313px] mt-[3.00px] font-montserrat font-medium text-prussian-blue text-[21px] tracking-[0] leading-[normal]">
                {text}
            </div>
        </div>
    );
  };
  
  export default Header;