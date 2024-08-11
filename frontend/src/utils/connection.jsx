import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
  };

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [judgeInfo, setJudgeInfo] = useState({});
  const [joinRequests, setJoinRequests] = useState([]);
  const [joinedJudges, setJoinedJudges] = useState([]);
  const [navigateToCalculations, setNavigateToCalculations] = useState(false);
  const [joinStatus, setJoinStatus] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [headOfGroup, setHeadOfGroup] = useState(false);
  const [nextGymnast, setNextGymnast] = useState(null);
  const [currApparatus, setCurrApparatus] = useState("");
  const [deductionTotal, setDeductionTotal] = useState(null);
  const [receivedDeductions, setReceivedDeductions] = useState([]);
  const [penalty, setPenalty] = useState(null);
  const [startScore, setStartScore] = useState(null);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    const socketConnection = io("http://localhost:5000");
    setSocket(socketConnection);

    socketConnection.on("rejectionMessage", (message) => {
      console.log(`Rejection message received: ${message}`);
      addNotification({ type: "reject", message, sender: "system", time: new Date().toLocaleTimeString() });
      // setJoinRejected(true);
      setJoinStatus("rejected");
      console.log(`New join status ${joinStatus}`);
    });

    socketConnection.on("serverMessage", (message) => {
      console.log(`Server message received: ${message}`);
      addNotification({ type: "server", message, sender: "system", time: new Date().toLocaleTimeString() });
    });

    socketConnection.on("groupMessage", (message) => {
      console.log(`Group message received: ${message}`);
      addNotification({ type: "group", message, sender: "head", time: new Date().toLocaleTimeString() });
    });

    socketConnection.on("joinRequest", (request) => {
      setJoinRequests(prev => [...prev, request]);
    });

    socketConnection.on("judgeJoined", (judge) => {
      console.log(judge);
      setJoinedJudges(prev => [...prev, judge]);
    });

    socketConnection.on("joinApproved", ({ group_id, apparatus }) => {
      console.log(`Join approved for group ${group_id}`);
      setGroupId(group_id);
      setCurrApparatus(apparatus);
      setJoinStatus("approved");
      console.log(`New join status ${joinStatus}`);
    });

    socketConnection.on("nextGymnast", (gymnast) => {
      console.log(`Next gymnast to be judged: ${gymnast.gymnast_id} ${gymnast.first_name} ${gymnast.last_name}`);
      setNextGymnast(gymnast);
      setNavigateToCalculations(true);
    });

    socketConnection.on("receiveDeduction", (scoreData) => {
      console.log(`Score received from ${scoreData.name}: ${scoreData.deduction}`);
      setReceivedDeductions(prev => {
        const existingIndex = prev.findIndex(item => item.judgeId === scoreData.judgeId);
        if (existingIndex !== -1) {
          // Create a new array to ensure immutability
          const updatedDeductions = [...prev];
          // Update the existing item with the new data
          updatedDeductions[existingIndex] = {
            ...updatedDeductions[existingIndex],
            deduction: scoreData.deduction,
            analysis: scoreData.analysis
          };
          return updatedDeductions;
        } else {
          // If the judge's ID is not found, add the new score data
          return [...prev, scoreData];
        }
      });
    });

    socketConnection.on('scoresUpdated', ({ startScore, penalty }) => {
      setStartScore(startScore);
      setPenalty(penalty);
      console.log(`Received updated scores: Start Score - ${startScore}, Penalty - ${penalty}`);
    });

    socketConnection.on('updateFinalScore', ({ finalScore }) => {
      setFinalScore(finalScore);
      console.log(`Received updated scores: Final score - ${finalScore}`);
    });

    /** SET HEAD OF GROUP and GROUP ID back to normal when leaving a group */

    return () => {
      socketConnection.off("errorMessage");
      socketConnection.off("groupMessage");
      socketConnection.off("joinRequest");
      socketConnection.off("judgeJoined");
      socketConnection.off("joinApproved");
      socketConnection.off("nextGymnast");
      socketConnection.off("receiveDeduction");
      socketConnection.off("scoresUpdated");
      socketConnection.off("updatedFinalScore");
      socketConnection.close();
    };
  }, []);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const approveJoinRequest = (judge) => {
    setJoinRequests(prev => prev.filter(req => req.judge_id !== judge.judge_id));
    socket.emit("approveJoinRequest", judge);
  };

  const rejectJoinRequest = (judge) => {
    setJoinRequests(prev => prev.filter(req => req.judge_id !== judge.judge_id));
    socket.emit("rejectJoinRequest", judge);
  };

  return (
    <NotificationContext.Provider value={{
      notifications, 
      addNotification, 
      socket, 
      judgeInfo, 
      setJudgeInfo, 
      joinRequests, 
      joinedJudges, 
      approveJoinRequest, 
      rejectJoinRequest, 
      navigateToCalculations, 
      setNavigateToCalculations, 
      groupId, 
      setGroupId,
      joinStatus,
      setJoinStatus,
      nextGymnast,
      setNextGymnast,
      currApparatus,
      setCurrApparatus,
      deductionTotal,
      setDeductionTotal,
      receivedDeductions,
      setReceivedDeductions,
      penalty,
      setPenalty,
      startScore,
      setStartScore,
      finalScore,
      setFinalScore,
      headOfGroup,
      setHeadOfGroup
    }}>
      {children}
    </NotificationContext.Provider>
  );
};