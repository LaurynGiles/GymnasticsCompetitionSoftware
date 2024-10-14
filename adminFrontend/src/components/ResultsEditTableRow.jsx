import PropTypes from "prop-types";
import React, { useState } from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";
import ScoreInputLarge from "./ScoreInputLarge"; // Import NumberInputLarge

const ResultsEditTableRow = ({ gymnast_id, apparatus_name, gymnast_name, difficulty, execution, penalty, onUpdate, isFirstRow }) => {
  const parsedExecution = execution.map(score => 
    typeof score === "string" ? parseFloat(score) : score
  );

  const averageExecutionScore = Array.isArray(parsedExecution) && parsedExecution.length > 0 
    ? parsedExecution.reduce((total, score) => total + score, 0) / parsedExecution.length 
    : 0;

  const allScoresZero = difficulty === 0 && averageExecutionScore === 0 && penalty === 0;

  // Calculate final score
  const finalScore = allScoresZero ? 0 : difficulty - averageExecutionScore - penalty;

  // Handle input for difficulty and penalty, calling onUpdate
  const handleDifficultyChange = (newDifficulty) => {
    const parsedDifficulty = isNaN(newDifficulty) ? 0 : newDifficulty;
    onUpdate({
      difficulty: parsedDifficulty
    });
  };

  const handlePenaltyChange = (newPenalty) => {
    const parsedPenalty = isNaN(newPenalty) ? 0 : newPenalty;
    onUpdate({
      penalty: parsedPenalty
    });
  };

  // Function to format scores
  const formatScore = (num) => {
    return allScoresZero ? "-" : num.toFixed(3);
  };

  return (
    <div className="flex shadow-md hover:shadow-lg hover:cursor-pointer justify-start bg-anti-flash-white gap-6 p-2">
      {/* Conditional rendering based on ID */}
      {isFirstRow ? (
        <>
          <SmallTableBlock text={gymnast_id.toString()} title={"Gymnast number"} />
          <LargeTableBlock text={gymnast_name} title={"Gymnast name"} />
          <LargeTableBlock text={apparatus_name} title={"Apparatus"} />

          {/* Use NumberInputLarge for difficulty */}
          <ScoreInputLarge 
            value={difficulty}
            onChange={handleDifficultyChange}
            title="Difficulty"
            hasError={false}
          />

          <LargeTableBlock text={formatScore(averageExecutionScore)} title={"Execution"} />

          {/* Use NumberInputLarge for penalty */}
          <ScoreInputLarge 
            value={penalty}
            onChange={handlePenaltyChange}
            title="Penalty"
            hasError={false}
          />

          
          <LargeTableBlock text={formatScore(finalScore)} title={"Final Score"} /> {/* New block for final score */}
        </>
      ) : (
        <>
          <SmallTableBlock text={gymnast_id.toString()} />
          <LargeTableBlock text={gymnast_name} />
          <LargeTableBlock text={apparatus_name} />

          {/* Use NumberInputLarge for difficulty */}
          <ScoreInputLarge 
            value={difficulty}
            onChange={handleDifficultyChange}
            hasError={false}
          />


          <LargeTableBlock text={formatScore(averageExecutionScore)} />
          
          {/* Use NumberInputLarge for penalty */}
          <ScoreInputLarge 
            value={penalty}
            onChange={handlePenaltyChange}
            hasError={false}
          />

          <LargeTableBlock text={formatScore(finalScore)} /> {/* New block for final score */}
        </>
      )}
    </div>
  );
};

ResultsEditTableRow.propTypes = {
  gymnast_id: PropTypes.number.isRequired, // Gymnast ID
  gymnast_name: PropTypes.string.isRequired, // Gymnast name
  apparatus_name: PropTypes.string.isRequired, // Apparatus name
  difficulty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Difficulty score
  execution: PropTypes.array.isRequired, // Execution scores
  penalty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to update parent state
  isFirstRow: PropTypes.bool.isRequired, // Indicates if this is the first row
};

export default ResultsEditTableRow;
