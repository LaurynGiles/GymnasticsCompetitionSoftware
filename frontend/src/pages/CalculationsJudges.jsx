import React, {useState, useEffect } from "react";
import NavigationBarDefault from "../components/NavigationBarDefault";
import InfoBlock from "../components/InfoBlock";
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
    console.log("Loading calculations page");

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
        <div className="w-full h-full flex flex-row items-center justify-center gap-4">
          <DeductionButtonsGroup addValue={addValue} />
          <DeductionBlock values={values} removeValue={removeValue} />
        </div>
      );
    } else if (layout === 2) {
      return (
        <div className="w-full h-full flex flex-row items-center justify-center gap-4">
          <DeductionBlock values={values} removeValue={removeValue} />
          <DeductionButtonsGroup addValue={addValue} />
        </div>
      );
    } else if (layout === 0) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <DeductionButtonsSquare addValue={addValue} />
          <DeductionBlockSquare values={values} removeValue={removeValue} />
        </div>
      );
    }
  };

  return (
    <div className="bg-white flex flex-col md:flex-row w-full h-screen">
      <div className="bg-bright-white flex-1 overflow-hidden w-full h-full">
        <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
          <NavigationBarDefault showBackIcon={false} showBookIcon={true} currPage={"/calculationsjudges"}/>
        </div>
        <div className="w-full h-full flex-1 flex flex-col items-center justify-start pt-[75px] md:pt-[90px] md:pb-[20px] gap-4 md:gap-10 relative px-4 md:px-8 lg:px-16 overflow-y-auto">
          <div className="w-full flex flex-col items-center gap-8 md:gap-12">
            <InfoBlock />
          </div>
          <div className="w-full h-[80%] flex flex-col items-center justify-center gap-6 md:gap-16">
            {renderLayout()}
            <TotalDeductionsBlock total={total} values={values} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsJudges;