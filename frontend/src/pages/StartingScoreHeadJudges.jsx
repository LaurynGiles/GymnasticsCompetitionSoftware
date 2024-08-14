import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import InfoBlock from "../components/InfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreBlock from "../components/ScoreBlock";
import Header from "../components/Header";
import StartButton from "../components/StartButton";
import EditableScoreBlock from "../components/EditableScoreBlock";
import Popup from "../components/Popup";
import { useNotifications } from "../utils/connection.jsx";
import { useNavigate } from "react-router-dom";

const StartingScoreHeadJudges = () => {

  const { deductionTotal, setStartScore, setPenalty, groupId, socket } = useNotifications();
  const [startScoreLocal, setStartScoreLocal] = useState(0.0);
  const [penaltyLocal, setPenaltyLocal] = useState(0.0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStartScore = localStorage.getItem("startScore");
    const storedPenalty = localStorage.getItem("penalty");
    
    if (storedStartScore) {
      console.log(`Found stored start score ${storedStartScore}`);
      setStartScoreLocal(storedStartScore);
    }
    if (storedPenalty) {
      console.log(`Found stored penalty ${storedPenalty}`);
      setPenaltyLocal(storedPenalty);
    }

  }, []);

  useEffect(() => {
    if (startScoreLocal != 0 | penaltyLocal != 0) {
      console.log(`Setting start score to ${startScoreLocal} and penalty to ${penaltyLocal}`);
      localStorage.setItem("startScore", startScoreLocal.toString());
      localStorage.setItem("penalty", penaltyLocal.toString());
    }
  }, [startScoreLocal, penaltyLocal]);

  const handleContinueClick = () => {
    setStartScore(startScoreLocal);
    setPenalty(penaltyLocal);

    socket.emit('updateScores', {
      groupId,
      startScore: startScoreLocal,
      penalty: penaltyLocal
  });
    // setShowPopup(true);
    navigate("/submission");
  };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/startingscore"}/>
        </div>
        <div className="inline-flex flex-col h-[800px] items-center overflow-y-auto pt-[75px] gap-[30px] relative">
          <InfoBlock />
          
          <div className="inline-flex flex-col w-full items-center justify-center gap-[10px] relative flex-[0_0_auto]">
            <div className="flex w-[400px] items-center justify-center gap-[10px] px-[40px] py-0 relative flex-[0_0_auto]">
              <Header text={"Deductions"}/>
            </div>
            <div className="inline-flex flex-col items-center gap-[19px] px-[20px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle">
              <ScoreBlock title="Your deductions" score = {parseFloat(deductionTotal).toFixed(3)}/>
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
              <EditableScoreBlock title="Starting score" score ={startScoreLocal} setScore={setStartScoreLocal}/>
              <EditableScoreBlock title="Penalty deductions" score={penaltyLocal} setScore={setPenaltyLocal}/>
            </div>
          </div>
          <div onClick={handleContinueClick}>
            <StartButton title={"Continue"}/>
          </div>
        </div>
      </div>
      {/* {showPopup && <Popup message={"Values have been updated"} onClose={() => setShowPopup(false)} />} */}
    </div>
  );
};

export default StartingScoreHeadJudges;