import React, { useState, useEffect } from "react";
import ArrowIcon from "./ArrowIcon";
import SelectOptions from "./SelectOptions";
import { useNotifications } from "../utils/connection.jsx";

const SmallSelectBox = ({ option, setOption, setJudgeId }) => {
  const { joinedJudges } = useNotifications();
  const [showPopup, setShowPopup] = useState(false);
  const [rotateArrow, setRotateArrow] = useState(0);
  const [allOptions, setAllOptions] = useState(["All"]);
  const [judgeMap, setJudgeMap] = useState({});

  useEffect(() => {
    // Get joined judges from localStorage if available
    const storedJoinedJudges = localStorage.getItem("joinedJudges");
    const parsedJoinedJudges = storedJoinedJudges ? JSON.parse(storedJoinedJudges) : [];
    
    // Use the parsed data from localStorage or the real-time `joinedJudges` from `useNotifications`
    const currentJoinedJudges = joinedJudges.length ? joinedJudges : parsedJoinedJudges;

    // Map judge data into `allOptions` and `judgeMap`
    const newJudgeMap = {};
    currentJoinedJudges.forEach(judge => {
      const name = `${judge.first_name} ${judge.last_name}`;
      newJudgeMap[name] = judge.judge_id;
    });
    setAllOptions(["All", ...Object.keys(newJudgeMap)]);
    setJudgeMap({"All": null, ...newJudgeMap});
  }, [joinedJudges]);

  const handleArrowClick = () => {
    setShowPopup(!showPopup);
    setRotateArrow(rotateArrow === 0 ? 180 : 0);
  };

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
    if (setJudgeId) {
      console.log(`Setting judge id to ${judgeMap[selectedOption]}`);
      setJudgeId(judgeMap[selectedOption]); // Set the judge ID in the parent component
    }
    setShowPopup(false);
    setRotateArrow(0);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-6 relative">
      <div className="flex w-full md:w-[80%] lg:w-[70%] xl:w-[40%] h-auto items-center justify-between gap-4 px-4 lg:px-12 py-2 bg-bright-white rounded-3xl border-2 border-glaucous overflow-hidden">
        <div className="flex-1 text-left font-montserrat font-medium text-prussian-blue text-base md:text-lg lg:text-xl">
          {option}
        </div>
        <div onClick={handleArrowClick} className="cursor-pointer">
          <ArrowIcon rotation={rotateArrow} />
        </div>
      </div>
      {showPopup && (
        <SelectOptions
          allOptions={allOptions}
          handleOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
};

export default SmallSelectBox;