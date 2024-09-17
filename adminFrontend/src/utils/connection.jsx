import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
  };

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [adminInfo, setAdminInfo] = useState({});
  const [qualifications, setQualifications] = useState([]);
  const [competition, setCompetition] = useState({
    name: "",
    location: "",
    startDate: null,
    endDate: null,
    style: "",
    minBronze: "",
    maxBronze: "",
    minSilver: "",
    maxSilver: "",
    minGold: "",
    maxGold: "",
  });

  useEffect(() => {
    const socketConnection = io("http://localhost:5000");
    setSocket(socketConnection);

    return () => {
      socketConnection.close();
    };
  }, []);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications, 
      setNotifications,
      addNotification, 
      socket,
      adminInfo,
      setAdminInfo,
      qualifications,
      setQualifications,
      competition,
      setCompetition
    }}>
      {children}
    </NotificationContext.Provider>
  );
};