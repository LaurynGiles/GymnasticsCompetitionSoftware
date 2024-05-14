import React from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import HeadJudgeNotification from "../components/HeadJudgeNotification";
import SystemNotification from "../components/SystemNotification";

const NotificationsJudges = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="inline-flex flex-col items-center w-full gap-[30px] relative overflow-hidden">
          <NavigationBarDefault showBackIcon={true}/>
          <Header text="Notifications"/>
          <div className="inline-flex flex-col items-center gap-[15px] relative flex-[0_0_auto]">
            <HeadJudgeNotification notification="Please approach the judging table" time="10:10am" />
            <SystemNotification notification="You joined R1:floor" time="10:07am" />
            <SystemNotification notification="R1:Floor event is waiting for judges" time="10:05am" />
            <SystemNotification notification="Welcome to Scorematics!" time="10:05am" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsJudges;