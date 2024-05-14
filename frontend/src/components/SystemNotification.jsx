import React from "react";

const SystemNotification = ({notification, time}) => {
    return (
        <div className="inline-flex flex-col items-end justify-center gap-[5px] p-[10px] relative flex-[0_0_auto]">
            <div className="inline-flex items-end justify-center gap-[10px] px-[14px] py-[20px] relative flex-[0_0_auto] bg-notification-box rounded-[20px] overflow-hidden">
                <p className="relative w-[291px] mt-[3.00px] font-montserrat font-normal text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
                    {notification}
                </p>
            </div>
            <div className="relative w-[90.47px] h-[14.18px]">
                <div className="text-prussian-blue absolute w-[90px] h-[14px] -top-px left-0 font-montserrat font-normal text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                    {time}
                </div>
            </div>
        </div>
    );
  };


export default SystemNotification;