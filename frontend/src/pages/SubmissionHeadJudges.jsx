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
import BlueButton from "../components/BlueButton";
import { useNotifications } from "../utils/connection.jsx";

const SubmissionHeadJudges = () => {
//   const [startScore, setStartScore] = useState("0.000");
//   const [penalty, setPenalty] = useState("0.000");
//   const [deductions, setDeductions] = useState("0.000");
  const { startScore, penalty, receivedDeductions, groupId, judgeInfo, nextGymnast, socket } = useNotifications();
  const [averageDeduction, setAverageDeduction] = useState(0.0);
  const [visibleAnalysis, setVisibleAnalysis] = useState({});
  const [rotateArrow, setRotateArrow] = useState({});
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [navigateOnClose, setNavigateOnClose] = useState(false);
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

  const requestOptions = ["All", "Debbie Giles", "John Doe", "Jane Smith", "Michael Brown", "Emily White"];
  const [requestName, setRequestName] = useState(requestOptions[0]);

  const handleSendClick = () => {
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
        const executionResponse = await submitExecution(groupId, judge.judge_id, nextGymnast.gymnast_id, judge.deduction, penalty);
        console.log(`Execution submitted for judge ${judge.judge_id}:`, executionResponse);
      } catch (error) {
        console.error(`Failed to submit execution for judge ${judge.judge_id}:`, error);
      }
    });

    socket.emit('finalScoreSubmitted', { groupId, finalScore: startScore - penalty - averageDeduction });

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
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/submission"}/>
        </div>
        <div className="inline-flex flex-col w-full h-full items-center overflow-y-auto pt-[75px] pb-[50px] gap-[30px] relative overflow-hidden">
          <InfoBlock />
          
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto]">
            <Header text={"Starting score and Penalties"}/>
            <div className="inline-flex flex-col items-center gap-[19px] px-[20px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle">
              <ScoreBlock title={"Starting score"} score={parseFloat(startScore).toFixed(3)}/>
              <ScoreBlock title={"Penalty deductions"} score={parseFloat(penalty).toFixed(3)}/>
            </div>
          </div>
          
          <div className="inline-flex flex-col items-center gap-[10px] px-0 py-[10px] relative flex-[0_0_auto]">
            <Header text={"Execution scores"} />
            <div className="w-[360px] flex items-center relative flex-[0_0_auto]">
              <div className="relative w-[150px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Judge
              </div>
              <div className="relative w-[106px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Deduction
              </div>
              <div className="relative w-[78px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Score
              </div>
            </div>
            {receivedDeductions.map((judge, index) => (
              <React.Fragment key={index}>
                <JudgeScore
                  name={judge.name}
                  deduction={judge.deduction}
                  total={(startScore - judge.deduction - penalty).toFixed(3)}
                  rotation={rotateArrow[index] || 0}
                  onUpdateAnalysis={() => updateAnalysisVisibility(index)}
                />
                {visibleAnalysis[index] && <JudgeAnalysis deductions={judge.analysis} />}
              </React.Fragment>
            ))}
          </div>
          
          <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
            <Header text={"Request resubmission"} />
            <div className="inline-flex flex-col items-center justify-center gap-[10px] px-[10px] py-[10px] relative flex-[0_0_auto] bg-anti-flash-white">
              <div className="inline-flex items-start justify-center gap-[30px] relative flex-[0_0_auto]">
                <SmallSelectBox title={"Judge"} option={requestName} setOption={setRequestName} allOptions={requestOptions}/>
                <div onClick={handleSendClick}> 
                  <SmallBlueButton title="Send" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto]">
            <Header text={"Final score submission"} />
            <div className="inline-flex flex-col items-center gap-[19px] px-[10px] py-[15px] relative flex-[0_0_auto] bg-periwinkle">
              <div className="inline-flex items-center justify-center gap-[10px] relative">
                <ScoreSubmissionBlock deductions={averageDeduction} penalties={penalty} startScore={startScore}/>
                <div className="flex flex-col w-[122px] h-[140px] items-end justify-end gap-[10px] relative" onClick={handleSubmitClick}>
                  <BlueButton title="Submit" />
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