import PropTypes from "prop-types";
import React from "react";
import TimeInput from "../components/TimeInput"; // Create this component similarly to DateInput

const TimeTableBlock = ({ time, setTime, title }) => {
  return (
    <div className="flex flex-col items-center justify-between w-[200px] relative">
      {/* Render title if provided */}
      {title && (
        <div className="font-montserrat font-medium text-prussian-blue text-base md:text-lg text-center mb-1">
          {title}
        </div>
      )}
      <TimeInput time={time} setTime={setTime} />
    </div>
  );
};

TimeTableBlock.propTypes = {
  time: PropTypes.string,
  setTime: PropTypes.func.isRequired,
  title: PropTypes.string, // Title is optional
};

export default TimeTableBlock;
