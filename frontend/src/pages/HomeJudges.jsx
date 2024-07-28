import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import BlueButton from "../components/BlueButton";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";
import { useNotifications } from "../utils/connection.jsx";
import { getActiveTimeSlot, getSessionsByTimeSlot, getEventsBySessionAndApparatus, getAllApps } from "../utils/api.js";
import EventBox from "../components/EventBox.jsx";

const HomeJudges = () => {

  const navigate = useNavigate();
  const { judgeInfo, socket, navigateToCalculations, setNavigateToCalculations, groupId, setGroupId } = useNotifications();

  const [compOptions, setCompOptions] = useState([]);
  const [apparatusOptions, setApparatusOptions] = useState([]);
  const [comp, setComp] = useState("");
  const [apparatusMap, setApparatusMap] = useState({});
  const [apparatus, setApparatus] = useState("")
  const [apparatusId, setApparatusId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventBoxes, setEventBoxes] = useState([]);

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

        const apps = await getAllApps();

        const setSessions = new Set();
        const apparatusMap = {};

        sessions.forEach(session => {
          setSessions.add(session.session_id);
        });

        apps.forEach(app => {
          apparatusMap[app.apparatus_name] = app.apparatus_id;
        });

        setCompOptions(Array.from(setSessions));
        setApparatusOptions(Object.keys(apparatusMap));
        setApparatusMap(apparatusMap);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    if (compOptions.length > 0) {
      setComp(compOptions[0]);
    }
  }, [compOptions]);
  
  useEffect(() => {
    if (apparatusOptions.length > 0) {
      setApparatus(apparatusOptions[0]);
      setApparatusId(apparatusMap[apparatusOptions[0]]);
    }
  }, [apparatusOptions]);

  useEffect(() => {
    const fetchEventBoxes = async () => {
      if (comp && apparatusId) {
        console.log(apparatusId);
        const events = await getEventsBySessionAndApparatus(comp, apparatusId);
        console.log("here");
        console.log(events);
        setEventBoxes(events);
      }
    };

    fetchEventBoxes();
  }, [comp, apparatusId]);

  // const handleJoinGroup = (group_id) => {
  //   return new Promise((resolve, reject) => {
  //     socket.emit('joinGroup', { group_id, judge_id: judgeInfo.judge_id, head_judge: judgeInfo.head_judge, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname }, (response) => {
  //       if (response.success) {
  //         if (response.isHeadJudge) {
  //           setGroupId(group_id);
  //           resolve('headJudge');
  //         } else {
  //           resolve('waitingForApproval');
  //         }
  //       } else {
  //         setErrorMessage(response.error);
  //         reject(response.error);
  //       }
  //     });
  //   });
  // };

  // const handleJudgeHome = async () => {
  //   try {
  //     const event = await checkEventExists(level, age, apparatus);
      
  //     if (event.exists) {
  //       const newGroupID = event.event_id;
  //       const joinResult = await handleJoinGroup(newGroupID);

  //       if (joinResult === 'headJudge') {
  //         navigate("/lobby");
  //       } else if (joinResult === 'waitingForApproval') {
  //         setErrorMessage("Your join request has been sent and is waiting for approval.");
  //       }

  //     } else {
  //       console.log("Error: event does not exist");
  //       setErrorMessage("This event does not exist");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setErrorMessage(error || "Error connecting to server");
  //   }
  // };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/homejudges"}/>
        </div>
        <div className="inline-flex flex-col h-full w-full items-center overflow-y-auto pt-[75px] gap-[40px] relative">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col w-[400px] items-center gap-[30px] px-[31px] py-0 relative flex-[0_0_auto]">
            <div className="inline-flex flex-col items-center justify-center w-full gap-[15px] px-[190px] py-[20px] relative flex-[0_0_auto] bg-anti-flash-white">
              <SelectBox title="Competition" option={comp} setOption={setComp} allOptions={compOptions} optionType={"Competition"}/>
              <SelectBox title="Apparatus" option={apparatus} setOption={setApparatus} setOptionId={setApparatusId} allOptions={apparatusOptions} allOptionsMap={apparatusMap} optionType={"Apparatus"}/>
              {/* {!judgeInfo.head_judge ? (
                <div onClick={handleJudgeHome}>
                  <BlueButton title="Join" />
                </div>
              ) : (
                <div onClick={handleJudgeHome}>
                  <BlueButton title="Start" />
                </div>
              )} */}
              {errorMessage && (
                <div className="text-red-500 mb-2 text-center font-montserrat">{errorMessage}</div>
              )}
            </div>
            <div className="inline-flex flex-col items-center justify-center w-full gap-[15px] relative flex-[0_0_auto]">
              {!judgeInfo.head_judge ? (
                <Header text="Join a judging table"/>
              ) : (
                <Header text="Start a judging table"/>
              )}
              {eventBoxes.map(eventBox => (
              <EventBox
                key={eventBox.eventId}
                apparatus={eventBox.apparatusName}
                levels={eventBox.levels}
                ages={eventBox.ages}
              />
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeJudges;