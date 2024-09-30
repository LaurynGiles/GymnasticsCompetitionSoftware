import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import DateTableBlock from "./DateTableBlock";
import TimeTableBlock from "./TimeTableBlock";

const TimeSlotTableRow = ({ ID, date, reportTime, compTime, awardTime, onUpdate }) => {

  const handleDateChange = (date) => {
    onUpdate({ date });
  };

  const handleReportTimeChange = (time) => {
    onUpdate({ reportTime: time });
  };

  const handleCompTimeChange = (time) => {
    onUpdate({ compTime: time });
  };

  const handleAwardTimeChange = (time) => {
    onUpdate({ awardTime: time });
  };

  return (
    <div className="flex justify-start bg-anti-flash-white gap-6 p-2">
      {/* Conditional rendering based on ID */}
      {ID === 1 ? (
        <>
          <SmallTableBlock text={ID.toString()} title={"Time Slot ID"} />
          <DateTableBlock date={date} setDate={handleDateChange} title={"Date"}/>
          <TimeTableBlock time={reportTime} setTime={handleReportTimeChange} title={"Report Time"}/>
          <TimeTableBlock time={compTime} setTime={handleCompTimeChange} title={"Comp Time"}/>
          <TimeTableBlock time={awardTime} setTime={handleAwardTimeChange} title={"Award Time"}/>
        </>
      ) : (
        <>
          <SmallTableBlock text={ID.toString()} />
          <DateTableBlock date={date} setDate={handleDateChange} />
          <TimeTableBlock time={reportTime} setTime={handleReportTimeChange} />
          <TimeTableBlock time={compTime} setTime={handleCompTimeChange} />
          <TimeTableBlock time={awardTime} setTime={handleAwardTimeChange} />
        </>
      )}
    </div>
  );
};

TimeSlotTableRow.propTypes = {
  ID: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date),
  reportTime: PropTypes.string,
  compTime: PropTypes.string,
  awardTime: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

export default TimeSlotTableRow;