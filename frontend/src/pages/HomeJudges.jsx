import React from "react";
import NavigationBar from "../components/NavigationBar";
import SelectBox from "../components/SelectBox";
import BlueButton from "../components/BlueButton";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";
import ArrowIcon from "../components/ArrowIcon";

const HomeJudges = () => {
  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full">
      <div className="bg-bright-white w-[400px] h-[800px]">
        <div className="inline-flex flex-col h-[800px] items-center gap-[40px] relative">
          <NavigationBar />
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col w-[400px] items-center gap-[15px] px-[31px] py-0 relative flex-[0_0_auto]">
            <Header text="Join a judging table"/>
            <div className="inline-flex flex-col items-center justify-center w-full gap-[40px] px-[70px] py-[50px] relative flex-[0_0_auto] bg-anti-flash-white">
              <SelectBox title="Session" option="Session 1" />
              <SelectBox title="Level: Age group" option="Level 1: 7-8 yrs" />
              <SelectBox title="Apparatus" option="Vault" />
              <BlueButton title="Join"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJudges;