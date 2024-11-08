import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const JudgeScoreTableRow = ({ judges, executions }) => {
  return (
    <div className="flex shadow-md justify-center bg-bright-white gap-2 pt-2">

      {/* Mapping judges and executions */}
      {judges.map((judgeId, index) => (
        <SmallTableBlock
          key={judgeId} // Use judgeId as the key
          text={[executions[index]]} // Get the execution deduction for this judge
          title={`Judge ${judgeId}`} // Display the judge ID
        />
      ))}
    </div>
  );
};

JudgeScoreTableRow.propTypes = {
  judges: PropTypes.array.isRequired, // Array of judge IDs
  executions: PropTypes.array.isRequired, // Array of execution deductions
};

export default JudgeScoreTableRow;