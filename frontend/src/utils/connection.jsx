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
  const [resubmissionRequests, setResubmissionRequests] = useState([]);
  const [navigateToCalculations, setNavigateToCalculations] = useState(false);
  const [joinStatus, setJoinStatus] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [headOfGroup, setHeadOfGroup] = useState(false);
  const [nextGymnast, setNextGymnast] = useState(null);
  const [sameGymnast, setSameGymnast] = useState(false);
  const [currApparatus, setCurrApparatus] = useState(null);
  const [deductionTotal, setDeductionTotal] = useState(null);
  const [receivedDeductions, setReceivedDeductions] = useState([]);
  const [penalty, setPenalty] = useState(null);
  const [startScore, setStartScore] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [showResubmissionPopup, setShowResubmissionPopup] = useState(false);
  const [resubmissionApproved, setResubmissionApproved] = useState(false);
  const [resubmissionRejected, setResubmissionRejected] = useState(false);
  const [judgingStarted, setJudgingStarted] = useState(false);
  const [totalGymnasts, setTotalGymnasts] = useState(0);
  const [eventEnded, setEventEnded] = useState(false);
  const [resubmissionMessage, setResubmissionMessage] = useState(null);

  useEffect(() => {
    console.log("Updated joinedJudges state:", joinedJudges);
  }, [joinedJudges]);

  useEffect(() => {
    // const socketConnection = io("http://localhost:5000");
    const socketConnection = io("https://gymnasticscompetitionsoftware.onrender.com");
    setSocket(socketConnection);

    socketConnection.on("judgeDisconnected", ({ judge_id, group_id }) => {
      console.log(`Judge ${judge_id} disconnected from group ${group_id}`);
          
      setJoinedJudges(prev => prev.filter(judge => judge.judge_id !== judge_id));
    });

    socketConnection.on("judgeLeaveGroup", ({ judge_id, judge_fname, judge_lname, group_id}) => {
      console.log(`${judge_fname} ${judge_lname} left group ${group_id}`);
        
      setJoinedJudges(prev => prev.filter(judge => judge.judge_id !== judge_id));
    });

    socketConnection.on("eventEnded", ({ group_id }) => {
      console.log("The event has ended, you must leave the group.");
      setEventEnded(true);
    });

    socketConnection.on("rejectionMessage", (message) => {
      console.log(`Rejection message received: ${message}`);
      addNotification({ type: "reject", message, sender: "system", time: new Date().toLocaleTimeString() });
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

    // socketConnection.on("judgeList", (judges) => {
    //   console.log(judges);
      
    //   const updatedJudges = [judges];
    //   localStorage.setItem("joinedJudges", JSON.stringify(updatedJudges));
    
    //   setJoinedJudges(prev => [...prev, judge]);
    // });

    socketConnection.on("allJudgesInGroup", (judges) => {
      // Log the received list of judges to verify data
      console.log("Received judges list from server:", judges);
    
      // Update local storage with the list of judges
      localStorage.setItem("joinedJudges", JSON.stringify(judges));
    
      // Update state with the list of judges
      setJoinedJudges(judges);  // This will trigger a re-render with updated state
      
      // Optional: Log the state after setting it, though this will log the state before the next render
      console.log("Updated state for joinedJudges:", joinedJudges);
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
      if (gymnast == nextGymnast) {
        setSameGymnast(true);
      }
      setNextGymnast(gymnast);
      setFinalScore(null);
      setStartScore(null);
      setPenalty(null);
      setNavigateToCalculations(true);
    });

    socketConnection.on("receiveDeduction", (scoreData) => {
      console.log(`Score received from ${scoreData.name}: ${scoreData.deduction}`);
      setReceivedDeductions(prev => {
        const existingIndex = prev.findIndex(item => item.judgeId === scoreData.judgeId);
        if (existingIndex !== -1) {
          const updatedDeductions = [...prev];
          updatedDeductions[existingIndex] = {
            ...updatedDeductions[existingIndex],
            deduction: scoreData.deduction,
            analysis: scoreData.analysis
          };
          return updatedDeductions;
        } else {
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

    socketConnection.on("resubmissionRequest", (message) => {
      console.log(`Resubmission request received: ${message}`);
      addNotification({ type: "resubmission", message: message, sender: "head", time: new Date().toLocaleTimeString() });
      setShowResubmissionPopup(true);
      setResubmissionMessage(message);
    });

    socketConnection.on("judgeResubmission", (judgeData) => {
      console.log(`Received judge request for resubmission from ${judgeData.socketId}`);
      setResubmissionRequests(prev => [...prev, judgeData]);
      console.log(`Resubmission request received from ${judgeData.judge_fname} ${judgeData.judge_lname} with socketId ${judgeData.socketId}`);
    });

    socketConnection.on("resubmissionApproved", (message) => {
      addNotification({ type: "server", message, sender: "system", time: new Date().toLocaleTimeString() });
      setResubmissionApproved(true);
    });

    socketConnection.on("resubmissionRejected", (message) => {
      addNotification({ type: "reject", message, sender: "system", time: new Date().toLocaleTimeString() });
      localStorage.setItem("resubmitButtonClicked", false)
      setResubmissionRejected(true);
    });

    /** SET HEAD OF GROUP and GROUP ID back to normal when leaving a group */

    return () => {
      socketConnection.close();
    };
  }, []);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const approveJoinRequest = (judge) => {
    setJoinRequests(prev => prev.filter(req => req.judge_id !== judge.judge_id));
    socket.emit("approveJoinRequest", {judge, gymnast: nextGymnast, judgingStarted, startScore, penalty});
  };

  const rejectJoinRequest = (judge) => {
    setJoinRequests(prev => prev.filter(req => req.judge_id !== judge.judge_id));
    socket.emit("rejectJoinRequest", judge);
  };

  const approveResubmissionRequest = (judgeData) => {
    socket.emit('approveResubmissionRequest', {
      groupId: judgeData.groupId,
      socketId: judgeData.socketId
    });
    setResubmissionRequests(prev => prev.filter(judge => judge.judgeId !== judgeData.judgeId));
  };
  
  const rejectResubmissionRequest = (judgeData) => {
    socket.emit('rejectResubmissionRequest', {
      groupId: judgeData.groupId,
      socketId: judgeData.socketId
    });
    setResubmissionRequests(prev => prev.filter(judge => judge.judgeId !== judgeData.judgeId));
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
      setHeadOfGroup,
      showResubmissionPopup,
      setShowResubmissionPopup,
      approveResubmissionRequest,
      rejectResubmissionRequest,
      resubmissionRequests,
      resubmissionApproved,
      setResubmissionApproved,
      resubmissionRejected,
      setResubmissionRejected,
      judgingStarted,
      setJudgingStarted,
      totalGymnasts,
      setTotalGymnasts,
      eventEnded,
      setEventEnded,
      setJoinedJudges,
      sameGymnast,
      setSameGymnast,
      resubmissionMessage,
      setResubmissionMessage
    }}>
      {children}
    </NotificationContext.Provider>
  );
};