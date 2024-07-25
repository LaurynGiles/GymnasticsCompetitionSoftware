import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import Notification from "../components/Notification";
import SendMessage from "../components/SendMessage";
import { useNotifications } from "../utils/connection.jsx"

const NotificationsJudges = () => {

  const { notifications } = useNotifications();
  const location = useLocation();
  const prevPage = location.state?.currPage || "/homejudges";
  const head_judge = location.state?.isHead || false;

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={true} showBookIcon={false} prevPage={prevPage} currPage={"/notificationsjudges"}/>
        </div>
        <div className="inline-flex flex-col items-center w-full gap-[20px] overflow-y-auto pt-[75px] relative">
          {head_judge && <SendMessage />}
          <Header text="Notifications"/>
          <div className="inline-flex flex-col items-center gap-[15px] relative flex-[0_0_auto]">
            {notifications.map((notification, index) => (
                <Notification
                  key={index}
                  notification={notification.message}
                  time={notification.time}
                  sender={notification.sender}
                />
              ))}
            {/* <Notification notification="Please approach the judging table" time="10:10am" sender="head"/>
            <Notification notification="You joined R1:floor" time="10:07am" sender="system"/>
            <Notification notification="R1:Floor event is waiting for judges" time="10:05am" sender="system"/>
            <Notification notification="Welcome to Scorematics!" time="10:05am" sender="system"/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsJudges;