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

  const saveStateToLocalStorage = () => {
    console.log(comp);
    console.log(apparatus);
    console.log(apparatusId);
    if (comp && apparatus && apparatusId) {
      console.log("Saving state");
      const state = {
        comp,
        apparatus,
        apparatusId,
        noSelect
      };

      localStorage.setItem('homeJudgesState', JSON.stringify(state));
    }
  };

  useEffect(() => {
    if (navigateToCalculations) {
      setNavigateToCalculations(false);
      navigate("/calculationsjudges");
    }
  }, [navigateToCalculations, navigate, setNavigateToCalculations]);

  useEffect(() => {
    const loadStateFromLocalStorage = () => {
      const savedState = localStorage.getItem('homeJudgesState');
      console.log(savedState);
      if (savedState) {
        console.log("Loading state");
        const state = JSON.parse(savedState);
        setComp(state.comp || "");
        setApparatus(state.apparatus || "");
        setApparatusId(state.apparatusId || null);
        setNoSelect(state.noSelect);
      }
    };

    loadStateFromLocalStorage();

    const fetchData = async () => {
        const activeTimeSlot = await getActiveTimeSlot();

        if (activeTimeSlot) {
          const sessions = await getSessionsByTimeSlot(activeTimeSlot.time_slot_id);
          const apps = await getAllApps();
          const setSessions = new Set(sessions.map(session => session.session_id));
          const newApparatusMap = apps.reduce((acc, app) => ({ ...acc, [app.apparatus_name]: app.apparatus_id }), {});

          setCompOptions(Array.from(setSessions));
          setApparatusOptions(Object.keys(newApparatusMap));
          setApparatusMap(newApparatusMap);

          // Set defaults only if no saved state exists
          if (!localStorage.getItem('homeJudgesState')) {
            setComp(setSessions.size > 0 ? setSessions.values().next().value : "");
            if (Object.keys(newApparatusMap).length > 0) {
              const firstApp = Object.keys(newApparatusMap)[0];
              setApparatus(firstApp);
              setApparatusId(newApparatusMap[firstApp]);
            }
          }

        }
    };

    fetchData();
  
    return saveStateToLocalStorage;

  }, []);

  useEffect(() => {
    if (comp && apparatusId) {
      const fetchEventBoxes = async () => {
        const events = await getEventsBySessionAndApparatus(comp, apparatusId);
        setEventBoxes(events);
      };

      fetchEventBoxes();
    }
  }, [comp, apparatusId]);

  useEffect(() => {
      saveStateToLocalStorage();
  }, [comp, apparatus, apparatusId]);

  return (
    <div>
      <div className="bg-bright-white w-full min-h-screen">
        <div className="w-full fixed top-0 left-0 z-10 bg-bright-white">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} currPage={"/homejudges"}/>
        </div>
        <div className="flex flex-col w-full items-center overflow-y-auto pt-20 pb-12 gap-10">
          <BlockHeader text="District MAG Trials Levels 1-3"/>
          <div className="flex flex-col w-full items-center px-8 gap-8">
          <div className="flex flex-col md:flex-row items-center md:justify-center w-full md:w-3/5 bg-anti-flash-white py-5 px-4 gap-4 md:gap-24 rounded-[10px]">
              <SelectBox noSelect={noSelect} title="Competition" option={comp} setOption={setComp} allOptions={compOptions} optionType={"Competition"}/>
              <SelectBox noSelect={noSelect} title="Apparatus" option={apparatus} setOption={setApparatus} setOptionId={setApparatusId} allOptions={apparatusOptions} allOptionsMap={apparatusMap} optionType={"Apparatus"}/>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
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