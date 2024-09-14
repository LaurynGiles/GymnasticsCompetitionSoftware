import React, {useState} from "react";
import NavigationBar from "../components/NavigationBar";
import BlueButton from "../components/BlueButton";
import ConfigHeader from "../components/ConfigHeader";
import DateInput from "../components/DateInput";
import InputLabel from "../components/InputLabel";
import RadioButtonOption from "../components/RadioButtonOption";
import ScoreInput from "../components/ScoreInput";
import ScoreRange from "../components/ScoreRange";
import TextInput from "../components/TextInput";

const ConfigPage = () => {

  const [compName, setCompName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(false);

  return (
    <div className="flex w-full h-screen bg-bright-white]">
      <NavigationBar />
      <div className="flex-1 ml-72 bg-bright-white overflow-auto p-5">
        <div className="w-[90%] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center bg-light-periwinkle p-4 mb-6 rounded-lg shadow-md">
            <h1 className="text-[34px] font-medium text-prussian-blue text-center">
              Competition Configuration
            </h1>
          </div>

          {/* Configuration Form */}
          <div className="flex flex-col gap-6">
            {/* General Information */}
            <ConfigHeader />
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="flex items-center gap-4">
                  <InputLabel text={"Competition name"}/>
                  <TextInput text={compName} setText={setCompName} hasError={error}/>
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text={"Start date"}/>
                  <DateInput date={startDate} setDate={setStartDate}/>
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="End date" />
                  <DateInput date={endDate} setDate={setEndDate}/>
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Location" />
                  <TextInput text={location} setText={setLocation} hasError={error} />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Competition type" />
                  <RadioButtonOption />
                  <RadioButtonOption text="WAG" />
                </div>
              </div>
            </div>

            {/* Medal Allocation */}
            <ConfigHeader text="Medal Allocation" />
            <div className="bg-white p-5 rounded-lg shadow-md">
             
              <p className="text-2xl font-medium text-text mb-4">
                Indicate the final score ranges required by gymnasts to receive a medal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-4">
                  <InputLabel text="Bronze" />
                  <ScoreRange />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Silver" />
                  <ScoreRange scoreInputText="34.00" scoreInputText1="35.19" />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Gold" />
                  <ScoreRange scoreInputText="35.20" scoreInputText1="40.00" />
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-white p-5 rounded-lg shadow-md">
              <ConfigHeader text="Qualifications" />
              <div className="relative w-full h-[103px]">
                {/* Placeholder for any additional content or styling */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;