import PropTypes from "prop-types";
import React from "react";
import ScoreInput from "../components/ScoreInput";
import TextInput from "../components/TextInput";

const ScoreRange = ({ minScore, maxScore, setMinScore, setMaxScore, hasError }) => {
  return (
    <div className={"flex items-center gap-4"}>
      {/* Minimum Score Input */}
      <div className="flex items-center gap-2">
        <ScoreInput
          text={minScore}
          setText={setMinScore}
          placeholder="Min Score"
          hasError={hasError}
        />
      </div>

      {/* "To" Label */}
      <div className="font-medium text-prussian-blue text-lg">
        to
      </div>

      {/* Maximum Score Input */}
      <div className="flex items-center gap-2">
        <ScoreInput
          text={maxScore}
          setText={setMaxScore}
          placeholder="Max Score"
          hasError={hasError}
        />
      </div>
    </div>
  );
};

ScoreRange.propTypes = {
  minScore: PropTypes.string,
  maxScore: PropTypes.string,
  setMinScore: PropTypes.func.isRequired,
  setMaxScore: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
};

export default ScoreRange;