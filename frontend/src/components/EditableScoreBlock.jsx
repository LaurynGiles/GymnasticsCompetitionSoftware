import React from "react";

const EditableScoreBlock = ({ title, score, setScore }) => {

    const handleChange = (e) => {
        setScore(e.target.value);
    };

    const handleBlur = () => {
        // Format the score to 3 decimal places on blur
        const formattedScore = parseFloat(score).toFixed(3);
        setScore(isNaN(formattedScore) ? "" : formattedScore);
    };

    return (
      <div className="flex flex-col items-center gap-2 w-[90%] md:w-[45%] px-4">
          <div className="font-montserrat font-semibold text-prussian-blue text-lg md:text-xl text-center">
              {title}
          </div>
          <div className="w-full bg-bright-white rounded-lg flex items-center justify-center">
              <input
                  type="text"
                  value={score || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="0.000"
                  className="w-full font-montserrat font-semibold text-prussian-blue text-lg md:text-2xl text-center p-2 md:p-4 rounded-lg"
              />
          </div>
      </div>
  );
  };    

export default EditableScoreBlock;