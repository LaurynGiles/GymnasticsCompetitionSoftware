import PropTypes from "prop-types";
import React, { useState } from "react";
import TimeInput from "../components/TimeInput"; // Create this component similarly to DateInput

const TimeTableBlock = ({ time, setTime }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[200px] py-2 px-4 relative">
      <TimeInput time={time} setTime={setTime} />
    </div>
  );
};

TimeTableBlock.propTypes = {
  time: PropTypes.instanceOf(Date),
  setTime: PropTypes.func.isRequired,
};

export default TimeTableBlock;