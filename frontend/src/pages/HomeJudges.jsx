import React, { useState, useEffect } from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import SelectBox from "../components/SelectBox";
import Header from "../components/Header";
import BlockHeader from "../components/BlockHeader";
import { useNotifications } from "../utils/connection.jsx";
import { getActiveTimeSlot, getSessionsByTimeSlot, getEventsBySessionAndApparatus, getAllApps } from "../utils/api.js";
import EventBox from "../components/EventBox.jsx";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup.jsx";

const HomeJudges = () => {

  const { judgeInfo, navigateToCalculations, setNavigateToCalculations } = useNotifications();

  const [compOptions, setCompOptions] = useState([]);
  const [apparatusOptions, setApparatusOptions] = useState([]);
  const [comp, setComp] = useState("");
  const [apparatusMap, setApparatusMap] = useState({});
  const [apparatus, setApparatus] = useState("")
  const [apparatusId, setApparatusId] = useState(null);
  const [eventBoxes, setEventBoxes] = useState([]);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [noSelect, setNoSelect] = useState(false);

  useEffect(() => {
    if (navigateToCalculations) {
      setNavigateToCalculations(false);
      navigate("/calculationsjudges");
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
      console.log(`Comp set to ${comp}`)
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
        const events = await getEventsBySessionAndApparatus(comp, apparatusId);
        setEventBoxes(events);
      }
    };

    fetchEventBoxes();
  }, [comp, apparatusId]);

  return (
    <div>
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/homejudges"}/>
        </div>
        <div className="inline-flex flex-col h-full w-full items-center overflow-y-auto pt-[75px] pb-[50px] gap-[40px] relative">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col w-[400px] items-center gap-[30px] px-[31px] py-0 relative flex-[0_0_auto]">
            <div className="inline-flex flex-col items-center justify-center w-full gap-[15px] px-[190px] py-[20px] relative flex-[0_0_auto] bg-anti-flash-white">
              <SelectBox noSelect={noSelect} title="Competition" option={comp} setOption={setComp} allOptions={compOptions} optionType={"Competition"}/>
              <SelectBox noSelect={noSelect} title="Apparatus" option={apparatus} setOption={setApparatus} setOptionId={setApparatusId} allOptions={apparatusOptions} allOptionsMap={apparatusMap} optionType={"Apparatus"}/>
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
                group_id={eventBox.eventId}
                apparatus={eventBox.apparatusName}
                levels={eventBox.levels}
                ages={eventBox.ages}
                gymnasts={eventBox.gymnasts}
                comp={comp}
                setShowError={setShowError}
                setError={setError}
                setNoSelect={setNoSelect}
              />
            ))}
            </div>
          </div>
        </div>
        {showError && <Popup message={error} onClose={() => setShowError(false)} />}
      </div>
    </div>
  );
};

export default HomeJudges;