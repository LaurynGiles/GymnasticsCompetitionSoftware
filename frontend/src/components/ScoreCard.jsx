import ScoreBlock from "../components/ScoreBlock";

const ScoreCard = ({startScore, penalty, deductionTotal }) => {

  const formatScore = (score) => {
    return score == null ? "0.000" : score;
  };

  const initialScore = startScore != null && deductionTotal != null ? formatScore(startScore - deductionTotal) : "0.000";
  const finalScore = startScore != null && deductionTotal != null && penalty != null ? formatScore(startScore - deductionTotal - penalty) : "0.000";

  return (
    <div className="inline-flex flex-col items-center gap-[25px] p-[20px] relative bg-light-periwinkle">
      <div className="relative w-[150px] h-[27px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[20px] tracking-[0] leading-[normal]">
        SCORE CARD
      </div>
      <ScoreBlock title="Starting score:" score={formatScore(startScore)}/>
      <ScoreBlock title="Your deductions:" score={formatScore(deductionTotal)}/>
      <ScoreBlock title="Initial score:" score={initialScore}/>
      <ScoreBlock title="Penalty deductions:" score={formatScore(penalty)}/>
      <ScoreBlock title="Final score:" score={finalScore}/>
    </div>
  );
};

export default ScoreCard;