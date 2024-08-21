  import React, {useState, useEffect} from "react";
  import TinyBlueButton from "./TinyBlueButton";
  import ArrowIcon from "./ArrowIcon";
  import GymnastList from "./GymnastList";
  import { useNotifications } from "../utils/connection.jsx";
  import { useNavigate } from "react-router-dom";

  const EventBox = ({group_id, apparatus, levels, ages, gymnasts, setShowError, setError, setNoSelect}) => {

    const { judgeInfo, joinStatus, setJoinStatus, setGroupId, socket, groupId, setCurrApparatus, setHeadOfGroup, headOfGroup } = useNotifications();
    const [showPopup, setShowPopup] = useState(false);
    const [rotateArrow, setRotateArrow] = useState(180);
    const [statusMessage, setStatusMessage] = useState("");
    const [buttonClass, setButtonClass] = useState("bg-prussian-blue cursor-pointer");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {

        if (joinStatus != "") {
          if (group_id == groupId) {
            if (joinStatus == "approved") {
              setStatusMessage("Join approved");
              console.log(`Setting status message to approved for group ${group_id}`);
              setButtonClass("bg-prussian-blue-dark");
              setIsButtonDisabled(true);
              setNoSelect(true);

            } else if (joinStatus == "rejected") {
              setStatusMessage("Join rejected");
              console.log(`Setting status message to rejected for group ${group_id}`);
              setButtonClass("bg-prussian-blue cursor-pointer");
              setIsButtonDisabled(false);
              setNoSelect(false);

            } else if (joinStatus == "waiting") {
              setStatusMessage("Waiting for approval");
              console.log(`Setting status message to waiting for group ${group_id}`);
              setButtonClass("bg-prussian-blue-dark");
              setIsButtonDisabled(true);
              setNoSelect(true);
            }
  
          } else if (group_id != groupId) {

            if (joinStatus == "rejected") {
              setButtonClass("bg-prussian-blue cursor-pointer");
              setIsButtonDisabled(false);
              setNoSelect(false);
            } else {
              setButtonClass("bg-text cursor-not-allowed");
              setIsButtonDisabled(true);
              setNoSelect(true);
            }
            
          }
        }

    }, [joinStatus, group_id, groupId]);

    const handleArrowClick = () => {
      setShowPopup(!showPopup);
      setRotateArrow(rotateArrow === 0 ? 180 : 0);
    };

    const handleJudgeHome = async () => {
      try {
          const joinResult = await handleJoinGroup(group_id);
  
          if (joinResult === 'headJudge') {
            setCurrApparatus(apparatus);
            navigate("/lobby");
          }
  
      } catch (error) {
        console.log(error);
        setError(error || "Error connecting to server");
        setShowError(true);
      }
    };

    const handleJoinGroup = (group_id) => {
      return new Promise((resolve, reject) => {
        socket.emit('joinGroup', { headOfGroup, group_id, apparatus, judge_id: judgeInfo.judge_id, head_judge: judgeInfo.head_judge, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname }, (response) => {
          if (response.success) {
            setGroupId(group_id);
            if (response.isHeadJudge) {
              setHeadOfGroup(true);
              resolve('headJudge');
            } else {
              setJoinStatus("waiting");
              console.log(`New join status ${joinStatus}`);
              resolve('waitingForApproval');
            }
          } else {
            reject(response.error);
            setError(response.error || "Error connecting to server");
            setShowError(true);
          }
        });
      });
    };

    return (
      <div className="flex flex-col items-center gap-0 py-0 md:w-[50%] w-[90%]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-14 px-4 py-4 md:py-8 bg-anti-flash-white rounded-lg overflow-hidden w-full">
          <div className="flex items-center justify-center h-10 md:h-20 bg-periwinkle rounded-lg md:rounded-xl px-4 md:px-10 w-[30%] md:w-[30%]">
            <div className="font-montserrat font-medium text-prussian-blue text-lg md:text-xl text-center">
              {apparatus}
            </div>
          </div>
          <div className="flex flex-col w-full px-4 py-1 ">
            <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl">
              Levels:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{levels.join(", ")}
            </div>
            <div className="text-prussian-blue font-montserrat font-medium text-base md:text-xl">
              Age groups:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ages.join(" yrs, ")} yrs
            </div>
            {statusMessage && 
            <div className="text-dark-prussian-blue font-montserrat font-medium text-base text-center mt-2 md:text-xl">
              {statusMessage}
            </div>
            }
          </div>
          <div className="flex items-center justify-between md:justify-end md:gap-14 md:w-[40%] px-4 py-3">
              <div onClick={!isButtonDisabled ? handleJudgeHome : null}>
                {!judgeInfo.head_judge ? (
                  <TinyBlueButton title={"Join"} group_id={group_id} buttonClass={buttonClass}/>
                ) : (
                  <TinyBlueButton title={"Start"} group_id={group_id} buttonClass={buttonClass}/>
                )}
              </div>
            <div onClick={handleArrowClick}>
              <ArrowIcon rotation={rotateArrow}/>
            </div>
          </div>   
        </div>
        {showPopup && (
          <GymnastList allOptions={gymnasts} />
          )}
      </div>
    );
  };

  export default EventBox;