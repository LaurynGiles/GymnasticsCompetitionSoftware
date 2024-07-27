import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import EventInfoBlock from "../components/EventInfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreBlock from "../components/ScoreBlock";
import Header from "../components/Header";
import StartButton from "../components/StartButton";
import EditableScoreBlock from "../components/EditableScoreBlock";
import Popup from "../components/Popup";
import ResubmitButton from "../components/ResubmitButton";

const StartingScoreHeadJudges = () => {

  const [deductions, setDeductions] = useState("0.000");
  const [startScore, setStartScore] = useState("0.000");
  const [penalty, setPenalty] = useState("0.000");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setDeductions(localStorage.getItem("total"));
  }, []);

  const handleEnterClick = () => {
    localStorage.setItem("startscore", startScore);
    localStorage.setItem("penalty", penalty);
    setShowPopup(true);
  };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/startingscore"}/>
        </div>
        <div className="inline-flex flex-col h-[800px] items-center overflow-y-auto pt-[75px] gap-[30px] relative">
          <EventInfoBlock />
          
          <div className="inline-flex flex-col w-full items-center justify-center gap-[10px] relative flex-[0_0_auto]">
            <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto]">
              <Header text={"Deductions"}/>
            </div>
            <div className="inline-flex flex-col items-center gap-[19px] px-[20px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle">
              <ScoreBlock title="Your deductions" score = {parseFloat(deductions).toFixed(3)}/>
              <Link to="/calculationsjudges">
                <BlueButton title="Resubmit" />
              </Link>
            </div>
          </div>
          <div className="inline-flex flex-col w-full items-center justify-center gap-[10px] relative flex-[0_0_auto]">
            <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto]">
              <Header text={"Starting score and penalties"}/>
            </div>
            <div className="inline-flex flex-col items-center gap-[19px] px-[20px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle">
              <EditableScoreBlock title="Starting score" score ={startScore} setScore={setStartScore}/>
              <EditableScoreBlock title="Penalty deductions" score={penalty} setScore={setPenalty}/>
              <div onClick={handleEnterClick}>
                <BlueButton title="Enter" />
              </div>
            </div>
          </div>
          <Link to="/submission">
            <StartButton title={"Continue"}/>
          </Link>
        </div>
      </div>
      {showPopup && <Popup message={"Values have been updated"} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default StartingScoreHeadJudges;