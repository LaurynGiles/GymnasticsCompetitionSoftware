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
import LeavePopup from "../components/LeavePopup.jsx";
import { useNotifications } from "../utils/connection.jsx";
import { useNavigate } from "react-router-dom";

const StartingScoreHeadJudges = () => {

  const [startScoreLocal, setStartScoreLocal] = useState(0.0);
  const [penaltyLocal, setPenaltyLocal] = useState(0.0);
  const [leaveGroup, setLeaveGroup] = useState(false);
  const { deductionTotal, groupId, socket, setHeadOfGroup, setNextGymnast, setCurrApparatus, setPenalty, 
    setDeductionTotal, setStartScore, setFinalScore, judgeInfo, setNavigateToCalculations, setJudgingStarted, setJoinedJudges  } = useNotifications();
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

  const handleLeaveGroup = () => {
    setLeaveGroup(false);
    socket.emit('leaveGroup', {group_id: groupId, judge_id: judgeInfo.judge_id, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname});

    // setJoinedJudges(prev => prev.filter(judge => judge.judge_id === judgeInfo.judge_id));

    setHeadOfGroup(false);
    setNextGymnast(null);
    // setCurrApparatus(null);
    setPenalty(null);
    setDeductionTotal(null);
    setStartScore(null);
    setFinalScore(null);
    setNavigateToCalculations(false);
    setJudgingStarted(false);
    localStorage.removeItem('homeJudgesState');
    localStorage.removeItem('penalty');
    localStorage.removeItem('startScore');
    localStorage.removeItem('total');
    localStorage.removeItem('values');
    // localStorage.removeItem('joinedJudges');
    navigate('/homejudges');
  };

  return (
    <div className="bg-bright-white flex flex-col justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 left-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showPeopleIcon={true} setLeaveGroup={setLeaveGroup} currPage={"/startingscore"} />
        </div>
        
        <div className="pt-[75px] pb-[20px] lg:pt-[90px] px-4 lg:px-8 flex flex-col items-center gap-4 md:gap-6 overflow-y-auto h-full">
          
          {/* InfoBlock Section */}
          <div className="w-full flex items-center justify-center">
            <InfoBlock />
          </div>
          
          <Header text={"Deductions"} />
          {/* Deductions Section */}
          <div className="w-full md:w-[80%] lg:w-[55%] flex flex-col items-center gap-2">
            <div className="w-full bg-light-periwinkle flex flex-col items-center lg:gap-4 px-4 py-6 rounded-lg">
              <ScoreBlock title="Your deductions" score={parseFloat(deductionTotal).toFixed(3)} />
              <Link to="/calculationsjudges">
                <SmallBlueButton title="Resubmit" />
              </Link>
            </div>
          </div>
          
          <Header text={"Starting score and penalties"} />
          {/* Starting Score and Penalties Section */}
          <div className="w-full md:w-[80%] lg:w-[55%] flex flex-col items-center">
            <div className="w-full bg-light-periwinkle flex flex-col md:flex-row items-center md:justify-center gap-8 px-4 py-6 md:py-10 rounded-lg">
              <EditableScoreBlock title="Starting score" score={startScoreLocal} setScore={setStartScoreLocal} />
              <EditableScoreBlock title="Penalty deductions" score={penaltyLocal} setScore={setPenaltyLocal} />
            </div>
          </div>
          
          {/* Centered StartButton */}
          <div className="w-full flex items-center justify-center lg:mt-4">
            <StartButton title={"Continue"} onClick={handleContinueClick} />
          </div>
          
        </div>
      </div>
      {leaveGroup && <LeavePopup message={"Are you sure that you want to leave the judging table."} onYes={handleLeaveGroup} onNo={() => setLeaveGroup(false)}/>}
    </div>
  );
};

export default StartingScoreHeadJudges;