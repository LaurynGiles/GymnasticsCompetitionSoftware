import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import BlueButton from "../components/BlueButton";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";
import { useNotifications } from "../utils/connection.jsx";
import { getActiveTimeSlot, getSessionsByTimeSlot, getEventsBySessionIds, checkEventExists } from "../utils/api.js";

const HomeJudges = () => {

  const navigate = useNavigate();
  const { judgeInfo, socket, navigateToCalculations, setNavigateToCalculations, groupId, setGroupId } = useNotifications();

  const [levelOptions, setLevelOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [apparatusOptions, setApparatusOptions] = useState([]);
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  const [apparatus, setApparatus] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (navigateToCalculations) {
      navigate("/calculationsjudges");
      setNavigateToCalculations(false); // Reset navigation flag
    }
  }, [navigateToCalculations, navigate, setNavigateToCalculations]);

  useEffect(() => {
    const fetchData = async () => {
      const activeTimeSlot = await getActiveTimeSlot();

      if (activeTimeSlot) {
        const sessions = await getSessionsByTimeSlot(activeTimeSlot.time_slot_id);

        const uniqueLevels = new Set();
        const uniqueAges = new Set();
        const sessionIds = sessions.map(session => session.session_id);

        sessions.forEach(session => {
          uniqueLevels.add(session.level);
          uniqueAges.add(session.age);
        });
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

  const handleJoinGroup = (group_id) => {
    return new Promise((resolve, reject) => {
      socket.emit('joinGroup', { group_id, judge_id: judgeInfo.judge_id, head_judge: judgeInfo.head_judge, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname }, (response) => {
        if (response.success) {
          if (response.isHeadJudge) {
            setGroupId(group_id);
            resolve('headJudge');
          } else {
            resolve('waitingForApproval');
          }
        } else {
          setErrorMessage(response.error);
          reject(response.error);
        }
      });
    });
  };

  const handleJudgeHome = async () => {
    try {
      const event = await checkEventExists(level, age, apparatus);
      
      if (event.exists) {
        const newGroupID = event.event_id;
        const joinResult = await handleJoinGroup(newGroupID);

        if (joinResult === 'headJudge') {
          navigate("/lobby");
        } else if (joinResult === 'waitingForApproval') {
          setErrorMessage("Your join request has been sent and is waiting for approval.");
        }

      } else {
        console.log("Error: event does not exist");
        setErrorMessage("This event does not exist");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error || "Error connecting to server");
    }
  };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/homejudges"}/>
        </div>
        <div className="inline-flex flex-col h-full w-full items-center overflow-y-auto pt-[75px] gap-[40px] relative">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col w-[400px] items-center gap-[15px] px-[31px] py-0 relative flex-[0_0_auto]">
            {!judgeInfo.head_judge ? (
              <Header text="Join a judging table"/>
            ) : (
              <Header text="Start a judging table"/>
            )}
            <div className="inline-flex flex-col items-center justify-center w-full gap-[30px] px-[70px] py-[50px] relative flex-[0_0_auto] bg-anti-flash-white">
              <SelectBox title="Level" option={level} setOption={setLevel} allOptions={levelOptions} optionType={"Level"}/>
              <SelectBox title="Age group" option={age} setOption={setAge} allOptions={ageOptions} optionType={"Age"}/>
              <SelectBox title="Apparatus" option={apparatus} setOption={setApparatus} allOptions={apparatusOptions} optionType={"Apparatus"}/>
              {!judgeInfo.head_judge ? (
                <div onClick={handleJudgeHome}>
                  <BlueButton title="Join" />
                </div>
              ) : (
                <div onClick={handleJudgeHome}>
                  <BlueButton title="Start" />
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 mb-2 text-center font-montserrat">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJudges;