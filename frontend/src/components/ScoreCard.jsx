import ScoreBlock from "../components/ScoreBlock";

const ScoreCard = ({startScore, penalty, deductionTotal }) => {

  const formatScore = (score) => {
    return score == null ? "0.000" : score;
  };

  const initialScore = startScore != null && deductionTotal != null ? formatScore(startScore - deductionTotal) : "0.000";
  const finalScore = startScore != null && deductionTotal != null && penalty != null ? formatScore(startScore - deductionTotal - penalty) : "0.000";

  return (
  <div className="w-[80%] md:w-[70%] lg:w-[60%] flex flex-col items-center p-4 bg-light-periwinkle rounded-lg relative">
    <div className="text-prussian-blue font-montserrat font-medium text-lg md:text-xl lg:text-2xl tracking-normal leading-normal">
      SCORE CARD
    </div>
    <ScoreBlock title="Starting score:" score={formatScore(startScore)} />
    <ScoreBlock title="Your deductions:" score={formatScore(deductionTotal)} />
    <ScoreBlock title="Initial score:" score={initialScore} />
    <ScoreBlock title="Penalty deductions:" score={formatScore(penalty)} />
    <ScoreBlock title="Final score:" score={finalScore} />
  </div>
  );
};

export default ScoreCard;