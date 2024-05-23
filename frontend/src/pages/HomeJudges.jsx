import React, { useState } from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import BlueButton from "../components/BlueButton";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";
import { Link } from "react-router-dom";

const HomeJudges = () => {

  const [session, setSession] = useState("Session 1");
  const [level, setLevel] = useState("Level 1: 7-8 yrs");
  const [apparatus, setApparatus] = useState("Vault")

  const sessionOptions = ["Session 1", "Session 2", "Session 3"];
  const levelOptions = ["Level 1: 7-8 yrs", "Level 2: 9-10 yrs", "Level 3: 11-12 yrs"];
  const apparatusOptions = ["Vault", "Bars", "Beam", "Floor"];

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
      <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} />
        </div>
        <div className="inline-flex flex-col h-full w-full items-center overflow-y-auto pt-[75px] gap-[40px] relative">
        {/* <NavigationBarDefault showBackIcon={false} showBookIcon={false}/> */}
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col w-[400px] items-center gap-[15px] px-[31px] py-0 relative flex-[0_0_auto]">
            <Header text="Join a judging table"/>
            <div className="inline-flex flex-col items-center justify-center w-full gap-[40px] px-[70px] py-[50px] relative flex-[0_0_auto] bg-anti-flash-white">
              <SelectBox title="Session" option={session} setOption={setSession} allOptions={sessionOptions}/>
              <SelectBox title="Level: Age group" option={level} setOption={setLevel} allOptions={levelOptions}/>
              <SelectBox title="Apparatus" option={apparatus} setOption={setApparatus} allOptions={apparatusOptions}/>
              <Link to="/calculations">
                <BlueButton title="Join"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJudges;