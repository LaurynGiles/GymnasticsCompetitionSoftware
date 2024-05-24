import React, {useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBarDefault from "../components/NavigationBarDefault";
import EventInfoBlock from "../components/EventInfoBlock";
import DeductionButtonsGroup from "../components/DeductionButtonsGroup";
import DeductionBlock from "../components/DeductionBlock";
import TotalDeductionsBlock from "../components/TotalDeductionsBlock";

const CalculationsJudges = () => {

  const [values, setValues] = useState([]);
  const [total, setTotal] = useState(0.0);
  const { level, age, apparatus } = useParams();

  const addValue = (value) => {
    setValues([...values, value]);
    incrementTotal(value);
  };

  const removeValue = (index) => {
    setValues((prevValues) => {
      const newValues = prevValues.filter((_, i) => i !== index);
      return newValues;
    });
    decrementTotal(values[index]);
  }

  const incrementTotal = (value) => {
    setTotal((prevTotal) => prevTotal + value);
  };

  const decrementTotal = (value) => {
    setTotal((prevTotal) => prevTotal - value);
  };

  return (
    <div className="bg-[#feffff] flex justify-center w-full h-screen">
      <div className="bg-bright-white overflow-hidden w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} />
        </div>
        <div className="flex flex-col w-full h-full items-center gap-[40px] overflow-y-auto pt-[75px] relative">
        <EventInfoBlock
            apparatus={apparatus}
            level={level}
            age={age}
            number={"56"}
            name={"Travis Giles"}
          />
          <div className="inline-flex items-center justify-center gap-[15px] relative flex-[0_0_auto]">
            <DeductionButtonsGroup addValue={addValue}/>
            <DeductionBlock values={values} removeValue={removeValue}/>
          </div>
            <TotalDeductionsBlock level={level} age={age} apparatus={apparatus} total={total}/>
        </div>
      </div>
    </div>
  );
};

export default CalculationsJudges;