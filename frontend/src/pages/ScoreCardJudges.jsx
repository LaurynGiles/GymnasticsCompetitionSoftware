import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import InfoBlock from "../components/InfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreCard from "../components/ScoreCard";
import ResubmitButton from "../components/ResubmitButton";
import { useNotifications } from "../utils/connection.jsx";
import Popup from "../components/Popup.jsx";

const ScoreCardJudges = () => {

  const { socket, groupId, judgeInfo, deductionTotal, startScore, penalty, finalScore, nextGymnast, navigateToCalculations,
     setNavigateToCalculations, showResubmissionPopup, setShowResubmissionPopup, resubmissionApproved, setResubmissionApproved } = useNotifications();
  const navigate = useNavigate(); 
  const [showFinalScorePopup, setShowFinalScorePopup] = useState(false);

  useEffect(() => {
    if (finalScore !== null) {
      setShowFinalScorePopup(true);
    }
  }, [finalScore]);

  const handleButtonClick = () => {
    socket.emit("judgeRequestResubmission", {groupId, judge_id: judgeInfo.judge_id, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname })
    console.log("Sending resubmit request to server");
  };

  const closeNavPop = () => {
    setNavigateToCalculations(false);
    localStorage.setItem("values", []);
    localStorage.setItem("total", 0.0);
    localStorage.setItem("resubmitButtonClicked", false)
    navigate("/calculationsjudges");
  };

  const closeResubmitPop = () => {
    setShowResubmissionPopup(false);
    navigate("/calculationsjudges");
  };

  const closeApprovedPop = () => {
    localStorage.setItem("resubmitButtonClicked", false)
    setResubmissionApproved(false);
    navigate("/calculationsjudges");
  };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white overflow-hidden w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} currPage={"/scorecardjudges"}/>
        </div>
        <div className="flex flex-col w-full h-full items-center gap-[30px] overflow-y-auto pt-[75px] relative">
          <InfoBlock />
          <ScoreCard deductionTotal={deductionTotal} startScore={startScore} penalty={penalty}/>
          {showFinalScorePopup && (
            <Popup message={`Final score ${finalScore} for gymnast ${nextGymnast.first_name} ${nextGymnast.last_name} submitted.`} onClose={() => {setShowFinalScorePopup(false)}} />
          )}
          {navigateToCalculations && (
            <Popup message={`The next gymnast selected to compete is ${nextGymnast.first_name} ${nextGymnast.last_name} (${nextGymnast.gymnast_id})`} onClose={closeNavPop} />
          )}
          {showResubmissionPopup &&  (
            <Popup message="The head judge is requesting a resubmission of your deductions." onClose={closeResubmitPop} />
          )}
          {resubmissionApproved &&  (
            <Popup message="The head judge had approved your score resubmission." onClose={closeApprovedPop} />
          )}
          <ResubmitButton title="Request resubmission" handleButtonClick={handleButtonClick}/>
        </div>
      </div>
    </div>
  );
};

export default ScoreCardJudges;