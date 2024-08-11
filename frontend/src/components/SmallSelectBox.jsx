import React, { useState, useEffect } from "react";
import ArrowIcon from "./ArrowIcon";
import SelectOptions from "./SelectOptions";
import { useNotifications } from "../utils/connection.jsx";

const SmallSelectBox = ({ option , setOption }) => {

  const { joinedJudges } = useNotifications();
  const [showPopup, setShowPopup] = useState(false);
  const [rotateArrow, setRotateArrow] = useState(0);
  const [allOptions, setAllOptions] = useState(["All"]);

  useEffect(() => {
    const options = ["All"].concat(joinedJudges.map(judge => `${judge.judge_fname} ${judge.judge_lname}`));
    setAllOptions(options);
  }, [joinedJudges]);

  const handleArrowClick = () => {
    setShowPopup(!showPopup);
    setRotateArrow(rotateArrow === 0 ? 180 : 0);
  };

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
    setShowPopup(false);
    setRotateArrow(0);
  };

  return (
    <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
      <div className="flex w-[230px] h-[40px] items-center justify-center gap-[20px] px-[15px] py-[8px] relative flex-[0_0_auto] bg-bright-white rounded-[20px] overflow-hidden border-2 border-solid border-[#6279b8]">
        <div className="relative w-[185px] mt-[1.00px] font-montserrat font-medium text-prussian-blue text-[18px] tracking-[0] leading-[normal]">
          {option}
        </div>
        <div onClick={handleArrowClick}>
          <ArrowIcon rotation={rotateArrow}/>
        </div>
      </div>
      {showPopup && <SelectOptions allOptions={allOptions} handleOptionClick={handleOptionClick} />}
    </div>
  );
};

export default SmallSelectBox;