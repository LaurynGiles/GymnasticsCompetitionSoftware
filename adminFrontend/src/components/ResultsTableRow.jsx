import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const ResultsTableRow = ({ gymnast_id, apparatus_name, gymnast_name, difficulty, execution, penalty, isFirstRow }) => {

  const averageExecutionScore = Array.isArray(execution) && execution.length > 0 
    ? execution.reduce((total, score) => total + score, 0) / execution.length 
    : 0;

  const allScoresZero = difficulty === 0 && averageExecutionScore === 0 && penalty === 0;

  // Calculate final score
  const finalScore = allScoresZero ? 0 : difficulty - averageExecutionScore - penalty;

  // Function to format scores
  const formatScore = (num) => {
    return allScoresZero ? "-" : num.toFixed(3);
  };

  return (
      <div className="flex shadow-md justify-start bg-anti-flash-white gap-6 p-2">
        {/* Conditional rendering based on ID */}
        {isFirstRow ? (
          <>
            <SmallTableBlock text={gymnast_id.toString()} title={"Gymnast number"}/>
            <LargeTableBlock text={gymnast_name} title={"Gymnast name"} />
            <LargeTableBlock text={apparatus_name} title={"Apparatus"} />
            <LargeTableBlock text={formatScore(difficulty)} title={"Difficulty score"} />
            <LargeTableBlock text={formatScore(averageExecutionScore)} title={"Execution score"} />
            <LargeTableBlock text={formatScore(penalty)} title={"Penalty"} />
            <LargeTableBlock text={formatScore(finalScore)} title={"Final Score"} /> {/* New block for final score */}
          </>
        ) : (
          <>
            <SmallTableBlock text={gymnast_id.toString()}/>
            <LargeTableBlock text={gymnast_name} />
            <LargeTableBlock text={apparatus_name} />
            <LargeTableBlock text={formatScore(difficulty)} />
            <LargeTableBlock text={formatScore(averageExecutionScore)}/>
            <LargeTableBlock text={formatScore(penalty)}/>
            <LargeTableBlock text={formatScore(finalScore)} /> {/* New block for final score */}
          </>
        )}
      </div>
  );
};

ResultsTableRow.propTypes = {
    gymnast_id: PropTypes.number.isRequired, // Gymnast ID
    gymnast_name: PropTypes.string.isRequired, // Gymnast name
    apparatus_name: PropTypes.string.isRequired, // Judge name
    difficulty: PropTypes.number.isRequired, // Difficulty score
    execution: PropTypes.number.isRequired, // Execution score
    penalty: PropTypes.number.isRequired, // Penalty score
};
  

export default ResultsTableRow;