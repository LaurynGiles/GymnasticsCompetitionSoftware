import PropTypes from "prop-types";
import React, { useState } from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";
import NumberTableBlock from "./NumberTableBlock";
import { useNotifications } from "../utils/connection";

const GroupTableRow = ({ ID, TimeSlotID, date, reportTime, compTime, awardTime, onUpdate, error }) => {

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleTimeSlotIDChange = (newTimeSlotID) => {
    onUpdate({
      timeslotId: newTimeSlotID,
    });
  };

  return (
    <div className={`w-full flex justify-start py-2.5 bg-anti-flash-white ${error ? 'border border-red-500' : ''}`}>
      {/* Conditional rendering based on ID */}
      {ID === 1 ? (
        <>
         <SmallTableBlock text={ID.toString()} title={"Group ID"} />
          <NumberTableBlock value={TimeSlotID} onChange={handleTimeSlotIDChange} title={"Timeslot ID"}/>
          <LargeTableBlock text={formatDate(date)} title={"Date"} />
          <SmallTableBlock text={reportTime} title={"Report Time"}/>
          <SmallTableBlock text={compTime} title={"Comp Time"}/>
        </>
      ) : (
        <>
          <SmallTableBlock text={ID.toString()} />
          <NumberTableBlock value={TimeSlotID} onChange={handleTimeSlotIDChange}/>
          <LargeTableBlock text={formatDate(date)}/>
          <SmallTableBlock text={reportTime} />
          <SmallTableBlock text={compTime}/>
        </>
      )}
    </div>
  );
};

GroupTableRow.propTypes = {
    ID: PropTypes.number.isRequired,
    TimeSlotID: PropTypes.number,
    date: PropTypes.string,
    reportTime: PropTypes.string,
    compTime: PropTypes.string,
    awardTime: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
  };
  
  export default GroupTableRow;
