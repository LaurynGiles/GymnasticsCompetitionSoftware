import React, {useState, useEffect } from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import EventInfoBlock from "../components/EventInfoBlock";
import DeductionButtonsGroup from "../components/DeductionButtonsGroup";
import DeductionBlock from "../components/DeductionBlock";
import TotalDeductionsBlock from "../components/TotalDeductionsBlock";
import DeductionButtonsSquare from "../components/DeductionButtonSquare";
import DeductionBlockSquare from "../components/DeductionBlockSquare";

const CalculationsJudges = () => {

  const [values, setValues] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    const storedLayout = localStorage.getItem("layout");
    setLayout(Number(storedLayout) || 0);

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

  const renderLayout = () => {
    console.log(layout);
    if (layout === 1) {
      return (
        <div className="inline-flex items-center justify-center gap-[15px] relative flex-[0_0_auto]">
            <DeductionButtonsGroup addValue={addValue}/>
            <DeductionBlock values={values} removeValue={removeValue}/>
        </div>
      );
    } else if (layout === 2) {
      return (
        <div className="inline-flex items-center justify-center gap-[15px] relative flex-[0_0_auto]">
          <DeductionBlock values={values} removeValue={removeValue}/>
          <DeductionButtonsGroup addValue={addValue}/>
        </div>
      );
    } else if (layout === 0) {
      return (
        <div className="inline-flex flex-col items-center justify-center gap-[15px] relative flex-[0_0_auto]">
          <DeductionButtonsSquare addValue={addValue}/>
          <DeductionBlockSquare values={values} removeValue={removeValue}/>
        </div>
      );
    }
  };

  return (
    <div className="bg-[#feffff] flex justify-center w-full h-screen">
      <div className="bg-bright-white overflow-hidden w-full h-full">
        <div className="fixed top-0 w-[400px] z-10">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} />
        </div>
        <div className="flex flex-col w-full h-full items-center gap-[40px] overflow-y-auto pt-[75px] relative">
        <EventInfoBlock />
          {renderLayout()}
          <TotalDeductionsBlock total={total}/>
        </div>
      </div>
    </div>
  );
};

export default CalculationsJudges;