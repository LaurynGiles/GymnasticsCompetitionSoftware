import PropTypes from "prop-types";
import React, { useState } from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";
import NumberTableBlock from "./NumberTableBlock";
import { useNotifications } from "../utils/connection";

const TimeSlotTableRow = ({ ID, TimeSlotID, date, reportTime, compTime, awardTime, onUpdate }) => {
  const [error, setError] = useState(false);
  const { timeslots } = useNotifications(); // Get timeslots from your hook

  const handleTimeSlotIDChange = (newTimeSlotID) => {
    const timeslot = timeslots.find(slot => slot.id === newTimeSlotID);
    console.log(timeslots);
    console.log(timeslot);
    console.log(newTimeSlotID);
    if (timeslot) {
      setError(""); // Clear error if valid
      onUpdate({
        TimeSlotID: newTimeSlotID,
        date: timeslot.date.toString(),
        reportTime: timeslot.reportTime,
        compTime: timeslot.compTime,
        awardTime: timeslot.awardTime,
      });
      console.log(reportTime);
    } else {
      setError("Invalid TimeSlot ID"); // Set error message if not valid
      onUpdate({
        TimeSlotID: newTimeSlotID,
        date: null,
        reportTime: null,
        compTime: null,
        awardTime: null,
      });
    }
  };

  return (
    <div className={`flex items-center gap-10 ${error ? 'border border-red-500' : ''}`}>
      <SmallTableBlock text={ID.toString()} />
      <NumberTableBlock value={TimeSlotID} onChange={handleTimeSlotIDChange}/>
      <LargeTableBlock text={date}/>
      <SmallTableBlock text={reportTime}/>
      <SmallTableBlock text={compTime}/>
      <SmallTableBlock text={awardTime}/>
    </div>
  );
};

TimeSlotTableRow.propTypes = {
    ID: PropTypes.number.isRequired,
    TimeSlotID: PropTypes.number,
    date: PropTypes.string,
    reportTime: PropTypes.string,
    compTime: PropTypes.string,
    awardTime: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
  };
  
  export default TimeSlotTableRow;
