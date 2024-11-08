import PropTypes from "prop-types";
import React from "react";
import ScoreInputLarge from "./ScoreInputLarge"; // Import ScoreInputLarge component

const JudgeEditTableRow = ({ judges, executions, setExecutions }) => {
  
  // Handle input changes for the specific execution
  const handleExecutionChange = (index, newExecution) => {
    const updatedExecutions = [...executions];
    updatedExecutions[index] = newExecution; // Update the execution at the specific index
    setExecutions(updatedExecutions); // Call the update function to update executions state
  };

  return (
    <div className="flex shadow-md justify-center bg-bright-white gap-2 py-2">

      {/* Mapping judges and executions with ScoreInputLarge */}
      {judges.map((judgeId, index) => (
        <ScoreInputLarge
          key={judgeId} // Use judgeId as the key
          value={executions[index]} // Bind the corresponding execution deduction
          onChange={(newExecution) => handleExecutionChange(index, newExecution)} // Handle the change for each score
          title={`Judge ${judgeId}`} // Display the judge ID as the title
          hasError={false} // Optionally handle error states
        />
      ))}
    </div>
  );
};

JudgeEditTableRow.propTypes = {
  judges: PropTypes.array.isRequired, // Array of judge IDs
  executions: PropTypes.array.isRequired, // Array of execution deductions
  setExecutions: PropTypes.func.isRequired, // Function to update the executions array
};

export default JudgeEditTableRow;