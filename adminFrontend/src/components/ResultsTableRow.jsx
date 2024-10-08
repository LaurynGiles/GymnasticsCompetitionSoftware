import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const ResultsTableRow = ({ gymnast_id, apparatus, gymnast_name, difficulty, execution, penalty, isFirstRow }) => {

  const finalScore = difficulty - execution - penalty;

  // Function to format numbers to three decimal places
  const formatNumber = (num) => {
      return num.toFixed(3);
  };

  return (
      <div className="flex shadow-md justify-start bg-anti-flash-white gap-6 p-2">
        {/* Conditional rendering based on ID */}
        {isFirstRow ? (
          <>
            <SmallTableBlock text={gymnast_id.toString()} title={"Gymnast number"}/>
            <LargeTableBlock text={gymnast_name} title={"Gymnast name"} />
            <LargeTableBlock text={apparatus} title={"Apparatus"} />
            <LargeTableBlock text={formatNumber(difficulty)} title={"Difficulty score"} />
            <LargeTableBlock text={formatNumber(execution)} title={"Execution score"} />
            <LargeTableBlock text={formatNumber(penalty)} title={"Penalty"} />
            <LargeTableBlock text={formatNumber(finalScore)} title={"Final Score"} /> {/* New block for final score */}
          </>
        ) : (
          <>
            <SmallTableBlock text={gymnast_id.toString()}/>
            <LargeTableBlock text={gymnast_name} />
            <LargeTableBlock text={apparatus} />
            <LargeTableBlock text={formatNumber(difficulty)} />
            <LargeTableBlock text={formatNumber(execution)}/>
            <LargeTableBlock text={formatNumber(penalty)}/>
            <LargeTableBlock text={formatNumber(finalScore)} /> {/* New block for final score */}
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