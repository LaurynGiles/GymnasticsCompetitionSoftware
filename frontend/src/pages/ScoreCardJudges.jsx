import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import InfoBlock from "../components/InfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreCard from "../components/ScoreCard";
import ResubmitButton from "../components/ResubmitButton";
import { useNotifications } from "../utils/connection.jsx";
import Popup from "../components/Popup.jsx";

const ScoreCardJudges = () => {

  const { deductionTotal, startScore, penalty, finalScore, nextGymnast, navigateToCalculations, setNavigateToCalculations, showResubmissionPopup, setShowResubmissionPopup } = useNotifications();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (finalScore) {
      setMessage(`Final score ${finalScore} for gymnast ${nextGymnast.first_name} ${nextGymnast.last_name} submitted.`)
      setShowStatus(true);
    }
  }, [finalScore]);

  const handleButtonClick = () => {
    // Resubmission
  };

  const closeNavPop = () => {
    setNavigateToCalculations(false);
    navigate("/calculationsjudges");
  };

  const closeResubmitPop = () => {
    setShowResubmissionPopup(false);
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
          {finalScore && (
            <Popup message={`Final score ${finalScore} for gymnast ${nextGymnast.first_name} ${nextGymnast.last_name} submitted.`} onClose={() => {}} />
          )}
          {navigateToCalculations && (
            <Popup message={`The next gymnast selected to compete is ${nextGymnast.first_name} ${nextGymnast.last_name} (${nextGymnast.gymnast_id})`} onClose={closeNavPop} />
          )}
          {showResubmissionPopup && <Popup message="A resubmission request has been received." onClose={closeResubmitPop} />}
          <ResubmitButton title="Request resubmission" handleButtonClick={handleButtonClick}/>
        </div>
      </div>
    </div>
  );
};

export default ScoreCardJudges;