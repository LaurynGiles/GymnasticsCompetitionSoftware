import React from "react";

const LargeButton = ({ value }) => {
  return (
    <div className="flex w-36 h-32 md:w-52 md:h-36 items-center justify-center cursor-pointer gap-2 py-2 bg-notification-box rounded-3xl shadow-md">
      <div className="text-prussian-blue font-montserrat font-semibold text-3xl md:text-4xl lg:text-4xl text-center">
        {value}
      </div>
    </div>
  );
}

export default LargeButton;