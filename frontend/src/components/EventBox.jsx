  import React, {useState, useEffect} from "react";
  import TinyBlueButton from "./TinyBlueButton";
  import ArrowIcon from "./ArrowIcon";
  import GymnastList from "./GymnastList";
  import { useNotifications } from "../utils/connection.jsx";
  import { useNavigate } from "react-router-dom";

  const EventBox = ({group_id, apparatus, levels, ages, gymnasts, setShowError, setError, setNoSelect}) => {

    const { judgeInfo, joinStatus, setJoinStatus, setGroupId, socket, groupId, setCurrApparatus } = useNotifications();
    const [showPopup, setShowPopup] = useState(false);
    const [rotateArrow, setRotateArrow] = useState(180);
    const [statusMessage, setStatusMessage] = useState("");
    const [buttonClass, setButtonClass] = useState("bg-prussian-blue cursor-pointer");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (joinStatus && group_id == groupId) {
        setStatusMessage("Join approved");
        setButtonClass("bg-prussian-blue-dark");
        setIsButtonDisabled(true);
        setNoSelect(true);
        setJoinStatus("");
      } else if (joinStatus && group_id != groupId) {
        setButtonClass("bg-text cursor-not-allowed");
        setIsButtonDisabled(true);
        setNoSelect(true);
        setJoinStatus("");
      }
    }, [joinStatus, setJoinStatus, setStatusMessage, group_id, groupId]);

    const handleArrowClick = () => {
      setShowPopup(!showPopup);
      console.log(showPopup);
      console.log(gymnasts);
      setRotateArrow(rotateArrow === 0 ? 180 : 0);
    };

    const handleJudgeHome = async () => {
      try {
          const joinResult = await handleJoinGroup(group_id);
  
          if (joinResult === 'headJudge') {
            setCurrApparatus(apparatus);
            navigate("/lobby");
          } else if (joinResult === 'waitingForApproval') {
            setStatusMessage("Waiting for approval");
          }
  
      } catch (error) {
        console.log(error);
        setError(error || "Error connecting to server");
        setShowError(true);
      }
    };

    const handleJoinGroup = (group_id) => {
      return new Promise((resolve, reject) => {
        socket.emit('joinGroup', { group_id, apparatus, judge_id: judgeInfo.judge_id, head_judge: judgeInfo.head_judge, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname }, (response) => {
          if (response.success) {
            if (response.isHeadJudge) {
              // console.log(group_id);
              setGroupId(group_id);
              // console.log(comp);
              // setSessionId(comp);
              resolve('headJudge');
            } else {
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
      <div className="relative inline-flex flex-col items-center gap-[0px] py-[0px]">
        <div className="relative inline-flex flex-col items-center gap-[5px] px-[15px] py-[0px] bg-anti-flash-white rounded-[10px] overflow-hidden">
          <div className="flex w-full items-center gap-[20px] px-[5px] py-[10px] relative flex-[0_0_auto]">
            <div className="relative inline-flex items-center h-[30px] bg-periwinkle rounded-[10px] px-[18px]">
              <div className="font-montserrat font-medium text-prussian-blue text-[18px] text-center">
                {apparatus}
              </div>
            </div>
          </div>  
          <div className="flex-col w-[337px] items-center pl-[15px] pr-[21px] py-[0px] relative flex-[0_0_auto]">
            <div className="relative w-[297px] mt-[4.00px] font-montserrat font-medium text-prussian-blue text-base tracking-[0] leading-[normal]">
              Levels:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{levels.join(", ")}
            </div>
            <div className="relative w-[297px] mt-[4.00px] font-montserrat font-medium text-prussian-blue text-base tracking-[0] leading-[normal]">
              Age groups:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ages.join(" yrs, ")} yrs
            </div>
            {statusMessage && 
            <div className="relative w-[297px] mt-[20.00px] font-montserrat font-medium text-dark-prussian-blue text-base tracking-[0] leading-[normal] text-center">
              {statusMessage}
            </div>
            }
          </div>
          <div className="flex w-[337px] items-center gap-[220px] pl-[15px] pr-[13px] py-[15px] relative flex-[0_0_auto]">
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
        <div className="flex justify-center w-full">
          <GymnastList allOptions={gymnasts} />
        </div>
      )}
      </div>
    );
  };

  export default EventBox;