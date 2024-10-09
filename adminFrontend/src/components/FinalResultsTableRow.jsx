import PropTypes from "prop-types";
import React from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const FinalResultsTableRow = ({ gymnast_id, apparatus_list, gymnast_name, final_score, isFirstRow }) => {
  // Set a default value for final_score if it is undefined
  const safeFinalScore = final_score !== undefined ? final_score : 0;

  return (
    <div className="flex shadow-md justify-start bg-anti-flash-white gap-6 p-2">
      {/* Conditional rendering based on ID */}
      {isFirstRow ? (
        <>
          <SmallTableBlock text={gymnast_id.toString()} title={"Gymnast number"} />
          <LargeTableBlock text={gymnast_name} title={"Gymnast name"} />
          
          {/* Check if apparatus_list is defined and has entries */}
          {apparatus_list && Object.keys(apparatus_list).length > 0 ? (
            Object.entries(apparatus_list).map(([apparatus_name, apparatus_score]) => (
              <SmallTableBlock 
                key={apparatus_name}
                text={apparatus_score.toFixed(3)} // Format the score to 3 decimal places
                title={apparatus_name} // Set the title to the apparatus name
              />
            ))
          ) : (
            <SmallTableBlock text={"N/A"} title={"Apparatus Scores"} /> // Display N/A if there are no scores
          )}

          <LargeTableBlock text={safeFinalScore.toFixed(3)} title={"Total Score"} /> {/* Total Score */}
        </>
      ) : (
        <>
          <SmallTableBlock text={gymnast_id.toString()} />
          <LargeTableBlock text={gymnast_name} />

          {/* Check if apparatus_list is defined and has entries */}
          {apparatus_list && Object.keys(apparatus_list).length > 0 ? (
            Object.entries(apparatus_list).map(([apparatus_name, apparatus_score]) => (
              <SmallTableBlock 
                key={apparatus_name}
                text={apparatus_score.toFixed(3)} // Format the score to 3 decimal places
              />
            ))
          ) : (
            <SmallTableBlock text={"N/A"} /> // Display N/A if there are no scores
          )}

          <LargeTableBlock text={safeFinalScore.toFixed(3)} /> {/* Total Score */}
        </>
      )}
    </div>
  );
};

FinalResultsTableRow.propTypes = {
  gymnast_id: PropTypes.number.isRequired, // Gymnast ID
  gymnast_name: PropTypes.string.isRequired, // Gymnast name
  apparatus_list: PropTypes.object, // List of apparatuses and their final scores (optional)
  final_score: PropTypes.number, // Total final score (optional)
};

export default FinalResultsTableRow;