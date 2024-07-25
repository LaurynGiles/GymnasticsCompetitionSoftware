import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
  };

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io("http://localhost:5000"); // Adjust the URL as needed
    setSocket(socketConnection);

    socketConnection.on("errorMessage", (message) => {
      console.log(`Error message received: ${message}`);
      addNotification({ message, sender: "system", time: new Date().toLocaleTimeString() });
    });

    socketConnection.on("groupMessage", (message) => {
      console.log(`Group message received: ${message}`);
      addNotification({ message, sender: "system", time: new Date().toLocaleTimeString() });
    });

    return () => {
      socketConnection.off("errorMessage");
      socketConnection.off("groupMessage");
      socketConnection.close();
    };
  }, []);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, socket }}>
      {children}
    </NotificationContext.Provider>
  );
};