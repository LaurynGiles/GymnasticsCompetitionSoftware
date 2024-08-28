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
import ScoreSubmissionBlock from "../components/ScoreSubmissionBlock";
import ResubmitRequest from "../components/ResubmitRequest.jsx";
import { useNotifications } from "../utils/connection.jsx";
import { submitDifficulty, submitExecution } from "../utils/api.js";

const SubmissionHeadJudges = () => {
  const { startScore, penalty, receivedDeductions, groupId, currApparatus, judgeInfo, joinedJudges, nextGymnast, 
    socket, setDeductionTotal, setStartScore, setPenalty, setFinalScore, setReceivedDeductions, resubmissionRequests, 
    approveResubmissionRequest, rejectResubmissionRequest, } = useNotifications();
  const [averageDeduction, setAverageDeduction] = useState(0.0);
  const [visibleAnalysis, setVisibleAnalysis] = useState({});
  const [rotateArrow, setRotateArrow] = useState({});
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
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
      });

    setShowRequestPopup(true);
  };

  const handleSubmitClick = async () => {

    try {
      const difficultyResponse = await submitDifficulty(groupId, judgeInfo.judge_id, nextGymnast.gymnast_id, startScore, penalty);
      console.log("Difficulty submitted:", difficultyResponse);
    } catch (error) {
      console.error("Failed to submit difficulty:", error);
    }

    receivedDeductions.forEach(async (judge) => {
      try {
        const executionResponse = await submitExecution(groupId, judge.judgeId, nextGymnast.gymnast_id, judge.deduction, penalty);
        console.log(`Execution submitted for judge ${judge.judgeId}:`, executionResponse);
      } catch (error) {
        console.error(`Failed to submit execution for judge ${judge.judgeId}:`, error);
      }
    });

    socket.emit('finalScoreSubmitted', { groupId, finalScore: startScore - penalty - averageDeduction });
    
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
  };

  const handleClosePopup = () => {
    setShowSubmitPopup(false);
    if (navigateOnClose) {
      navigate("/gymnastselect");
    }
  };

  return (
    <div className="bg-[#feffff] flex flex-col items-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 left-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/submission"} />
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
      {showRequestPopup && <Popup message={`Request sent to ${requestName}`} onClose={() => setShowRequestPopup(false)} />}
      {showSubmitPopup && <Popup message={"Submitted final score"} onClose={handleClosePopup} />}
    </div>
  );
};

export default SubmissionHeadJudges