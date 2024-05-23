import React, { useEffect, useState } from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import Notification from "../components/Notification";

const NotificationsJudges = () => {

  const [notifications, setNotifications] = useState([]);
  const [prevPage, setPrevPage] = useState("/home");

  useEffect(() => {
    // Function to fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications"); // Replace with your actual API endpoint
        const data = await response.json();
        setNotifications(data.notifications); // Assuming the response has a notifications array
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={true} showBookIcon={false} prevPage={prevPage}/>
        </div>
        <div className="inline-flex flex-col items-center w-full gap-[30px] overflow-y-auto pt-[75px] relative">
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
            <Notification notification="Please approach the judging table" time="10:10am" sender="head"/>
            <Notification notification="You joined R1:floor" time="10:07am" sender="system"/>
            <Notification notification="R1:Floor event is waiting for judges" time="10:05am" sender="system"/>
            <Notification notification="Welcome to Scorematics!" time="10:05am" sender="system"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsJudges;


// Example backend response from /api/notifications

// {
//   "notifications": [
//     { "message": "Please approach the judging table", "time": "10:10am", "sender": "head" },
//     { "message": "You joined R1:floor", "time": "10:07am", "sender": "system" },
//     { "message": "R1:Floor event is waiting for judges", "time": "10:05am", "sender": "system" },
//     { "message": "Welcome to Scorematics!", "time": "10:05am", "sender": "system" }
//   ]
// }