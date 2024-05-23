import React from "react";

const Status = () => {
  return (
    <div className="flex w-[324px] items-center gap-[10px] px-0 py-[10px] relative bg-notification-box rounded-[10px]">
      <p className="relative w-[324px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[20px] text-center tracking-[0] leading-[normal]">
        Waiting for head judge to accept the request
      </p>
    </div>
  );
};

export default Status;