import React, {useState} from "react";
import EventInfoBlock from "../components/EventInfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreCard from "../components/ScoreCard";
import Status from "../components/Status";
import ResubmitButton from "../components/ResubmitButton";

const ScoreCardJudges = () => {

  const [showStatus, setShowStatus] = useState(false);

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
          <EventInfoBlock />
          <ScoreCard />
          {showStatus && <Status />}
          
          <ResubmitButton title="Request resubmission" handleButtonClick={handleButtonClick}/>
        </div>
      </div>
    </div>
  );
};

export default ScoreCardJudges;