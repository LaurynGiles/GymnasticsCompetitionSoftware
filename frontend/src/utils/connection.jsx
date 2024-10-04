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
  const [currApparatus, setCurrApparatus] = useState(null);
  const [deductionTotal, setDeductionTotal] = useState(null);
  const [receivedDeductions, setReceivedDeductions] = useState([]);
  const [penalty, setPenalty] = useState(null);
  const [startScore, setStartScore] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [showResubmissionPopup, setShowResubmissionPopup] = useState(false);
  const [resubmissionApproved, setResubmissionApproved] = useState(false);
  const [judgingStarted, setJudgingStarted] = useState(false);
  const [totalGymnasts, setTotalGymnasts] = useState(0);
  const [eventEnded, setEventEnded] = useState(false);

  useEffect(() => {
    const socketConnection = io("http://localhost:5000");
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
      setResubmissionApproved(false);
    });

    /** SET HEAD OF GROUP and GROUP ID back to normal when leaving a group */

    return () => {
      // socketConnection.off("judgeDisconnected", handleJudgeDisconnected);
      // socketConnection.off("judgeLeaveGroup", handleJudgeLeaveGroup);
      // socketConnection.off("eventEnded", handleEventEnded);
      // socketConnection.off("rejectionMessage", handleRejectionMessage);
      // socketConnection.off("serverMessage", handleServerMessage);
      // socketConnection.off("groupMessage", handleGroupMessage);
      // socketConnection.off("joinRequest", handleJoinRequest);
      // socketConnection.off("judgeJoined", handleJudgeJoined);
      // socketConnection.off("joinApproved", handleJoinApproved);
      // socketConnection.off("nextGymnast", handleNextGymnast);
      // socketConnection.off("receiveDeduction", handleReceiveDeduction);
      // socketConnection.off("scoresUpdated", handleScoresUpdated);
      // socketConnection.off("updateFinalScore", handleUpdateFinalScore);
      // socketConnection.off("resubmissionRequest", handleResubmissionRequest);
      // socketConnection.off("judgeResubmission", handleJudgeResubmission);
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

  // const fetchJudgeInfo = async (judge_id) => {
  //   try {
  //       const judgeInfo = await getJudgeInfo(judge_id);
  //       return judgeInfo;
  //   } catch (error) {
  //       console.error('Error fetching judge info:', error);
  //       return null;
  //   }
  // };

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
      judgingStarted,
      setJudgingStarted,
      totalGymnasts,
      setTotalGymnasts,
      eventEnded,
      setEventEnded,
      setJoinedJudges
    }}>
      {children}
    </NotificationContext.Provider>
  );
};