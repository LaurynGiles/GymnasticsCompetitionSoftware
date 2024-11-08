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
  const [competitionInfo, setCompetitionInfo] = useState({}); 
  const [resultsUpdated, setResultsUpdated] = useState(false);

  useEffect(() => {
    // const socketConnection = io("http://localhost:5000");
    const socketConnection = io("https://gymnasticscompetitionsoftware.onrender.com");
    setSocket(socketConnection);

    socketConnection.on('resultsUpdated', () => {
      console.log("Database results have been updated.");
      setResultsUpdated(true); // Set flag to true when results are updated
    });

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
      competitionInfo,
      setCompetitionInfo,
      resultsUpdated, 
      setResultsUpdated
    }}>
      {children}
    </NotificationContext.Provider>
  );
};