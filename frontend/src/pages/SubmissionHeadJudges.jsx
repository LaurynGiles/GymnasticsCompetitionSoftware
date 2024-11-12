import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SmallBlueButton from "../components/SmallBlueButton";
import InfoBlock from "../components/InfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreBlock from "../components/ScoreBlock";
import Header from "../components/Header";
import JudgeScore from "../components/JudgeScore";
import JudgeAnalysis from "../components/JudgeAnalysis";
import SmallSelectBox from "../components/SmallSelectBox";
import Popup from "../components/Popup";
import LeavePopup from "../components/LeavePopup.jsx";
import ScoreSubmissionBlock from "../components/ScoreSubmissionBlock";
import ResubmitRequest from "../components/ResubmitRequest.jsx";
import { useNotifications } from "../utils/connection.jsx";
import { submitDifficulty, submitExecution } from "../utils/api.js";
import RequestPopup from "../components/RequestPopup.jsx";

const SubmissionHeadJudges = () => {
  const {startScore, penalty, receivedDeductions, currApparatus,joinedJudges, nextGymnast, setReceivedDeductions, resubmissionRequests, 
    approveResubmissionRequest, rejectResubmissionRequest,  groupId, setJoinedJudges, sessionId, socket, headOfGroup, setHeadOfGroup, 
    setJudgingStarted, setNextGymnast, setCurrApparatus, setNavigateToCalculations, setPenalty, setDeductionTotal, setStartScore, setFinalScore, 
    judgeInfo, totalGymnasts } = useNotifications();
  const [leaveGroup, setLeaveGroup] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [averageDeduction, setAverageDeduction] = useState(0.0);
  const [visibleAnalysis, setVisibleAnalysis] = useState({});
  const [rotateArrow, setRotateArrow] = useState({});
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [navigateOnClose, setNavigateOnClose] = useState(false);
  const [requestName, setRequestName] = useState("All");
  const [judgeId, setJudgeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const total = receivedDeductions.reduce((sum, item) => sum + parseFloat(item.deduction), 0);
    const average = total / receivedDeductions.length;
    setAverageDeduction(average);
    console.log(`Average UPDATED: ${average}`);
  }, [receivedDeductions]);

  const updateAnalysisVisibility = (index) => {
    setVisibleAnalysis((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setRotateArrow((prev) => ({
      ...prev,
      [index]: !prev[index] ? 180 : 0,
    }));
  };

  const handleSendClick = () => {

    setShowRequestPopup(true);
  };

  const handleHigh = () => {
    console.log("Send request for judge ID:", judgeId);

    const judge = joinedJudges.find(j => j.judge_id === judgeId);
    console.log(judge)
    const socketIdToSend = judge ? judge.socket_id : null; 
    console.log(socketIdToSend)

      socket.emit('headRequestResubmission', {
        groupId, 
        apparatus: currApparatus,
        judgeId, 
        socketId: socketIdToSend,
        type: "high"
      });

    setShowRequestPopup(false);
  }

  const handleLow = () => {
    console.log("Send request for judge ID:", judgeId);

    const judge = joinedJudges.find(j => j.judge_id === judgeId);
    console.log(judge)
    const socketIdToSend = judge ? judge.socket_id : null; 
    console.log(socketIdToSend)

      socket.emit('headRequestResubmission', {
        groupId, 
        apparatus: currApparatus,
        judgeId, 
        socketId: socketIdToSend,
        type: "low"
      });

    setShowRequestPopup(false);
  }

  const handleSubmitClick = () => {

    console.log(`Judges: ${joinedJudges.length}`)

    if (receivedDeductions.length != (joinedJudges.length)) {
      setConfirmSubmit(true);
    } else {
      submitScores();
    }

  };

  const handleClosePopup = () => {
    setShowSubmitPopup(false);
    if (navigateOnClose) {
      navigate("/gymnastselect");
    }
  };

  const submitScores = async () => {
    try {
      // Step 1: Submit Difficulty Score
      const difficultyResponse = await submitDifficulty(groupId, judgeInfo.judge_id, nextGymnast.gymnast_id, startScore, penalty);
      console.log("Difficulty submitted:", difficultyResponse);
  
      // Step 2: If difficulty submission succeeds, submit deductions
      await Promise.all(receivedDeductions.map(async (judge) => {
        try {
          const executionResponse = await submitExecution(groupId, judge.judgeId, nextGymnast.gymnast_id, judge.deduction, penalty);
          console.log(`Execution submitted for judge ${judge.judgeId}:`, executionResponse);
        } catch (error) {
          console.error(`Failed to submit execution for judge ${judge.judgeId}:`, error);
          throw error; // If any deduction submission fails, stop further processing
        }
      }));
  
      // Step 3: Emit final score submission event if all submissions succeed
      const finalScore = (startScore - penalty - averageDeduction).toFixed(3);
      socket.emit('finalScoreSubmitted', { groupId, finalScore });
      console.log('Final score submitted:', finalScore);
  
      // Step 4: Reset states and local storage
      setDeductionTotal(null);
      setPenalty(null);
      setFinalScore(null);
      setStartScore(null);
      setReceivedDeductions([]);
      localStorage.setItem("values", []);
      localStorage.setItem("total", 0.0);
      localStorage.setItem("startScore", 0.0);
      localStorage.setItem("penalty", 0.0);

      setShowSubmitPopup(true);
      setNavigateOnClose(true);
  
    } catch (error) {
      // Handle failure of either difficulty or execution submissions
      setErrorMessage("An error occurred when submitting the final score.");
      setShowErrorPopup(true);
      console.error("Error during score submission process:", error);
    }
  };

  const handleLeaveGroup = () => {
    setLeaveGroup(false);
    socket.emit('leaveGroup', {group_id: groupId, judge_id: judgeInfo.judge_id, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname});

    // setJoinedJudges(prev => prev.filter(judge => judge.judge_id === judgeInfo.judge_id));

    setHeadOfGroup(false);
    setNextGymnast(null);
    // setCurrApparatus(null);
    setPenalty(null);
    setDeductionTotal(null);
    setStartScore(null);
    setFinalScore(null);
    setNavigateToCalculations(false);
    setJudgingStarted(false);
    localStorage.removeItem('homeJudgesState');
    localStorage.removeItem('penalty');
    localStorage.removeItem('startScore');
    localStorage.removeItem('total');
    localStorage.removeItem('values');
    // localStorage.removeItem('joinedJudges');
    navigate('/homejudges');
  };

  return (
    <div className="bg-[#feffff] flex flex-col items-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 left-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showPeopleIcon={true} currPage={"/submission"} setLeaveGroup={setLeaveGroup} />
        </div>
        <div className="flex flex-col items-center w-full h-full pt-[75px] pb-[50px] gap-8 relative overflow-y-auto">
          <InfoBlock />
          
          <Header text={"Starting score and Penalties"} />
          <div className="flex flex-col items-center gap-[10px] w-full md:w-[95%] lg:w-[70%] px-4">
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-24 px-4 py-3 bg-light-periwinkle w-full">
              <ScoreBlock title={"Starting score"} score={parseFloat(startScore).toFixed(3)} />
              <ScoreBlock title={"Penalty deductions"} score={parseFloat(penalty).toFixed(3)} />
            </div>
          </div>
          
          <Header text={"Execution scores"} />
          <div className="flex flex-col items-center gap-[10px] w-full lg:w-[60%] px-4">

            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between text-prussian-blue text-base md:text-lg lg:text-xl font-medium">
                <div className="w-full text-center">Judge</div>
                <div className="w-full text-center">Deduction</div>
                <div className="w-full text-center">Score</div>
                <div className="w-28 md:w-32 text-center"></div>
              </div>
              {receivedDeductions.map((judge, index) => (
                <React.Fragment key={index}>
                  <JudgeScore
                    name={judge.name}
                    deduction={(judge.deduction).toFixed(3)}
                    total={(startScore - judge.deduction - penalty).toFixed(3)}
                    rotation={rotateArrow[index] || 0}
                    onUpdateAnalysis={() => updateAnalysisVisibility(index)}
                  />
                  {visibleAnalysis[index] && <JudgeAnalysis deductions={judge.analysis} />}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <Header text={"Request resubmission"} />
          <div className="flex flex-col items-center gap-[10px] w-[80%] md:w-[70%] lg:w-[60%]">
            <div className="flex flex-col items-center gap-[20px] px-4 py-3 bg-anti-flash-white w-full p-4 md:p-6">
              <div className="flex items-center gap-[30px] justify-center w-full">
                <SmallSelectBox option={requestName} setOption={setRequestName} setJudgeId={setJudgeId} />
                <div onClick={handleSendClick}>
                  <SmallBlueButton title="Send" />
                </div>
              </div>
              {resubmissionRequests.map((request, index) => (
                <ResubmitRequest
                  key={index}
                  name={`${request.judge_fname} ${request.judge_lname}`}
                  onApprove={() => approveResubmissionRequest(request)}
                  onReject={() => rejectResubmissionRequest(request)}
                />
              ))}
            </div>
          </div>
          
          <Header text={"Final score submission"} />
          <div className="flex flex-col items-center gap-2 w-full md:w-[70%] lg:w-[50%] px-4">
            <div className="flex flex-col items-center gap-4 px-4 py-3 bg-periwinkle w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <ScoreSubmissionBlock deductions={averageDeduction} penalties={penalty} startScore={startScore} />
                <div className="flex flex-col items-end gap-2" onClick={handleSubmitClick}>
                  <SmallBlueButton title="Submit" />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      {showRequestPopup && <RequestPopup message={`Request sent to ${requestName}`} onHigh={handleHigh} onLow={handleLow}/>}
      {showErrorPopup && <Popup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
      {showSubmitPopup && <Popup message={"Submitted final score"} onClose={handleClosePopup} />}
      {leaveGroup && <LeavePopup message={"Are you sure that you want to leave the judging table."} onYes={handleLeaveGroup} onNo={() => setLeaveGroup(false)}/>}
      {confirmSubmit && <LeavePopup message={"The number of deductions you have received does not match the number of judges at the table, please confirm that you want to submit this score."} onYes={submitScores} onNo={() => setConfirmSubmit(false)}/>}
    </div>
  );
};

export default SubmissionHeadJudges