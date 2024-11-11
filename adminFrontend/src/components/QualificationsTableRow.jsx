import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import SmallTableBlock from "./SmallTableBlock";
import LargeTableBlock from "./LargeTableBlock";

const QualificationsTableRow = ({ gymnast_id, gymnast_name, final_score, isFirstRow }) => {
  const [medal, setMedal] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const safeFinalScore = final_score !== undefined ? final_score : 0;

  useEffect(() => {
    // Load competition and qualification data from localStorage
    const competitionData = localStorage.getItem("currentCompetition");
    const qualificationsData = localStorage.getItem("currQualifications");

    if (competitionData) {
      const { bronze_min_score, silver_min_score, gold_min_score } = JSON.parse(competitionData);

      // Determine the medal based on score thresholds
      const getMedal = (score) => {
        if (score >= gold_min_score) return "Gold";
        if (score >= silver_min_score) return "Silver";
        if (score >= bronze_min_score) return "Bronze";
        return "No Medal";
      };

      setMedal(getMedal(safeFinalScore));
    }

    // Parse qualifications data if available
    if (qualificationsData) {
      setQualifications(JSON.parse(qualificationsData));
    }
  }, [safeFinalScore]);

  return (
    <div className="flex shadow-md justify-start bg-anti-flash-white gap-6 p-2">
      {isFirstRow ? (
        <>
          <SmallTableBlock text={gymnast_id.toString()} title={"Gymnast number"} />
          <LargeTableBlock text={gymnast_name} title={"Gymnast name"} />

          <LargeTableBlock text={safeFinalScore.toFixed(3)} title={"Total Score"} /> {/* Total Score */}

          {/* Display each qualification name and if the gymnast qualified */}
          {qualifications.map((qualification) => (
            <React.Fragment key={qualification.qualification_id}>
              {/* <LargeTableBlock text={qualification.name} title={"Qualification"} /> */}
              <SmallTableBlock
                text={safeFinalScore >= qualification.min_score ? "Yes" : "No"}
                title={qualification.name}
              />
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          <SmallTableBlock text={gymnast_id.toString()} />
          <LargeTableBlock text={gymnast_name} />

          <LargeTableBlock text={safeFinalScore.toFixed(3)} /> {/* Total Score */}

          {/* Display each qualification and if the gymnast qualified */}
          {qualifications.map((qualification) => (
            <React.Fragment key={qualification.qualification_id}>
              {/* <LargeTableBlock text={qualification.name} /> */}
              <SmallTableBlock
                text={safeFinalScore >= qualification.min_score ? "Yes" : "No"}
              />
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

QualificationsTableRow.propTypes = {
  gymnast_id: PropTypes.number.isRequired, // Gymnast ID
  gymnast_name: PropTypes.string.isRequired, // Gymnast name
  final_score: PropTypes.number, // Total final score (optional)
};

export default QualificationsTableRow;