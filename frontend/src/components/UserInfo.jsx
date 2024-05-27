import React from "react";

const UserInfo = ({ number, name, email, license}) => {
    return (
        <div className="inline-flex flex-col items-end gap-[15px] px-[10px] py-[20px] relative flex-[0_0_auto] bg-light-periwinkle">
        <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
          <div className="relative w-[132px] h-[24px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
            GSA number:
          </div>
          <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
            <div className="relative w-[161px] mt-[-1.00px] font-montserrat font-medium text-black text-[18px] tracking-[0] leading-[normal]">
              {number}
            </div>
          </div>
        </div>
        <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
          <div className="relative w-[132px] h-[24px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
            Name:
          </div>
          <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
            <div className="relative w-[161px] mt-[-1.00px] font-montserrat font-medium text-black text-[18px] tracking-[0] leading-[normal]">
              {name}
            </div>
          </div>
        </div>
        <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
          <div className="relative w-[132px] h-[24px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
            Email:
          </div>
          <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
            <div className="relative w-[161px] mt-[-1.00px] font-montserrat font-medium text-black text-[18px] tracking-[0] leading-[normal]">
              {email}
            </div>
          </div>
        </div>
        <div className="flex w-[326px] items-center justify-center gap-[20px] relative flex-[0_0_auto]">
          <div className="relative w-[132px] h-[24px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
            License:
          </div>
          <div className="flex w-[173px] items-center justify-center gap-[10px] px-[6px] py-[5px] relative bg-bright-white rounded-[10px] overflow-hidden">
            <div className="relative w-[161px] mt-[-1.00px] font-montserrat font-medium text-black text-[18px] tracking-[0] leading-[normal]">
              {license}
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserInfo;