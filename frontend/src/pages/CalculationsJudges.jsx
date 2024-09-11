import React, {useState, useEffect } from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import InfoBlock from "../components/InfoBlock";
import DeductionButtonsGroup from "../components/DeductionButtonsGroup";
import DeductionBlock from "../components/DeductionBlock";
import TotalDeductionsBlock from "../components/TotalDeductionsBlock";
import DeductionButtonsSquare from "../components/DeductionButtonSquare";
import DeductionBlockSquare from "../components/DeductionBlockSquare";
import LeavePopup from "../components/LeavePopup.jsx";
import { useNotifications } from "../utils/connection.jsx";

const CalculationsJudges = () => {

  const [values, setValues] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [layout, setLayout] = useState(0);
  const [leaveGroup, setLeaveGroup] = useState(false);
  const { groupId, socket, headOfGroup, setHeadOfGroup, setNextGymnast, setCurrApparatus, setPenalty, setDeductionTotal, setStartScore, setFinalScore, judgeInfo } = useNotifications();

  useEffect(() => {
    console.log("Loading calculations page");
    console.log(headOfGroup);

    const storedValues = localStorage.getItem("values");
    const storedTotal = localStorage.getItem("total");
    const storedLayout = localStorage.getItem("layout");
    
    if (storedValues) {
      console.log(`Found stored values ${storedValues}`);
      setValues(JSON.parse(storedValues));
    }
    if (storedTotal) {
      console.log(`Found stored values ${storedTotal}`);
      setTotal(Number(storedTotal));
    }
    setLayout(Number(storedLayout) || 0);

  }, []);

  useEffect(() => {
    if (values && total != 0) {
      console.log(`Setting values to ${values} and total to ${total}`);
      localStorage.setItem("values", JSON.stringify(values));
      localStorage.setItem("total", total.toString());
    }
  }, [values, total]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "layout") {
        setLayout(Number(e.newValue) || 0);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addValue = (value) => {
    setValues([...values, value]);
    incrementTotal(value);
  };

  const removeValue = (index) => {
    setValues((prevValues) => {
      const newValues = prevValues.filter((_, i) => i !== index);
      const newTotal = newValues.reduce((sum, value) => sum + value, 0);
  
      setTotal(newValues.length === 0 ? 0.0 : newTotal);
  
      return newValues;
    });
  };

  const incrementTotal = (value) => {
    setTotal((prevTotal) => prevTotal + value);
  };
  const renderLayout = () => {
    console.log(layout);
    if (layout === 1) {
      return (
        <div className="flex flex-row w-full justify-center gap-4 md:gap-8">
          <DeductionButtonsGroup addValue={addValue} />
          <DeductionBlock values={values} removeValue={removeValue} />
        </div>
      );
    } else if (layout === 2) {
      return (
        <div className="flex flex-row w-full justify-center gap-4 md:gap-8">
          <DeductionBlock values={values} removeValue={removeValue} />
          <DeductionButtonsGroup addValue={addValue} />
        </div>
      );
    } else if (layout === 0) {
      return (
        <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[50%] items-center justify-center gap-4">
          <DeductionButtonsSquare addValue={addValue} />
          <DeductionBlockSquare values={values} removeValue={removeValue} />
        </div>
      );
    }
  };

  const handleLeaveGroup = () => {
    setLeaveGroup(false);
    socket.emit('leaveGroup', {group_id: groupId, judge_id: judgeInfo.judge_id, judge_fname: judgeInfo.judge_fname, judge_lname: judgeInfo.judge_lname});
    setHeadOfGroup(false);
    setNextGymnast(null);
    setCurrApparatus(null);
    setPenalty(null);
    setDeductionTotal(null);
    setStartScore(null);
    setFinalScore(null);
    navigate('/homejudges');
  };

  return (
    <div className="bg-white flex flex-col w-full h-screen">
      <div className="bg-bright-white flex-1 w-full">
        <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
          <NavigationBarDefault showBackIcon={false} showPeopleIcon={headOfGroup} currPage={"/calculationsjudges"}/>
        </div>
        <div className="w-full flex flex-col items-center pt-[75px] pb-[20px] md:pt-[90px] gap-4 md:gap-10 px-4 md:px-8 lg:px-16 overflow-y-auto">
          <div className="w-full flex flex-col items-center gap-8 md:gap-12">
            <InfoBlock />
          </div>
          <div className="w-full flex flex-col items-center gap-6 md:gap-16 flex-grow">
              {renderLayout()}
              <TotalDeductionsBlock total={total} values={values} />
          </div>
        </div>
      </div>
      {leaveGroup && <LeavePopup message={"Are you sure that you want to leave the judging table."} onYes={() => handleLeaveGroup} onNo={() => setLeaveGroup(false)}/>}
    </div>
  );
};

export default CalculationsJudges;