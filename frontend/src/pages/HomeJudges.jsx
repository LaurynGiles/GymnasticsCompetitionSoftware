import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import BlueButton from "../components/BlueButton";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";
import { getActiveTimeSlot, getSessionsByTimeSlot, getEventsBySessionIds, checkEventExists } from "../utils/api.js";

const HomeJudges = () => {

  const [head, setHead] = useState(null);
  const [levelOptions, setLevelOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [apparatusOptions, setApparatusOptions] = useState([]);
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  const [apparatus, setApparatus] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const headJudge = localStorage.getItem("headJudge");
      setHead(headJudge);

      const activeTimeSlot = await getActiveTimeSlot();

      console.log(activeTimeSlot);

      if (activeTimeSlot) {
        const sessions = await getSessionsByTimeSlot(activeTimeSlot.time_slot_id);

        console.log(sessions);

        const uniqueLevels = new Set();
        const uniqueAges = new Set();
        const sessionIds = sessions.map(session => session.session_id);

        sessions.forEach(session => {
          uniqueLevels.add(session.level);
          uniqueAges.add(session.age);
        });

        console.log(sessionIds);
        const events = await getEventsBySessionIds(sessionIds);
        const uniqueApparatus = new Set(events.map(event => event.Apparatus.apparatus_name));

        setLevelOptions(Array.from(uniqueLevels));
        setAgeOptions(Array.from(uniqueAges));
        setApparatusOptions(Array.from(uniqueApparatus));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (levelOptions.length > 0) {
      setLevel(levelOptions[0]);
    }
  }, [levelOptions]);
  
  useEffect(() => {
    if (ageOptions.length > 0) {
      setAge(ageOptions[0]);
    }
  }, [ageOptions]);
  
  useEffect(() => {
    if (apparatusOptions.length > 0) {
      setApparatus(apparatusOptions[0]);
    }
  }, [apparatusOptions]);

  const handleJudgeHome = async () => {
    try {
      console.log(level);
      console.log(age);
      console.log(apparatus);
      const eventExists = await checkEventExists(level, age, apparatus);
      console.log(eventExists);
      if (eventExists) {
        localStorage.setItem("apparatus", apparatus);
        if (head === "false") {
          navigate("/calculationsjudges");
        } else {
          navigate("/lobby");
        }
      } else {
        alert("No event found for the selected options.");
      }
    } catch (error) {
      console.error("Error checking event existence:", error);
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
            {head === "false" ? (
              <Header text="Join a judging table"/>
            ) : (
              <Header text="Start a judging table"/>
            )}
            <div className="inline-flex flex-col items-center justify-center w-full gap-[30px] px-[70px] py-[50px] relative flex-[0_0_auto] bg-anti-flash-white">
              <SelectBox title="Level" option={level} setOption={setLevel} allOptions={levelOptions} optionType={"Level"}/>
              <SelectBox title="Age group" option={age} setOption={setAge} allOptions={ageOptions} optionType={"Age"}/>
              <SelectBox title="Apparatus" option={apparatus} setOption={setApparatus} allOptions={apparatusOptions} optionType={"Apparatus"}/>
              {head === "false" ? (
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