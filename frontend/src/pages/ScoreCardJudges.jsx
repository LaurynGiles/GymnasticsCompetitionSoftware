import React, {useState} from "react";
import InfoBlock from "../components/InfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreCard from "../components/ScoreCard";
import Status from "../components/Status";
import ResubmitButton from "../components/ResubmitButton";
import { useNotifications } from "../utils/connection.jsx";

const ScoreCardJudges = () => {

  const [showStatus, setShowStatus] = useState(false);
  const { deductionTotal, startScore, penalty } = useNotifications();

  const handleButtonClick = () => {
    setShowStatus(!showStatus);
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
          {showStatus && <Status />}
          
          <ResubmitButton title="Request resubmission" handleButtonClick={handleButtonClick}/>
        </div>
      </div>
    </div>
  );
};

export default ScoreCardJudges;