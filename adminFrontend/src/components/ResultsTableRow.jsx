import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const ResultsTableRow = ({ gymnast_id, gymnast_name, difficulty, execution, penalty }) => {

    const finalScore = difficulty - execution - penalty;

  return (
    <div className="flex shadow-md justify-start bg-anti-flash-white gap-6 p-2">
      {/* Conditional rendering based on ID */}
      {ID === 1 ? (
        <>
          <SmallTableBlock text={gymnast_id.toString()} title={"Gymnast number"}/>
          <LargeTableBlock text={gymnast_name} title={"Gymnast name"} />
          <LargeTableBlock text={difficulty.toString()} title={"Difficulty score"} />
          <LargeTableBlock text={execution.toString()} title={"Execution score"} />
          <LargeTableBlock text={penalty.toString()} title={"Penalty"} />
          <LargeTableBlock text={finalScore.toString()} title={"Final Score"} /> {/* New block for final score */}
        </>
      ) : (
        <>
          <SmallTableBlock text={gymnast_id.toString()}/>
          <LargeTableBlock text={gymnast_name} />
          <LargeTableBlock text={difficulty.toString()} />
          <LargeTableBlock text={execution.toString()}/>
          <LargeTableBlock text={penalty.toString()}/>
          <LargeTableBlock text={finalScore.toString()} /> {/* New block for final score */}
        </>
      )}
    </div>
  );
};

ResultsTableRow.propTypes = {
    gymnast_id: PropTypes.number.isRequired, // Gymnast ID
    gymnast_name: PropTypes.string.isRequired, // Gymnast name
    judge_name: PropTypes.string.isRequired, // Judge name
    difficulty: PropTypes.number.isRequired, // Difficulty score
    execution: PropTypes.number.isRequired, // Execution score
    penalty: PropTypes.number.isRequired, // Penalty score
};
  

export default ResultsTableRow;