import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../components/BlueButton";
import NavigationBarDefault from "../components/NavigationBarDefault";
import Header from "../components/Header";
import GymnastBlock from "../components/GymnastBlock";
import BlockHeader from "../components/BlockHeader";
import Popup from "../components/Popup";
import { getGymnastsByEvent } from "../utils/api.js";
import { useNotifications } from "../utils/connection.jsx";

const GymnastSelectHeadJudges = () => {
  const [gymnastInfo, setGymnastInfo] = useState([]);
  const [selectedGymnast, setSelectedGymnast] = useState(null);
  const [error, setError] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { groupId, sessionId, socket } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGymnasts = async () => {
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

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} currPage={"/gymnastselect"}/>
        </div>
        <div className="inline-flex flex-col w-full h-full items-center overflow-y-auto pt-[75px] pb-[60px] gap-[40px] relative">
          
          <div className="inline-flex flex-col items-center gap-[15px] px-0 py-[6px] relative flex-[0_0_auto]">
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
            <Header text={"Already competed"}/>
            {gymnastInfo.filter(gymnast => gymnast.completed).map((gymnast, index) => (
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
            <div onClick={handleConfirmClick}>
              <BlueButton title="Confirm" />
            </div>
          </div>
        </div>
      </div>
      {showPopup && <Popup message={"No gymnast selected"} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default GymnastSelectHeadJudges;