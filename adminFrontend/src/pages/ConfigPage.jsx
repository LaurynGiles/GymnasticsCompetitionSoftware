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
import NumberTableBlock from "../components/NumberTableBlock.jsx";
import NumberInputLarge from "../components/NumberInputLarge.jsx";

const ConfigPage = () => {
  const [qualifications, setQualifications] = useState([]);
  const [competition, setCompetition] = useState({
    name: "",
    location: "",
    startDate: null,
    endDate: null,
    style: "",
    minBronze: "",
    maxBronze: "",
    minSilver: "",
    maxSilver: "",
    minGold: "",
    maxGold: "",
  });
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [newQualName, setNewQualName] = useState("");
  const [newQualScore, setNewQualScore] = useState("");
  const [error, setError] = useState(false);
  const [apparatusList, setApparatusList] = useState([]);
  const [ageGroupList, setAgeGroupList] = useState([]);
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
      { id: prev.length + 1, selected: '', error: false } // Keep track of selected options
    ]);
  };

  const handleApparatusChange = (id, value) => {
    console.log(`${id}: ${value}`);

    setApparatusList((prev) => {
      const updatedList = prev.map((item) => (item.id === id ? { ...item, selected: value } : item));

      // Check for duplicates
      const selectedApparatuses = updatedList.map(item => item.selected).filter(Boolean); // Get only selected values
      const duplicates = selectedApparatuses.filter((item, index) => selectedApparatuses.indexOf(item) !== index);
      
      return updatedList.map((item) => ({
        ...item,
        error: duplicates.includes(item.selected) // Set error if it's a duplicate
      }));
    });
  };

  const handleRemoveApparatus = (id) => {
    setApparatusList((prev) => {
      // Filter out the removed apparatus
      const updatedList = prev.filter((item) => item.id !== id);
      
      // Check for duplicates again after removal
      const selectedApparatuses = updatedList.map(item => item.selected).filter(Boolean);
      const duplicates = selectedApparatuses.filter((item, index) => selectedApparatuses.indexOf(item) !== index);
  
      // Renumber the IDs and reset error states
      return updatedList.map((item) => ({
        ...item,
        error: duplicates.includes(item.selected) // Reset error if a duplicate is found
      })).map((item, index) => ({ ...item, id: index + 1 })); // Renumber IDs
    });
  };

  const handleAddAgeGroup = () => {
    setAgeGroupList((prev) => [
      ...prev,
      { id: prev.length + 1,  minAge: null, maxAge: null, error: false } // Keep track of selected options
    ]);
  };

  const handleMinAgeChange = (id, value) => {
    setAgeGroupList((prev) => {
      const updatedList = prev.map((item) => (item.id === id ? { ...item, minAge: value } : item));
      
      // Check for duplicates
      const agePairs = updatedList.map(item => `${item.minAge}-${item.maxAge}`);
      const duplicates = agePairs.filter((pair, index) => agePairs.indexOf(pair) !== index);
  
      return updatedList.map((item) => {
        const isValidAge = item.minAge >= 1 && item.minAge <= 100; // Check if min age is valid
        return {
          ...item,
          error: !isValidAge || duplicates.includes(`${item.minAge}-${item.maxAge}`) // Set error if invalid age or duplicate
        };
      });
    });
  };
  
  const handleMaxAgeChange = (id, value) => {
    setAgeGroupList((prev) => {
      const updatedList = prev.map((item) => (item.id === id ? { ...item, maxAge: value } : item));
      
      // Check for duplicates
      const agePairs = updatedList.map(item => `${item.minAge}-${item.maxAge}`);
      const duplicates = agePairs.filter((pair, index) => agePairs.indexOf(pair) !== index);
  
      return updatedList.map((item) => {
        const isValidAge = item.maxAge >= 1 && item.maxAge <= 100; // Check if max age is valid
        return {
          ...item,
          error: !isValidAge || duplicates.includes(`${item.minAge}-${item.maxAge}`) // Set error if invalid age or duplicate
        };
      });
    });
  };

  const handleRemoveAgeGroup = (id) => {
    setAgeGroupList((prev) => {
      // Filter out the removed age group
      const updatedList = prev.filter((item) => item.id !== id);
      // Renumber the IDs
      const renumberedList = updatedList.map((item, index) => ({ ...item, id: index + 1 }));
  
      // Check for duplicates again after removal
      const agePairs = renumberedList.map(item => `${item.minAge}-${item.maxAge}`);
      const duplicates = agePairs.filter((pair, index) => agePairs.indexOf(pair) !== index);
  
      // Set error flags to false for all items if there are no duplicates
      return renumberedList.map((item) => ({
        ...item,
        error: duplicates.includes(`${item.minAge}-${item.maxAge}`) // Set error if there's a duplicate
      }));
    });
  };

  const handleContinue = () => {
    navigate("/timeslotConfig")
  };

  useEffect(() => {
    // Load stored competition data and qualifications
    const storedCompetition = JSON.parse(localStorage.getItem('competition')) || {};
    const storedQualifications = JSON.parse(localStorage.getItem('qualifications')) || [];
    const storedApparatus = JSON.parse(localStorage.getItem('apparatusEvents')) || [];
    const storedAgeGroups = JSON.parse(localStorage.getItem('ageGroups')) || [];

    console.log("Stored Competition:", storedCompetition);
    console.log("Stored Qualifications:", storedQualifications);
    console.log("Stored Apparatus:", storedApparatus);
    console.log("Stored AgeGroups:", storedAgeGroups);

    if (Object.keys(storedCompetition).length > 0) {
      storedCompetition.startDate = storedCompetition.startDate ? new Date(storedCompetition.startDate) : null;
      storedCompetition.endDate = storedCompetition.endDate ? new Date(storedCompetition.endDate) : null;
      setCompetition(storedCompetition);
    }

    setQualifications(storedQualifications);

    // Initialize apparatus list with stored values or ensure at least one apparatus
    if (storedApparatus.length > 0) {
      console.log(storedApparatus);
      setApparatusList(storedApparatus);
    } else {
      setApparatusList([{ id: 1, selected: '', hasError: false }]); // Ensure at least one empty item
    }

    if (storedAgeGroups.length > 0) {
      setAgeGroupList(storedAgeGroups);
    } else {
      setAgeGroupList([{ id: 1, minAge: null, maxAge: null,  error: false }]); // Ensure at least one empty item
    }

  }, [setCompetition, setQualifications, setApparatusList, setAgeGroupList]);

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

    if (apparatusList.length > 0) {
      console.log(`Setting local storage apparatus list: ${apparatusList}`);
      localStorage.setItem('apparatusEvents', JSON.stringify(apparatusList));
    }

    if (ageGroupList.length > 0) {
      console.log(`Setting local storage age group list: ${ageGroupList}`);
      localStorage.setItem('ageGroups', JSON.stringify(ageGroupList));
    }

  }, [competition, qualifications, apparatusList, ageGroupList]);

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
                    text={competition.name}
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
                    text={competition.location}
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

            <ConfigHeader text="Apparatus Events" />
            <div className="bg-white p-5 gap-4 rounded-lg shadow-md w-full">
              <div className="grid grid-cols-1 gap-4">
              {apparatusList.map((item) => (
                  <div className="flex items-center gap-4" key={item.id}>
                    <InputLabel text={`Apparatus ${item.id}`} />
                    <DropdownInput 
                      selectedOption={item.selected} 
                      setSelectedOption={(value) => handleApparatusChange(item.id, value)} 
                      options={apparatusOptions} 
                      hasError={item.error}
                    />
                    <XIcon onClick={() => handleRemoveApparatus(item.id)} className="ml-4 cursor-pointer" isVisible={item.id !== 1}/>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <AddButton title={"Add Apparatus"} onClick={handleAddApparatus} />
              </div>
            </div>

            <ConfigHeader text="Age Groups" />
            <div className="bg-white p-5 gap-4 rounded-lg shadow-md w-full">
              <div className="grid grid-cols-1 gap-4">
              {ageGroupList.map((item) => (
                  <div className="flex items-center gap-4" key={item.id}>
                    <InputLabel text={`Age Group ${item.id}`} />
                    <NumberInputLarge 
                      value={item.minAge} 
                      onChange={(value) => handleMinAgeChange(item.id, value)} // Pass the id here
                      hasError={item.error}
                    />
                    to
                    <NumberInputLarge 
                      value={item.maxAge} 
                      onChange={(value) => handleMaxAgeChange(item.id, value)} // Pass the id here
                      hasError={item.error}
                    />
                    yrs
                    <XIcon onClick={() => handleRemoveAgeGroup(item.id)} className="ml-4 cursor-pointer" isVisible={item.id !== 1}/>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <AddButton title={"Add Age Group"} onClick={handleAddAgeGroup} />
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
