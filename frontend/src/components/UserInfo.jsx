import React from "react";

const UserInfo = ({ number, name, email, license}) => {
  return (
    <div className="w-[80%] md:w-[70%] lg-[40%] bg-light-periwinkle py-4 px-4 md:px-8 lg:px-16 xl:px-24 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between text-prussian-blue font-medium text-lg md:text-xl">
            <span>GSA number:</span>
            <div className="flex items-center justify-center px-2 py-1 bg-bright-white rounded-md w-[60%]">
              <span className="text-black font-medium text-lg">{number}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-prussian-blue font-medium text-lg md:text-xl">
            <span>Name:</span>
            <div className="flex items-center justify-center px-2 py-1 bg-bright-white rounded-md w-[60%]">
              <span className="text-black font-medium text-lg">{name}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between text-prussian-blue font-medium text-lg md:text-xl">
            <span>Email:</span>
            <div className="flex items-center justify-center px-2 py-1 bg-bright-white rounded-md w-[60%]">
              <span className="text-black font-medium text-lg">{email}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-prussian-blue font-medium text-lg md:text-xl">
            <span>License:</span>
            <div className="flex items-center justify-center px-2 py-1 bg-bright-white rounded-md w-[60%]">
              <span className="text-black font-medium text-lg">{license}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;