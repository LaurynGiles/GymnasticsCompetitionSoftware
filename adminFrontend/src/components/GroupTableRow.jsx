import PropTypes from "prop-types";
import React, { useState } from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";
import NumberTableBlock from "./NumberTableBlock";
import { useNotifications } from "../utils/connection";
import DropdownTableBlock from "./DropDownTableBlock";

const GroupTableRow = ({ ID, TimeSlotID, date, reportTime, compTime, awardTime, selectedNumSessions, numSessions, onUpdate, error, showTitle }) => {

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

  const handleNumSessionsChange = (newNumSessions) => {
    console.log(`new session value: ${newNumSessions}`);

    // Convert "A", "B", "C" to 1, 2, 3 respectively
    let parsedNumSessions;
    switch (newNumSessions) {
      case "A":
        parsedNumSessions = 1;
        break;
      case "B":
        parsedNumSessions = 2;
        break;
      case "C":
        parsedNumSessions = 3;
        break;
      default:
        parsedNumSessions = null; // Handle any unexpected values
    }

    onUpdate({
      selectedNumSessions: parsedNumSessions,
    });
  };

  const getSessionLetter = (number) => {
    switch (number) {
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "C";
      default:
        return "";
    }
  }

  const getOptions = () => {
    switch (numSessions) {
      case 1:
        return ["A"];
      case 2:
        return ["A", "B"];
      case 3:
        return ["A", "B", "C"];
      default:
        return [];
    }
  };

  const options = getOptions();

  return (
    <div className={`w-full flex justify-start shadow-md px-2 py-2.5 bg-anti-flash-white ${error ? 'border border-red-500' : ''}`}>
      {/* Conditional rendering based on ID */}
      {showTitle ? (
        <>
         <SmallTableBlock text={ID.toString()} title={"Group ID"} />
          <NumberTableBlock value={TimeSlotID} onChange={handleTimeSlotIDChange} title={"Timeslot ID"}/>
          <LargeTableBlock text={formatDate(date)} title={"Date"} />
          <SmallTableBlock text={reportTime} title={"Report Time"}/>
          <SmallTableBlock text={compTime} title={"Comp Time"}/>
          <SmallTableBlock text={awardTime} title={"Award Time"}/>
          <DropdownTableBlock 
              value={getSessionLetter(selectedNumSessions)} 
              onChange={handleNumSessionsChange} 
              options={options}
              title="Competition"
            />
        </>
      ) : (
        <>
          <SmallTableBlock text={ID.toString()} />
          <NumberTableBlock value={TimeSlotID} onChange={handleTimeSlotIDChange}/>
          <LargeTableBlock text={formatDate(date)}/>
          <SmallTableBlock text={reportTime} />
          <SmallTableBlock text={compTime}/>
          <SmallTableBlock text={awardTime}/>
          <DropdownTableBlock 
              value={getSessionLetter(selectedNumSessions)} 
              onChange={handleNumSessionsChange} 
              options={options}
            />
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
    selectedNumSessions: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
  };
  
  export default GroupTableRow;
