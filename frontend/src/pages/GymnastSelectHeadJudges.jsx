import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import GymnastBlock from "../components/GymnastBlock";
import BlockHeader from "../components/BlockHeader";
import LeavePopup from "../components/LeavePopup";
import Popup from "../components/Popup.jsx";
import { getGymnastsByEvent } from "../utils/api.js";
import { useNotifications } from "../utils/connection.jsx";
import { checkEventComplete, checkSessionComplete, checkTimeSlotComplete } from "../utils/api.js";

const GymnastSelectHeadJudges = () => {
  const [gymnastInfo, setGymnastInfo] = useState([]);
  const [selectedGymnast, setSelectedGymnast] = useState(null);
  const [error, setError] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { setEventEnded, eventEnded, groupId, setJoinedJudges, sessionId, socket, headOfGroup, setHeadOfGroup, setJudgingStarted, setNextGymnast,
     setCurrApparatus, setNavigateToCalculations, setPenalty, setDeductionTotal, setStartScore, setFinalScore, judgeInfo, totalGymnasts 
    } = useNotifications();
  const [leaveGroup, setLeaveGroup] = useState(false);
  const navigate = useNavigate();

  const completedGymnasts = gymnastInfo.filter(gymnast => gymnast.completed);
  const remainingGymnasts = gymnastInfo.filter(gymnast => !gymnast.completed);

  useEffect(() => {
    const fetchGymnasts = async () => {
      console.log(`HEAD: ${headOfGroup}`);
      try {
        const data = await getGymnastsByEvent(groupId);
        setGymnastInfo(data);
      } catch (error) {
        console.error("Error fetching gymnasts:", error);
      }
    };

    fetchGymnasts();
  }, [groupId, sessionId]);

  useEffect(() => {
    if (remainingGymnasts.length === 0 && (remainingGymnasts.length + completedGymnasts.length === totalGymnasts)) {
      console.log("NO gymnasts left");
      handleEndEvent();
      
    }
  }, [gymnastInfo]);

  const handleEndEvent = async () => {
    
    const eventCompleted = await checkEventComplete(groupId);

    console.log(eventCompleted);
    
    if (eventCompleted.complete == true) {
      console.log("All gymnasts have competed. Ending the event.");

      const sessionCompleted = await checkSessionComplete(eventCompleted.session_id);

      if (sessionCompleted.complete == true) {
        console.log("All events complete. Ending the session.");

        const timeSlotCompleted = await checkTimeSlotComplete(sessionCompleted.time_slot_id);

        if (timeSlotCompleted.complete == true) {
          console.log("All sessions complete. Ending the timeslot.");
        }
      }

      console.log(`Ending event ${groupId}`);
      socket.emit('endEvent', {group_id: groupId});
      // handleLeaveGroup();

    } else {
      console.log("Event has not yet completed.");
    }
    
  };

  const handleSelectGymnast = (gymnastId) => {
    setSelectedGymnast(gymnastId);
    setError(false);
  };

  const selectedGymnastData = selectedGymnast !== null ? gymnastInfo.find(gym => gym.gymnast_id === selectedGymnast) : null;

  const handleConfirmClick = () => {
    if (error) {
      setShowPopup(true);
    } else {
      if (socket && selectedGymnastData) {
        socket.emit('judgeGymnast', {
          groupId,
          gymnast: selectedGymnastData
        });
      }
      navigate("/calculationsjudges");
    }
  };

  const handleLeaveGroup = () => {
    setLeaveGroup(false);
    socket.emit('leaveGroup', {group_id: groupId, judge_id: judgeInfo.judge_id, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname});

    setJoinedJudges(prev => prev.filter(judge => judge.judge_id === judgeInfo.judge_id));
    setEventEnded(false);
    setHeadOfGroup(false);
    setNextGymnast(null);
    setCurrApparatus(null);
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
    navigate('/homejudges');
  };

  return (
    <div className="bg-[#feffff] flex flex-col w-full min-h-screen">
      <div className="bg-bright-white flex-1 flex flex-col">
        <div className="fixed top-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showPeopleIcon={true} setLeaveGroup={setLeaveGroup} currPage={"/gymnastselect"}/>
        </div>
        <div className="flex-1 flex flex-col items-center pt-[75px] pb-[60px] px-4 gap-[20px] md:gap-[30px] lg:gap-[40px] overflow-y-auto">
          
          <div className="flex flex-col items-center gap-[15px] w-full">
            <BlockHeader text={"District MAG Trials Levels 1-3"}/>
            <Header text={"Select the next gymnast"}/>
            {remainingGymnasts.map((gymnast) => (
              <GymnastBlock
                key={gymnast.gymnast_id}
                number={gymnast.gymnast_id}
                name={`${gymnast.first_name} ${gymnast.last_name}`}
                level={gymnast.level}
                age={gymnast.age}
                club={gymnast.club}
                isSelected={selectedGymnast === gymnast.gymnast_id}
                onSelect={handleSelectGymnast}
                competed={false}
              />
            ))}
            {completedGymnasts.length > 0 && (
              <>
                <Header text={"Already competed"} />
                {completedGymnasts.map((gymnast) => (
                  <GymnastBlock
                    key={gymnast.gymnast_id}
                    number={gymnast.gymnast_id}
                    name={`${gymnast.first_name} ${gymnast.last_name}`}
                    level={gymnast.level}
                    age={gymnast.age}
                    club={gymnast.club}
                    competed={true}
                  />
                ))}
              </>
            )}
          </div>
            <div className="w-full flex justify-center">
                <div onClick={handleConfirmClick}>
                  <BlueButton title="Confirm" />
                </div>
              </div>
        </div>
      </div>
          {
            eventEnded && (
              <Popup message="This event has been completed, you will now be returned to the home page." onClose={handleLeaveGroup} />
            )
          }
      {showPopup && <Popup message={"No gymnast selected"} onClose={() => setShowPopup(false)} />}
      {leaveGroup && <LeavePopup message={"Are you sure that you want to leave the judging table."} onYes={handleLeaveGroup} onNo={() => setLeaveGroup(false)}/>}
    </div>
  );
};

export default GymnastSelectHeadJudges;