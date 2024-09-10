import React from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import BlockHeader from "../components/BlockHeader";
import Header from "../components/Header";
import LoginRequest from "../components/LoginRequest";
import StartButton from "../components/StartButton";
import RemoveRequest from "../components/RemoveRequest";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotifications } from "../utils/connection.jsx";

const LobbyHeadJudges = () => {

  const { joinRequests, joinedJudges, approveJoinRequest, rejectJoinRequest, judgeInfo, judgingStarted, setJudgingStarted, nextGymnast, socket } = useNotifications();
  const location = useLocation();
  const prevPage = location.state?.currPage || "/homejudges";
  console.log(prevPage);
  const navigate = useNavigate();

  const handleApprove = (request) => {
    if (judgingStarted) {
      console.log(nextGymnast);
      console.log(request);
      socket.emit('judgeGymnastSingle', {scoketId: request.socket_id, groupId: request.group_id, gymnast: nextGymnast});
    }
    approveJoinRequest(request);
  };

  const handleReject = (request) => {
    rejectJoinRequest(request);
  };

  const handleStartClick = () => {
    if (judgingStarted) {
      navigate(prevPage);
    } else {
      setJudgingStarted(true);
      navigate('/gymnastselect');
    }
  };


  return (
    <div className="bg-bright-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-bright-white w-full flex flex-col items-center">
        <div className="w-full fixed top-0 z-10">
          <NavigationBarDefault showBackIcon={false} currPage={"/lobby"}/>
        </div>
        <div className="flex flex-col w-full items-center overflow-y-auto pt-20 gap-10">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col items-center w-full px-4 md:px-8 gap-10">
            <Header text={"Accept join requests"}/>
              <div className="flex flex-col items-center w-[95%] md:w-[70%] lg:w-[45%] pl-4 pr-4 md:pr-10 pt-4 pb-10 bg-anti-flash-white rounded-lg">
                {joinRequests.map((request, index) => (
                  <LoginRequest 
                    key={index} 
                    name={`${request.judge_fname} ${request.judge_lname}`} 
                    onApprove={() => handleApprove(request)} 
                    onReject={() => handleReject(request)} 
                  />
                ))}
              </div>
            <Header text={"Judges at the table"}/>
              <div className="flex flex-col items-center w-[95%] md:w-[70%] lg:w-[45%] pl-4 pr-4 md:pr-10 pt-4 pb-10 gap-2 bg-anti-flash-white rounded-lg">
                <RemoveRequest name={`${judgeInfo.judge_fname} ${judgeInfo.judge_lname}`}/>
                {joinedJudges.map((judge, index) => (
                  <RemoveRequest 
                    key={index} 
                    name={`${judge.judge_fname} ${judge.judge_lname}`} 
                  />
                ))}
              </div>
          </div>
          <div className="flex w-full justify-center py-10">
            <StartButton 
              title={judgingStarted ? "Continue judging" : "Start judging"} 
              onClick={handleStartClick} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyHeadJudges