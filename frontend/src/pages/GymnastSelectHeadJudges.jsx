import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import GymnastBlock from "../components/GymnastBlock";
import BlockHeader from "../components/BlockHeader";
import LeavePopup from "../components/LeavePopup";
import { getGymnastsByEvent } from "../utils/api.js";
import { useNotifications } from "../utils/connection.jsx";

const GymnastSelectHeadJudges = () => {
  const [gymnastInfo, setGymnastInfo] = useState([]);
  const [selectedGymnast, setSelectedGymnast] = useState(null);
  const [error, setError] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { groupId, sessionId, socket, headOfGroup, setHeadOfGroup, setNextGymnast, setCurrApparatus, setPenalty, setDeductionTotal, setStartScore, setFinalScore, judgeInfo } = useNotifications();
  const [leaveGroup, setLeaveGroup] = useState(false);
  const navigate = useNavigate();

  const completedGymnasts = gymnastInfo.filter(gymnast => gymnast.completed);

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
    setHeadOfGroup(false);
    setNextGymnast(null);
    setCurrApparatus(null);
    setPenalty(null);
    setDeductionTotal(null);
    setStartScore(null);
    setFinalScore(null);
    handleNavigation('/homejudges');
  };

  return (
    <div className="bg-[#feffff] flex flex-col w-full min-h-screen">
      <div className="bg-bright-white flex-1 flex flex-col">
        <div className="fixed top-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showPeopleIcon={true} currPage={"/gymnastselect"}/>
        </div>
        <div className="flex-1 flex flex-col items-center pt-[75px] pb-[60px] px-4 gap-[20px] md:gap-[30px] lg:gap-[40px] overflow-y-auto">
          
          <div className="flex flex-col items-center gap-[15px] w-full">
            <BlockHeader text={"District MAG Trials Levels 1-3"}/>
            <Header text={"Select the next gymnast"}/>
            {gymnastInfo.filter(gymnast => !gymnast.completed).map((gymnast, index) => (
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
                    isSelected={selectedGymnast === gymnast.gymnast_id}
                    onSelect={handleSelectGymnast}
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
      {showPopup && <Popup message={"No gymnast selected"} onClose={() => setShowPopup(false)} />}
      {leaveGroup && <LeavePopup message={error} onYes={() => handleLeaveGroup} onNo={() => setLeaveGroup(false)}/>}
    </div>
  );
};

export default GymnastSelectHeadJudges;