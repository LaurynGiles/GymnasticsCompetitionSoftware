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
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-full z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} currPage={"/lobby"}/>
        </div>
        <div className="inline-flex flex-col w-full h-full items-center overflow-y-auto pt-[75px] gap-[40px] relative">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto] bg-bright-white">
            <Header text={"Accept join requests"}/>
            <div className="flex-col w-[344px] p-[10px] gap-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
            {joinRequests.map((request, index) => (
                <LoginRequest 
                  key={index} 
                  name={`${request.judge_fname} ${request.judge_lname}`} 
                  onApprove={() => handleApprove(request)} 
                  onReject={() => handleReject(request)} 
                />
              ))}
            </div>
          </div>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto] bg-bright-white">
            <Header text={"Judges at the table"}/>
            <div className="flex-col w-[344px] p-[10px] gap-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
            <RemoveRequest name={`${judgeInfo.judge_fname} ${judgeInfo.judge_lname}`}/>
            {joinedJudges.map((judge, index) => (
                <RemoveRequest 
                  key={index} 
                  name={`${judge.judge_fname} ${judge.judge_lname}`} 
                />
              ))}
            </div>
          </div>
          <div className="inline-flex flex-col h-[245px] items-center justify-end gap-[10px] px-[20px] py-[50px] relative">
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