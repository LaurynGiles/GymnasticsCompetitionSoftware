import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import Notification from "../components/Notification";
import SendMessage from "../components/SendMessage";
import { useNotifications } from "../utils/connection.jsx"
import Popup from "../components/Popup.jsx";

const NotificationsJudges = () => {

  const { notifications, judgeInfo } = useNotifications();
  const location = useLocation();
  const prevPage = location.state?.currPage || "/homejudges";
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="bg-[#feffff] flex flex-col w-full h-screen">
      <div className="bg-bright-white w-full h-full flex flex-col">
        {/* Navigation Bar Fixed at the Top */}
        <div className="fixed top-0 w-full z-10">
          <NavigationBarDefault
            showBackIcon={true}
            showBookIcon={false}
            prevPage={prevPage}
            currPage={"/notificationsjudges"}
          />
        </div>
  
        {/* Main Content */}
        <div className="pt-[75px] overflow-y-auto flex-1">
          <div className="inline-flex flex-col items-center w-full gap-6">
            {judgeInfo.head_judge && (
              <SendMessage setError={setError} setShowError={setShowError} />
            )}
            <Header text="Notifications" />
            <div className="w-[90%] md:w-[70%] lg:w-[50%] inline-flex flex-col items-center">
              {notifications.map((notification, index) => (
                <Notification
                  key={index}
                  type={notification.type}
                  notification={notification.message}
                  time={notification.time}
                  sender={notification.sender}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showError && (
        <Popup message={error} onClose={() => setShowError(false)} />
      )}
    </div>
  );
  
  
};

export default NotificationsJudges;