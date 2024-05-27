import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SmallBlueButton from "../components/SmallBlueButton";
import EventInfoBlock from "../components/EventInfoBlock";
import NavigationBarDefault from "../components/NavigationBarDefault";
import ScoreBlock from "../components/ScoreBlock";
import Header from "../components/Header";
import JudgeScore from "../components/JudgeScore";
import JudgeAnalysis from "../components/JudgeAnalysis";
import SmallSelectBox from "../components/SmallSelectBox";
import Popup from "../components/Popup";
import ScoreSubmissionBlock from "../components/ScoreSubmissionBlock";
import BlueButton from "../components/BlueButton";

const SubmissionHeadJudges = () => {
  const [startScore, setStartScore] = useState("0.000");
  const [penalty, setPenalty] = useState("0.000");
  const [deductions, setDeductions] = useState("0.000");
  const [visibleAnalysis, setVisibleAnalysis] = useState({});
  const [rotateArrow, setRotateArrow] = useState({});
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [navigateOnClose, setNavigateOnClose] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setStartScore(localStorage.getItem("startscore"));
    setPenalty(localStorage.getItem("penalty"));
    setDeductions(localStorage.getItem("total"));
  }, []);

  const updateAnalysisVisibility = (index) => {
    setVisibleAnalysis((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setRotateArrow((prev) => ({
      ...prev,
      [index]: !prev[index] ? 180 : 0,
    }));
  };

  const requestOptions = ["All", "Debbie Giles", "John Doe", "Jane Smith", "Michael Brown", "Emily White"];
  const [requestName, setRequestName] = useState(requestOptions[0]);

  const judgeData = [
    { name: "Debbie Giles", deduction: "2.1", total: "7.0", analysis: "0.1 + 0.1 + 0.3 + 0.3 + 0.5 + 0.1 + 0.2 + 0.1 + 0.1 + 0.1 + 0.3" },
    { name: "John Doe", deduction: "1.8", total: "7.2", analysis: "0.1 + 0.2 + 0.2 + 0.3 + 0.3 + 0.2 + 0.2 + 0.1 + 0.1 + 0.1" },
    { name: "Jane Smith", deduction: "2.0", total: "7.1", analysis: "0.2 + 0.1 + 0.3 + 0.2 + 0.2 + 0.3 + 0.3 + 0.1 + 0.1 + 0.1 + 0.1" },
    { name: "Michael Brown", deduction: "2.2", total: "6.9", analysis: "0.3 + 0.1 + 0.2 + 0.2 + 0.2 + 0.2 + 0.2 + 0.3 + 0.1 + 0.1 + 0.1" },
    { name: "Emily White", deduction: "1.9", total: "7.3", analysis: "0.1 + 0.2 + 0.3 + 0.2 + 0.2 + 0.1 + 0.1 + 0.2 + 0.2 + 0.1 + 0.2" }
  ];

  const handleSendClick = () => {
    setShowRequestPopup(true);
  };

  const handleSubmitClick = () => {
    setShowSubmitPopup(true);
    setNavigateOnClose(true);
  };

  const handleClosePopup = () => {
    setShowSubmitPopup(false);
    if (navigateOnClose) {
      navigate("/gymnastselect");
    }
  };

  return (
    <div className="bg-[#feffff] flex flex-row justify-center w-full h-screen">
      <div className="bg-bright-white w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={false} />
        </div>
        <div className="inline-flex flex-col w-full h-full items-center overflow-y-auto pt-[75px] pb-[50px] gap-[30px] relative overflow-hidden">
          <EventInfoBlock />
          
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto]">
            <Header text={"Starting score and Penalties"}/>
            <div className="inline-flex flex-col items-center gap-[19px] px-[20px] py-[15px] relative flex-[0_0_auto] bg-light-periwinkle">
              <ScoreBlock title={"Starting score"} score={startScore}/>
              <ScoreBlock title={"Penalty deductions"} score={penalty}/>
            </div>
          </div>
          
          <div className="inline-flex flex-col items-center gap-[10px] px-0 py-[10px] relative flex-[0_0_auto]">
            <Header text={"Execution scores"} />
            <div className="w-[360px] flex items-center relative flex-[0_0_auto]">
              <div className="relative w-[150px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Judge
              </div>
              <div className="relative w-[106px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Deduction
              </div>
              <div className="relative w-[78px] h-[26px] mt-[-1.00px] font-montserrat font-medium text-prussian-blue text-[18px] text-center tracking-[0] leading-[normal]">
                Score
              </div>
            </div>
            {judgeData.map((judge, index) => (
              <React.Fragment key={index}>
                <JudgeScore
                  name={judge.name}
                  deduction={judge.deduction}
                  total={judge.total}
                  rotation={rotateArrow[index] || 0}
                  onUpdateAnalysis={() => updateAnalysisVisibility(index)}
                />
                {visibleAnalysis[index] && <JudgeAnalysis deductions={judge.analysis} />}
              </React.Fragment>
            ))}
          </div>
          
          <div className="inline-flex flex-col items-center justify-center gap-[10px] relative flex-[0_0_auto]">
            <Header text={"Request resubmission"} />
            <div className="inline-flex flex-col items-center justify-center gap-[10px] px-[10px] py-[10px] relative flex-[0_0_auto] bg-anti-flash-white">
              <div className="inline-flex items-start justify-center gap-[30px] relative flex-[0_0_auto]">
                <SmallSelectBox title={"Judge"} option={requestName} setOption={setRequestName} allOptions={requestOptions}/>
                <div onClick={handleSendClick}> 
                  <SmallBlueButton title="Send" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="inline-flex flex-col items-center gap-[10px] relative flex-[0_0_auto]">
            <Header text={"Final score submission"} />
            <div className="inline-flex flex-col items-center gap-[19px] px-[10px] py-[15px] relative flex-[0_0_auto] bg-periwinkle">
              <div className="inline-flex items-center justify-center gap-[10px] relative">
                <ScoreSubmissionBlock deductions={deductions} penalties={penalty} startScore={startScore}/>
                <div className="flex flex-col w-[122px] h-[140px] items-end justify-end gap-[10px] relative" onClick={handleSubmitClick}>
                  <BlueButton title="Submit" />
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      {showRequestPopup && <Popup message={`Request sent to ${requestName}`} onClose={() => setShowRequestPopup(false)} />}
      {showSubmitPopup && <Popup message={"Submitted final score"} onClose={handleClosePopup} />}
    </div>
  );
};

export default SubmissionHeadJudges