import React, {useState, useEffect} from "react";
import SmallBlueButton from "../components/SmallBlueButton";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../utils/connection.jsx";

const TotalDeductionsBlock = ({ total, values }) => {

  const navigate = useNavigate();
  const { judgeInfo, groupId, setDeductionTotal, socket, headOfGroup } = useNotifications();

  const handleSubmitClick = () => {
    console.log(total);
    setDeductionTotal(total);
    console.log(values);

    socket.emit('submitDeduction', { 
      groupId, 
      judgeId: judgeInfo.judge_id, 
      firstName: judgeInfo.judge_fname, 
      lastName: judgeInfo.judge_lname, 
      deduction: total,
      analysis: values
    });

    if (!headOfGroup) {
      navigate("/scorecardjudges");
    } else {
      navigate("/startingscore");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center py-4 md:py-6 bg-light-periwinkle w-[95%] lg:w-[50%] md:w-[70%]">
      <div className="flex flex-row items-center justify-center gap-8 md:gap-16 lg:gap-32">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="font-montserrat font-medium text-prussian-blue text-lg md:text-xl lg:text-2xl text-center">
            Total:
          </div>
          <div className="font-montserrat font-semibold text-prussian-blue text-lg md:text-xl lg:text-2xl text-center">
            {parseFloat(total).toFixed(3)}
          </div>
        </div>
          <SmallBlueButton title="Submit" onClick={handleSubmitClick}/>
      </div>
    </div>
  );
};

export default TotalDeductionsBlock;