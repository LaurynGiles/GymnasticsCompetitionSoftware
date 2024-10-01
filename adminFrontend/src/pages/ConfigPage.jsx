import React, { useState, useEffect } from "react";
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
import StartButton from "../components/StartButton.jsx";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import BarsIcon from "../components/BarsIcon.jsx";
import SelectBox from "../components/SelectBox.jsx";
import DropdownInput from "../components/DropDownInput.jsx";

const ConfigPage = () => {
  const { competition, setCompetition, qualifications, setQualifications } = useNotifications();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [newQualName, setNewQualName] = useState("");
  const [newQualScore, setNewQualScore] = useState("");
  const [error, setError] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [apparatusList, setApparatusList] = useState([{ id: 1, selected: '' }]);
  const navigate = useNavigate();

  const apparatusOptions = [
    "Vault",
    "Floor",
    "High Bar",
    "Parallel Bar",
    "Balance Beam",
    "Double Bars",
    "Pommel",
    "Rings"
  ];

  const handleAddApparatus = () => {
    setApparatusList((prev) => [
      ...prev,
      { id: prev.length + 1, selected: '' } // Keep track of selected options
    ]);
  };

  const handleApparatusChange = (id, value) => {
    setApparatusList((prev) => 
      prev.map((item) => (item.id === id ? { ...item, selected: value } : item))
    );
  };

  const handleRemoveApparatus = (id) => {
    setApparatusList((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (apparatusList.length > 0) {
      // Save to local storage
      localStorage.setItem('apparatusEvents', JSON.stringify(apparatusList));
    }
  }, [apparatusList]);

  const handleContinue = () => {
    navigate("/timeslotConfig")
  };

  useEffect(() => {
    const storedCompetition = JSON.parse(localStorage.getItem('competition')) || {};
    const storedQualifications = JSON.parse(localStorage.getItem('qualifications')) || [];

    if (Object.keys(storedCompetition).length > 0) {
      storedCompetition.startDate = storedCompetition.startDate ? new Date(storedCompetition.startDate) : null;
      storedCompetition.endDate = storedCompetition.endDate ? new Date(storedCompetition.endDate) : null;
      setCompetition(storedCompetition);
    }
    setQualifications(storedQualifications);
  }, [setCompetition, setQualifications]);

  useEffect(() => {
    // Only save non-empty values
    if (competition.name || competition.location || competition.startDate || competition.endDate || competition.style) {
      console.log(`Setting local storage competition: ${competition}`);
      localStorage.setItem('competition', JSON.stringify({
        ...competition,
        startDate: competition.startDate ? competition.startDate.toISOString() : null,
        endDate: competition.endDate ? competition.endDate.toISOString() : null,
      }));
    }

    if (qualifications.length > 0) {
      console.log(`Setting local storage qualification: ${qualifications}`);
      localStorage.setItem('qualifications', JSON.stringify(qualifications));
    }

  }, [competition, qualifications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      // Convert value to Date object
      setCompetition(prev => ({
        ...prev,
        [name]: value ? new Date(value) : null
      }));
    } else {
      setCompetition(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
       {isNavVisible && <NavigationBar />}
      <div className="flex-1 mb-20 bg-bright-white p-5" style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
      <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)}/>
        <div className="w-full max-w-5xl mx-auto gap-10">
          {/* Header */}
         <PageHeader title={"Competition Configuration"}/>

          {/* Configuration Form */}
          <div className="flex flex-col gap-10 justify-center">
            {/* General Information */}
            <ConfigHeader text="Competition Details"/>
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
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

            <ConfigHeader text="Apparatus events" />
            <div className="bg-white p-5 gap-4 rounded-lg shadow-md w-full">
              <div className="grid grid-cols-1 gap-4">
              {apparatusList.map((item) => (
                  <div className="flex items-center gap-4" key={item.id}>
                    <InputLabel text={`Apparatus ${item.id}`} />
                    <DropdownInput 
                      selectedOption={item.selected} 
                      setSelectedOption={(value) => handleApparatusChange(item.id, value)} 
                      options={apparatusOptions} 
                      hasError={false} 
                    />
                    <XIcon onClick={() => handleRemoveApparatus(item.id)} className="ml-4 cursor-pointer" isVisible={item.id !== 1}/>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <AddButton title={"Add Apparatus"} onClick={handleAddApparatus} />
              </div>
            </div>

            {/* Medal Allocation */}
            <ConfigHeader text="Medal Allocation" />
            <p className="text-xl font-medium text-text mb-4">
              Indicate the final score ranges required by gymnasts to receive a medal.
            </p>
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
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
            <div className="bg-white p-5 rounded-lg shadow-md w-full">
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
                <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-medium font-montserrat text-prussian-blue mb-4">Existing Qualifications</h2>
                {qualifications.length > 0 ? (
                  <ul className="list-disc pl-5 text-lg text-prussian-blue font-montserrat">
                    {qualifications.map((qual) => (
                      <li key={qual.id} className="flex items-center mb-2 text-xl gap-4">
                        <XIcon onClick={() => handleRemoveQualification(qual.id)} className="cursor-pointer" isVisible={true}/>
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
        <div className="flex justify-center items-center p-5 bg-bright-white">
          <StartButton onClick={handleContinue} title={"Continue"}/>
        </div>
      </div>


    </div>
  );
};

export default ConfigPage;
