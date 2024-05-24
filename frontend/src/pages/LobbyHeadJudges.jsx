import React from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import TickIcon from "../components/TickIcon";
import XIcon from "../components/XIcon";
import NextArrowIcon from "../components/NextArrowIcon";
import BlockHeader from "../components/BlockHeader";
import Header from "../components/Header";
import LoginRequest from "../components/LoginRequest";
import StartButton from "../components/StartButton";

const LobbyHeadJudges = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="inline-flex flex-col h-[800px] items-center gap-[40px] relative">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} />
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto] bg-bright-white">
            <Header text={"Accept join requests"}/>
            <div className="flex-col w-[344px] p-[10px] gap-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
              <LoginRequest number={"526987"} name={"Annette Nel"}/>
              <LoginRequest number={"126858"} name={"Peter Weibel"}/>
            </div>
          </div>
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto] bg-bright-white">
            <Header text={"Judges at the table"}/>
            <div className="flex-col w-[344px] p-[10px] gap-[10px] bg-anti-flash-white flex items-center justify-center relative flex-[0_0_auto]">
              <LoginRequest number={"549647"} name={"Lauryn Giles"}/>
              <LoginRequest number={"656548"} name={"Debbie Giles"}/>
            </div>
          </div>
          <div className="inline-flex flex-col h-[245px] items-center justify-end gap-[10px] px-[20px] py-[50px] relative">
            <StartButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyHeadJudges