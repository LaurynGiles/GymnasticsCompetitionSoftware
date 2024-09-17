import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import DateTableBlock from "./DateTableBlock";
import TimeTableBlock from "./TimeTableBlock";
import NumberTableBlock from "./NumberTableBlock";
import TextTableBlock from "./TextTableBlock";
import DateInput from "./DateInput";
import SmallTextTableBlock from "./SmallTextTableBlock";

const GymnastTableRow = ({ ID, GSAId, name, club, district, level, dateOfBirth, ageGroup, gymnastGroup, onUpdate }) => {

  const handleGSAIDChange = (newGSAID) => {
    const parsedGSAID = newGSAID === "" ? null : parseInt(newGSAID, 10);
    onUpdate({
      GSAId: isNaN(parsedGSAID) ? null : parsedGSAID,
    });
  };

  const handleNameChange = (newName) => {
    onUpdate({
      name: newName,
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

  const handleGroupChange = (newGroup) => {
    const parsedGroup = newGroup === "" ? null : parseInt(newGroup, 10);
    onUpdate({
      gymnastGroup: isNaN(parsedGroup) ? null : parsedGroup,
    });
  };

  return (
    <div className="flex justify-center gap-2 py-2.5">
      <SmallTableBlock text={ID.toString()} />
      <NumberTableBlock value={GSAId} onChange={handleGSAIDChange}/>
      <TextTableBlock value={name} onChange={handleNameChange}/>
      <TextTableBlock value={club} onChange={handleClubChange}/>
      <SmallTextTableBlock value={district} onChange={handleDistrictChange}/>
      <NumberTableBlock value={level} onChange={handleLevelChange}/>
      <DateInput date={dateOfBirth} setDate={handleDOBChange}/>
      <SmallTableBlock text={ageGroup} />
      <NumberTableBlock value={gymnastGroup} onChange={handleGroupChange}/>
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