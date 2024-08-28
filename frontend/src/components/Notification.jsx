import React from "react";

const Notification = ({type, notification, time, sender}) => {

    let bgColorClass = "bg-notification-box-system";
    if (sender === "head") {
        bgColorClass = "bg-notification-box";
    } else if (type === "reject") {
        bgColorClass = "bg-coral";
    }

    return (
        <div className="w-full flex flex-col items-start gap-2 p-2 md:p-4 lg:p-6 w-full">
          <div
            className={`w-full flex flex-col items-start gap-2 p-3 ${bgColorClass} rounded-xl overflow-hidden w-full`}
          >
            <p className="text-prussian-blue text-base md:text-lg lg:text-xl font-montserrat font-normal whitespace-pre-wrap">
              {notification}
            </p>
          </div>
          <div className="w-full flex justify-end">
            <div className="text-prussian-blue text-sm md:text-md lg:text-lg font-montserrat font-normal whitespace-nowrap">
              {time}
            </div>
          </div>
        </div>
      );
  };


export default Notification;