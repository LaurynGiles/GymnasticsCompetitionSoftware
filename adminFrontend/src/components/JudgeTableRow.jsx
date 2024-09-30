import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import NumberTableBlock from "./NumberTableBlock";
import TextTableBlock from "./TextTableBlock";

const JudgeTableRow = ({ ID, GSAId, f_name, l_name, club, level, headJudge, role, onUpdate }) => {

  const handleGSAIDChange = (newGSAID) => {
    const parsedGSAID = newGSAID === "" ? null : parseInt(newGSAID, 10);
    onUpdate({
      GSAId: isNaN(parsedGSAID) ? null : parsedGSAID,
    });
  };

  const handleFirstNameChange = (newFirstName) => {
    onUpdate({
      f_name: newFirstName,
    });
  };

  const handleLastNameChange = (newLastName) => {
    onUpdate({
      l_name: newLastName,
    });
  };

  const handleClubChange = (newClub) => {
    onUpdate({
      club: newClub,
    });
  };

  const handleLevelChange = (newLevel) => {
    const parsedLevel = newLevel === "" ? null : parseInt(newLevel, 10);
    onUpdate({
      level: isNaN(parsedLevel) ? null : parsedLevel,
    });
  };

  const handleRoleChange = (newRole) => {
    onUpdate({
      role: newRole,
    });
  };

  const handleHeadJudgeChange = (newHeadJudge) => {
    onUpdate({
      headJudge: newHeadJudge,
    });
  };

  return (
    <div className="flex justify-center bg-anti-flash-white px-4 gap-2 py-2.5">
      <SmallTableBlock text={ID.toString()} />
      <NumberTableBlock value={GSAId} onChange={handleGSAIDChange} />
      <TextTableBlock value={f_name} onChange={handleFirstNameChange} />
      <TextTableBlock value={l_name} onChange={handleLastNameChange} />
      <TextTableBlock value={club} onChange={handleClubChange} />
      <NumberTableBlock value={level} onChange={handleLevelChange} />
      <TextTableBlock value={role} onChange={handleRoleChange} />
      <TextTableBlock value={headJudge ? "Yes" : "No"} onChange={handleHeadJudgeChange} />
    </div>
  );
};

JudgeTableRow.propTypes = {
  ID: PropTypes.number.isRequired,
  GSAId: PropTypes.number, // Assuming GSAId is a number
  f_name: PropTypes.string, // First name of the judge
  l_name: PropTypes.string, // Last name of the judge
  club: PropTypes.string, // Judge's club
  level: PropTypes.number, // Judge's level
  headJudge: PropTypes.bool, // Indicates if the judge is a head judge
  role: PropTypes.string, // Role of the judge
  onUpdate: PropTypes.func.isRequired,
};

export default JudgeTableRow;
