import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import BlueButton from "../components/BlueButton";
import ConfigHeader from "../components/ConfigHeader";
import DateInput from "../components/DateInput";
import InputLabel from "../components/InputLabel";
import RadioButtonOption from "../components/RadioButtonOption";
import ScoreInput from "../components/ScoreInput";
import ScoreRange from "../components/ScoreRange";
import TextInput from "../components/TextInput";
import AddButton from "../components/AddButton";
import { useNotifications } from "../utils/connection.jsx";
import XIcon from "../components/XIcon.jsx";

const ConfigPage = () => {
  const { competition, setCompetition, qualifications, setQualifications } = useNotifications();
  const [newQualName, setNewQualName] = useState("");
  const [newQualScore, setNewQualScore] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetition(prev => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (minName, maxName, value) => {
    setCompetition(prev => ({ ...prev, [minName]: value.min, [maxName]: value.max }));
  };

  const handleAddQualification = () => {
    if (newQualName && !isNaN(parseFloat(newQualScore))) {
      setQualifications(prevQualifications => [
        ...prevQualifications,
        {
          id: prevQualifications.length + 1,
          name: newQualName,
          score: parseFloat(newQualScore).toFixed(3)
        }
      ]);
      setNewQualName("");
      setNewQualScore("");
    }
  };

  const handleRemoveQualification = (id) => {
    setQualifications((prev) => prev.filter((qual) => qual.id !== id));
  };

  return (
    <div className="flex w-full h-screen bg-bright-white">
      <NavigationBar />
      <div className="flex-1 ml-72 mb-20 bg-bright-white overflow-auto p-5">
        <div className="w-full max-w-5xl mx-auto gap-10">
          {/* Header */}
          <div className="flex items-center justify-center bg-light-periwinkle p-4 mb-6 rounded-lg shadow-md">
            <h1 className="text-[34px] font-medium text-prussian-blue text-center">
              Competition Configuration
            </h1>
          </div>

          {/* Configuration Form */}
          <div className="flex flex-col gap-10">
            {/* General Information */}
            <ConfigHeader />
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4">
                  <InputLabel text="Competition name" />
                  <TextInput 
                    name="name"
                    value={competition.name}
                    setText={(value) => handleChange({ target: { name: 'name', value } })}
                    hasError={error}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Start date" />
                  <DateInput 
                    date={competition.startDate} 
                    setDate={(date) => handleChange({ target: { name: 'startDate', value: date } })}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="End date" />
                  <DateInput 
                    date={competition.endDate} 
                    setDate={(date) => handleChange({ target: { name: 'endDate', value: date } })}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Location" />
                  <TextInput 
                    name="location"
                    value={competition.location}
                    setText={(value) => handleChange({ target: { name: 'location', value } })}
                    hasError={error}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Competition type" />
                  <RadioButtonOption 
                    text="MAG" 
                    selected={competition.style === 'MAG'} 
                    setSelected={() => handleChange({ target: { name: 'style', value: 'MAG' } })}
                  />
                  <RadioButtonOption 
                    text="WAG" 
                    selected={competition.style === 'WAG'} 
                    setSelected={() => handleChange({ target: { name: 'style', value: 'WAG' } })}
                  />
                </div>
              </div>
            </div>

            {/* Medal Allocation */}
            <ConfigHeader text="Medal Allocation" />
            <p className="text-xl font-medium text-text mb-4">
              Indicate the final score ranges required by gymnasts to receive a medal.
            </p>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4">
                  <InputLabel text="Bronze" />
                  <ScoreRange 
                    minScore={competition.minBronze}
                    maxScore={competition.maxBronze}
                    setMinScore={(value) => handleScoreChange('minBronze', 'maxBronze', { min: value, max: competition.maxBronze })}
                    setMaxScore={(value) => handleScoreChange('minBronze', 'maxBronze', { min: competition.minBronze, max: value })}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Silver" />
                  <ScoreRange 
                    minScore={competition.minSilver}
                    maxScore={competition.maxSilver}
                    setMinScore={(value) => handleScoreChange('minSilver', 'maxSilver', { min: value, max: competition.maxSilver })}
                    setMaxScore={(value) => handleScoreChange('minSilver', 'maxSilver', { min: competition.minSilver, max: value })}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <InputLabel text="Gold" />
                  <ScoreRange 
                    minScore={competition.minGold}
                    maxScore={competition.maxGold}
                    setMinScore={(value) => handleScoreChange('minGold', 'maxGold', { min: value, max: competition.maxGold })}
                    setMaxScore={(value) => handleScoreChange('minGold', 'maxGold', { min: competition.minGold, max: value })}
                  />
                </div>
              </div>
            </div>

          {/* Qualifications */}
          <ConfigHeader text="Qualifications" />
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="grid grid-cols-1 gap-4">
                {/* Qualification Inputs */}
                <div className="flex items-center gap-4 mb-4">
                  <InputLabel text="Qualification Name" />
                  <TextInput text={newQualName} setText={setNewQualName} hasError={error} placeholder="Enter qualification name" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <InputLabel text="Score Threshold" />
                  <ScoreInput text={newQualScore} setText={setNewQualScore} hasError={error} />
                </div>
                <div className="flex justify-center mb-4">
                  <AddButton title={"+"} onClick={handleAddQualification}>Add Qualification</AddButton>
                </div>

                {/* Display List of Qualifications */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-medium font-montserrat text-prussian-blue mb-4">Existing Qualifications</h2>
                {qualifications.length > 0 ? (
                  <ul className="list-disc pl-5 text-lg text-prussian-blue font-montserrat">
                    {qualifications.map((qual) => (
                      <li key={qual.id} className="flex items-center mb-2 text-xl gap-4">
                        <XIcon onClick={() => handleRemoveQualification(qual.id)} className="ml-4 cursor-pointer"/>
                        <span className="text-prussian-blue font-medium font-montserrat mr-4">{qual.name}:</span>
                        <span className="mr-4 font-montserrat text-prussian-blue font-medium">{qual.score}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-prussian-blue font-montserrat font-medium">No qualifications added yet.</p>
                )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
