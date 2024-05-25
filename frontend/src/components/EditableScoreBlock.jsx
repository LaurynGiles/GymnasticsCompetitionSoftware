import React from "react";

const EditableScoreBlock = ({ title, score, setScore }) => {

    const handleChange = (e) => {
        setScore(e.target.value);
    };

    const handleBlur = () => {
        // Format the score to 3 decimal places on blur
        const formattedScore = parseFloat(score).toFixed(3);
        setScore(formattedScore);
    };

    return (
      <div className="relative w-[331px] h-[47px] flex items-center">
        <div className="w-[200px] flex items-center justify-end pr-[30px]">
          <div className="font-montserrat font-semibold text-prussian-blue text-[16px] tracking-[0] leading-[normal]">
            {title}
          </div>
        </div>
        <div className="w-[122px] h-[46px] bg-bright-white rounded-[10px] flex items-center justify-center">
            <input
            type="text"
            value={score}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0.000"
            className="w-full font-montserrat font-semibold text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]"
            />
        </div>
      </div>
    );
  };    

export default EditableScoreBlock;