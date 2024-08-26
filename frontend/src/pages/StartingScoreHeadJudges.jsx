import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import SmallBlueButton from "../components/SmallBlueButton";
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
    <div className="bg-[#feffff] flex flex-col lg:flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 left-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/startingscore"} />
        </div>
        
        <div className="pt-[75px] lg:pt-[100px] px-4 lg:px-8 flex flex-col items-center gap-0 md:gap-6 overflow-y-auto h-full">
          
          {/* InfoBlock Section */}
          <div className="w-full flex items-center justify-center mb-6">
            <InfoBlock />
          </div>
          
          {/* Deductions Section */}
          <div className="w-full md:w-[80%] lg:w-[55%] flex flex-col items-center gap-6">
            <Header text={"Deductions"} />
            <div className="w-full bg-light-periwinkle flex flex-col items-center gap-4 px-4 py-6 rounded-lg">
              <ScoreBlock title="Your deductions" score={parseFloat(deductionTotal).toFixed(3)} />
              <Link to="/calculationsjudges">
                <SmallBlueButton title="Resubmit" />
              </Link>
            </div>
          </div>
          
          {/* Starting Score and Penalties Section */}
          <div className="w-full md:w-[80%] lg:w-[55%] flex flex-col items-center gap-6">
            <Header text={"Starting score and penalties"} />
            <div className="w-full bg-light-periwinkle flex flex-col items-center gap-4 px-4 py-6 rounded-lg">
              <EditableScoreBlock title="Starting score" score={startScoreLocal} setScore={setStartScoreLocal} />
              <EditableScoreBlock title="Penalty deductions" score={penaltyLocal} setScore={setPenaltyLocal} />
            </div>
          </div>
          
          {/* Centered StartButton */}
          <div className="w-full flex items-center justify-center mt-6">
            <StartButton title={"Continue"} onClick={handleContinueClick} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StartingScoreHeadJudges;