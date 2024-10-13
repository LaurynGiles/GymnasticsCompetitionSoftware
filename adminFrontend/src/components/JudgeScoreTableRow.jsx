import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const ResultsTableRow = ({ gymnast_id, judges, executions }) => {
  return (
    <div className="flex shadow-md justify-center bg-anti-flash-white gap-6 p-2">

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

ResultsTableRow.propTypes = {
  gymnast_id: PropTypes.number.isRequired, // Gymnast ID
  judges: PropTypes.array.isRequired, // Array of judge IDs
  executions: PropTypes.array.isRequired, // Array of execution deductions
};

export default ResultsTableRow;