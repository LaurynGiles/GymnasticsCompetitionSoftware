import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import InfoBlock from "../components/InfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreCard from "../components/ScoreCard";
import ResubmitButton from "../components/ResubmitButton";
import { useNotifications } from "../utils/connection.jsx";
import Popup from "../components/Popup.jsx";

const ScoreCardJudges = () => {

  const [showStatus, setShowStatus] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { deductionTotal, startScore, penalty, finalScore, nextGymnast, navigateToCalculations, setNavigateToCalculations } = useNotifications();
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (finalScore) {
      setMessage(`Final score ${finalScore} for gymnast ${nextGymnast.first_name} ${nextGymnast.last_name} submitted.`)
      setShowStatus(true);
    }
  }, [finalScore]);

  useEffect(() => {
    if (navigateToCalculations) {
      setNavigateToCalculations(false);
      setShowNav(true);
    }
  }, [navigateToCalculations, navigate, setNavigateToCalculations]);

  // useEffect(() => {
  //   if (nextGymnast) {
  //     setMessage(`The next gymnast selected to compete it ${nextGymnast.first_name} ${nextGymnast.last_name} (${nextGymnast.gymnast_id})`)
  //     setNavigateToCalculations(true);
  //     setShowStatus(true);
  //   }
  // }, [nextGymnast]);

  const handleButtonClick = () => {
    setMessage("Waiting for head judge to accept the request.")
    setShowStatus(true);
  };

  const closePopup = () => {
    setShowStatus(false);
  };

  const closeNav = () => {
    setShowNav(false);
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
          {showStatus && <Popup message={"Waiting for head judge to accept the request."} onClose={closePopup} />}
          {showNav && <Popup message={`The next gymnast selected to compete it ${nextGymnast.first_name} ${nextGymnast.last_name} 
          (${nextGymnast.gymnast_id})`} onClose={closeNav} />}
          
          <ResubmitButton title="Request resubmission" handleButtonClick={handleButtonClick}/>
        </div>
      </div>
    </div>
  );
};

export default ScoreCardJudges;