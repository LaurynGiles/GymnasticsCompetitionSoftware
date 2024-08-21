import React from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import BlockHeader from "../components/BlockHeader";
import Header from "../components/Header";
import LoginRequest from "../components/LoginRequest";
import StartButton from "../components/StartButton";
import RemoveRequest from "../components/RemoveRequest";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../utils/connection.jsx";

const LobbyHeadJudges = () => {

  const { joinRequests, joinedJudges, approveJoinRequest, rejectJoinRequest, judgeInfo } = useNotifications();
  const navigate = useNavigate();

  const handleApprove = (request) => {
    approveJoinRequest(request);
  };

  const handleReject = (request) => {
    rejectJoinRequest(request);
  };

  const handleStartClick = () => {
    navigate('/gymnastselect');
  };


  return (
    <div className="bg-bright-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-bright-white w-full flex flex-col items-center">
        <div className="w-full fixed top-0 z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} currPage={"/lobby"}/>
        </div>
        <div className="flex flex-col w-full items-center overflow-y-auto pt-20 gap-10">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col items-center w-full px-4 md:px-8 gap-10">
            <Header text={"Accept join requests"}/>
              <div className="flex flex-col items-center w-full max-w-md px-4 py-14 md:py-20 bg-anti-flash-white rounded-lg">
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
              <div className="flex flex-col items-center w-full max-w-md px-4 py-14 md:py-20 bg-anti-flash-white rounded-lg">
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
            <div onClick={handleStartClick}>
              <StartButton title={"Start judging"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyHeadJudges