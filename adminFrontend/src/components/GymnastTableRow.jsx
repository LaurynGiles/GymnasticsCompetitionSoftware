import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import DateTableBlock from "./DateTableBlock";
import TimeTableBlock from "./TimeTableBlock";
import NumberTableBlock from "./NumberTableBlock";
import TextTableBlock from "./TextTableBlock";
import DateInput from "./DateInput";
import SmallTextTableBlock from "./SmallTextTableBlock";
import XIcon from "./XIcon";
import DropdownTableBlock from "./DropDownTableBlock";

const GymnastTableRow = ({ ID, GSAId, f_name, l_name, club, district, level, dateOfBirth, ageGroup, gymnastGroup, onUpdate, groupError }) => {

  const handleGSAIDChange = (newGSAID) => {
    const parsedGSAID = newGSAID === "" ? null : parseInt(newGSAID, 10);
    onUpdate({
      GSAId: isNaN(parsedGSAID) ? null : parsedGSAID,
    });
  };

  const handleFNameChange = (newFName) => {
    onUpdate({
      f_name: newFName,
    });
  };


  const handleLNameChange = (newLName) => {
    onUpdate({
      l_name: newLName,
    });
  };

  const handleClubChange = (newClub) => {
    onUpdate({
      club: newClub,
    });
  };

  const handleDistrictChange = (newDistrict) => {
    onUpdate({
      district: newDistrict,
    });
  };

  const handleLevelChange = (newLevel) => {
    const parsedLevel = newLevel === "" ? null : parseInt(newLevel, 10);
    onUpdate({
      level: isNaN(parsedLevel) ? null : parsedLevel,
    });
  };

  const handleDOBChange = (newDOB) => {
    onUpdate({
      dateOfBirth: newDOB,
    });
  };

  const handleAgeGroupChange = (newAgeGroup) => {
    onUpdate({
      ageGroup: newAgeGroup,
    });
  };

  const handleGroupChange = (newGroup) => {
    const parsedGroup = newGroup === "" ? null : parseInt(newGroup, 10);
    onUpdate({
      gymnastGroup: isNaN(parsedGroup) ? null : parsedGroup,
    });
  };

  return (
    <div className={`w-full flex  shadow-md justify-start gap-1 bg-anti-flash-white px-4 py-2.5 ${groupError ? 'border border-red-500' : ''}`}>
      {/* Conditional rendering based on ID */}
      {ID === 1 ? (
        <>
          <SmallTableBlock text={ID.toString()} title={"Gymnast Number"} />
          <NumberTableBlock value={GSAId} title={"GSA ID"} onChange={handleGSAIDChange} />
          <TextTableBlock value={f_name} title="First Name" onChange={handleFNameChange} />
          <TextTableBlock value={l_name} title="Last Name" onChange={handleLNameChange} />
          <TextTableBlock value={club} title="Club" onChange={handleClubChange} />
          <SmallTextTableBlock value={district} title="District" onChange={handleDistrictChange} />
          <NumberTableBlock value={level} title="Level" onChange={handleLevelChange} />
          <DateTableBlock date={dateOfBirth} title="Date of Birth" setDate={handleDOBChange} />
          <DropdownTableBlock 
              value={ageGroup} 
              onChange={handleAgeGroupChange} 
              options={["7-8", "8-9"]} 
              title="Age Group" 
            />
          <NumberTableBlock value={gymnastGroup} title="Gymnast Group" onChange={handleGroupChange} />
        </>
      ) : (
        <>
          <SmallTableBlock text={ID.toString()} />
          <NumberTableBlock value={GSAId} onChange={handleGSAIDChange} />
          <TextTableBlock value={f_name} onChange={handleFNameChange} />
          <TextTableBlock value={l_name} onChange={handleLNameChange} />
          <TextTableBlock value={club} onChange={handleClubChange} />
          <SmallTextTableBlock value={district} onChange={handleDistrictChange} />
          <NumberTableBlock value={level} onChange={handleLevelChange} />
          <DateTableBlock date={dateOfBirth} setDate={handleDOBChange} />
          <DropdownTableBlock 
              value={ageGroup} 
              onChange={handleAgeGroupChange} 
              options={["7-8", "8-9"]}
            />
          <NumberTableBlock value={gymnastGroup} onChange={handleGroupChange} />
        </>
      )}
    </div>
  );
};

GymnastTableRow.propTypes = {
  ID: PropTypes.number.isRequired,
  GSAId: PropTypes.number, // Assuming GSAId is a number
  name: PropTypes.string, // Assuming name is a string
  club: PropTypes.string, // Assuming club is a string
  district: PropTypes.string, // Assuming district is a string
  level: PropTypes.number, // Assuming level is a number
  dateOfBirth: PropTypes.string, // Assuming dateOfBirth is a string
  ageGroup: PropTypes.string, // Assuming ageGroup is a string
  gymnastGroup: PropTypes.number, // Assuming gymnastGroup is a number
  onUpdate: PropTypes.func.isRequired,
};

export default GymnastTableRow;