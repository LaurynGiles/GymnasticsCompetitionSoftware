import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import BlueButton from "../components/BlueButton";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";

const HomeJudges = () => {

  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const [level, setLevel] = useState("1");
  const [age, setAge] = useState("07-08");
  const [apparatus, setApparatus] = useState("Vault")

  const levelOptions = ["1", "2", "3"];
  const ageOptions = ["07-08", "09-10", "11-12", "13-over"];
  const apparatusOptions = ["Vault", "High Bar", "Parallel bars", "Floor"];

  const handleJudgeHome = () => {
    if (role === "judge") {
      localStorage.setItem("level", level);
      localStorage.setItem("age", age);
      localStorage.setItem("apparatus", apparatus);
      localStorage.setItem("number", "56");
      localStorage.setItem("name", "Travis Giles");
      navigate("/calculationsjudges");
    } else {
      localStorage.setItem("apparatus", apparatus);
      navigate("/lobby");
    }
    
  };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} />
        </div>
        <div className="inline-flex flex-col h-full w-full items-center overflow-y-auto pt-[75px] gap-[40px] relative">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col w-[400px] items-center gap-[15px] px-[31px] py-0 relative flex-[0_0_auto]">
            {role === "judge" ? (
              <Header text="Join a judging table"/>
            ) : (
              <Header text="Start a judging table"/>
            )}
            <div className="inline-flex flex-col items-center justify-center w-full gap-[30px] px-[70px] py-[50px] relative flex-[0_0_auto] bg-anti-flash-white">
              <SelectBox title="Level" option={level} setOption={setLevel} allOptions={levelOptions} optionType={"Level"}/>
              <SelectBox title="Age group" option={age} setOption={setAge} allOptions={ageOptions} optionType={"Age"}/>
              <SelectBox title="Apparatus" option={apparatus} setOption={setApparatus} allOptions={apparatusOptions} optionType={"Apparatus"}/>
              {role === "judge" ? (
                <div onClick={handleJudgeHome}>
                  <BlueButton title="Join" />
                </div>
              ) : (
                <div onClick={handleJudgeHome}>
                  <BlueButton title="Start" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJudges;