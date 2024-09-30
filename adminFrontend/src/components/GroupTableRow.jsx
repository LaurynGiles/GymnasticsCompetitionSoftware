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
    <div className={`flex items-center py-2.5 bg-anti-flash-white ${error ? 'border border-red-500' : ''}`}>
      <SmallTableBlock text={ID.toString()} />
      <NumberTableBlock value={TimeSlotID} onChange={handleTimeSlotIDChange}/>
      <LargeTableBlock text={formatDate(date)} />
      <SmallTableBlock text={reportTime}/>
      <SmallTableBlock text={compTime}/>
      <SmallTableBlock text={awardTime}/>
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
