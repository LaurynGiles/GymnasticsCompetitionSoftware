import React, { useState, useEffect } from "react";
import NavigationBarResults from "../components/NavigationBarResults";
import ConfigHeader from "../components/ConfigHeader";
import AddButton from "../components/AddButton";
import TimeSlotTableRow from "../components/TimeSlotTableRow.jsx";
import PageHeader from "../components/PageHeader";
import TimeSlotHeaders from "../components/TimeSlotHeaders";
import StartButton from "../components/StartButton.jsx";
import { useNavigate } from "react-router-dom";
import BarsIcon from "../components/BarsIcon.jsx";
import XIcon from "../components/XIcon.jsx";
import { useNotifications } from "../utils/connection.jsx";
import ResultsTableRow from "../components/ResultsTableRow.jsx";
import { getFinalResults, updateDifficulty, updateExecution } from "../utils/api.js";
import Header from "../components/Header.jsx";
import LargeHeader from "../components/LargeHeader.jsx";
import JudgeScoreTableRow from "../components/JudgeScoreTableRow.jsx";
import EditIcon from "../components/EditIcon.jsx";
import ResultsEditTableRow from "../components/ResultsEditTableRow.jsx";
import TickIcon from "../components/TickIcon.jsx";
import JudgeEditTableRow from "../components/JudgeEditTableRow.jsx";
import Popup from "../components/Popup.jsx";

const ResultsPage = () => {

  const { competitionInfo, setCompetitionInfo, resultsUpdated, setResultsUpdated } = useNotifications();
  const [finalResults, setFinalResults] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [clickedRows, setClickedRows] = useState({});
  const [reloadPage, setReloadPage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editRows, setEditRows] = useState(() => {
    // Load the edited rows from localStorage
    const storedEditRows = localStorage.getItem("editedResult");
    return storedEditRows ? JSON.parse(storedEditRows) : {};
  });

  useEffect(() => {
    const storedCompetition = JSON.parse(localStorage.getItem('currentCompetition')) || {};
    setCompetitionInfo(storedCompetition);
  }, []);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('finalResults')) || [];
    console.log('Stored Results:', storedResults); // Check the output here
    setFinalResults(storedResults);
  }, []);

  // Fetch results based on competition info or reloadPage flag
  useEffect(() => {
    const fetchResults = async () => {
      const results = await getFinalResults(competitionInfo.competition_id);
      console.log('Fetched Results:', results.data); // Check the output here
    
      if (results.success) {
        setFinalResults(results.data);
        localStorage.setItem('finalResults', JSON.stringify(results.data));
      } else {
        setErrorMessage("Error fetching results.");
        setShowErrorMessage(true);
        console.error('Error fetching results:', results.data);
      }
    };

    setReloadPage(false);
    if (competitionInfo.competition_id) {
      fetchResults();
    }
  }, [competitionInfo, reloadPage]);

  // Watch for resultsUpdated flag
  useEffect(() => {
    const fetchUpdatedResults = async () => {
      if (resultsUpdated) {
        const results = await getFinalResults(competitionInfo.competition_id);
        if (results.success) {
          setFinalResults(results.data);
          localStorage.setItem('finalResults', JSON.stringify(results.data));
        } else {
          setErrorMessage("Error fetching updated results.");
          setShowErrorMessage(true);
        }

        // Reset resultsUpdated flag after fetching
        setResultsUpdated(false);
      }
    };

    fetchUpdatedResults();
  }, [resultsUpdated, competitionInfo.competition_id, setResultsUpdated]);

   // Step 1: Group results by session, then by gymnast level/age group, and then by apparatus
   const groupedResults = finalResults.reduce((acc, result) => {
    // Group by session_id
    if (!acc[result.session_id]) {
      acc[result.session_id] = {};
    }

    // Group by gymnast level and age group within the session
    const levelAgeGroupKey = `${result.gymnast_level}-${result.gymnast_age_group}`;
    if (!acc[result.session_id][levelAgeGroupKey]) {
      acc[result.session_id][levelAgeGroupKey] = {};
    }

    // Group by apparatus_name within the level/age group
    if (!acc[result.session_id][levelAgeGroupKey][result.apparatus_name]) {
      acc[result.session_id][levelAgeGroupKey][result.apparatus_name] = [];
    }

    acc[result.session_id][levelAgeGroupKey][result.apparatus_name].push(result);
    return acc;
  }, {});

  const calculateFinalScore = (difficulty, executionScores, penalty) => {
    const averageExecutionScore = Array.isArray(executionScores) && executionScores.length > 0 
      ? executionScores.reduce((total, score) => total + score, 0) / executionScores.length 
      : 0;

    const allScoresZero = difficulty === 0 && averageExecutionScore === 0 && penalty === 0;

    return allScoresZero ? 0 : difficulty - averageExecutionScore - penalty;
  };

  const handleRowClick = (gymnastId, apparatusName, judges, execution) => {

    if (judges.length > 0 && execution.length > 0) {
      const key = `${gymnastId}-${apparatusName}`; // Create a unique key
      setClickedRows(prev => ({
        ...prev,
        [key]: !prev[key] // Toggle the clicked state for the specific gymnastId-apparatusName key
      }));
    }
  };

  const handleEditClick = (gymnastId, apparatusName, result) => {
    const key = `${gymnastId}-${apparatusName}`;

      setClickedRows(prev => ({
        ...prev,
        [key]: true // Toggle the clicked state for the specific gymnastId-apparatusName key
      }));
    
    setEditRows((prev) => {
      // If the row is already being edited, remove it from editRows; otherwise, add it.
      const updatedEditRows = {
        ...prev,
        [key]: prev[key] ? null : { ...result },  // Store a copy of the result when editing starts
      };
  
      // Store the updated edit rows in localStorage
      localStorage.setItem("editedResult", JSON.stringify(updatedEditRows));
  
      return updatedEditRows;
    });
  };

  const handleUpdateResults = (gymnastId, apparatusName, updatedFields) => {
    const key = `${gymnastId}-${apparatusName}`;
    setEditRows((prev) => {
      const updatedEditRows = {
        ...prev,
        [key]: { ...prev[key], ...updatedFields }
      };
      // Store the updated edit rows in localStorage
      localStorage.setItem("editedResult", JSON.stringify(updatedEditRows));
      return updatedEditRows;
    });
  };


  const handleUpdateExecutions = (gymnastId, apparatusName, updatedFields) => {
    const key = `${gymnastId}-${apparatusName}`;
    setEditRows((prev) => {
      const updatedEditRows = {
        ...prev,
        [key]: { ...prev[key], ...updatedFields }
      };
      // Store the updated edit rows in localStorage
      localStorage.setItem("editedResult", JSON.stringify(updatedEditRows));
      return updatedEditRows;
    });
  };

  const handleUpdateResultsDB = async (key) => {
    // Retrieve the editedResult object from localStorage
    const editedResult = JSON.parse(localStorage.getItem("editedResult"));
  
    // Get the specific result using the key
    const result = editedResult[key];
  
    // If the result for the key doesn't exist, exit the function
    if (!result) {
      setErrorMessage("Error finding updated rows.")
      setShowErrorMessage(true);
      console.error('No edited result found for the provided key:', key);
      return;
    }
  
    // Extract the necessary data from the result
    const {
      event_id, gymnast_id, apparatus_name, difficulty_judge: judge_id, difficulty, penalty, execution, judges
    } = result;

    console.log(difficulty, penalty);
  
    // Parse difficulty and penalty in case they are strings
    const parsedDifficulty = typeof difficulty === 'string' ? parseFloat(difficulty) : difficulty;
    const parsedPenalty = typeof penalty === 'string' ? parseFloat(penalty) : penalty;
  
    // Ensure that the parsed values are numbers before proceeding
    if (isNaN(parsedDifficulty) || isNaN(parsedPenalty)) {
      setErrorMessage("Invalid input: Difficulty and penalty scores must be valid numbers.")
      setShowErrorMessage(true);
      console.error('Invalid input: Difficulty and penalty scores must be valid numbers.');
      return;
    }
  
    // Create the updated data object for difficulty
    const updatedData = {
      difficulty_score: parsedDifficulty, // New difficulty score (parsed if necessary)
      penalty_score: parsedPenalty,       // New penalty score (parsed if necessary)
    };
  
    try {
      // Call the API to update the Difficulty row
      const response = await updateDifficulty(event_id, gymnast_id, judge_id, updatedData);
  
      if (response.success) {
        console.log('Difficulty updated successfully:', response.data);
  
        // Now update each judge's execution score in the Execution table
        for (let i = 0; i < judges.length; i++) {
          const judgeId = judges[i];
  
          // Check if judgeId is not null and executionScore is valid
          if (judgeId !== null) {
            const executionScore = typeof execution[i] === 'string' ? parseFloat(execution[i]) : execution[i];
  
            if (!isNaN(executionScore)) {
              const executionData = {
                execution_score: executionScore, // Ensure the execution score is a float
              };
  
              try {
                const executionResponse = await updateExecution(event_id, gymnast_id, judgeId, executionData);
  
                if (executionResponse.success) {
                  setErrorMessage("The final results were updated successfully.")
                  setShowErrorMessage(true);
                  console.log(`Execution score updated successfully for Judge ${judgeId}:`, executionResponse.data);
                } else {
                  setErrorMessage(`Error updating execution score for Judge ${judgeId}.`);
                  setShowErrorMessage(true);
                  console.error(`Error updating execution score for Judge ${judgeId}:`, executionResponse.message);
                }
              } catch (error) {
                setErrorMessage(`Error updating execution score for Judge ${judgeId}.`);
                setShowErrorMessage(true);
                console.error(`An error occurred while updating execution score for Judge ${judgeId}:`, error);
              }
            } else {
              setErrorMessage(`Error updating execution score for Judge ${judgeId}.`);
              setShowErrorMessage(true);
              console.error(`Invalid execution score for Judge ${judgeId}: ${execution[i]}`);
            }
          } else {
            setErrorMessage(`Error updating execution score. Invalid judge ID.`);
            setShowErrorMessage(true);
            console.error(`Invalid judge ID: Judge ID cannot be null for execution score update`);
          }
        }
  
        // After updating both difficulty and execution, remove the key from editRows and localStorage
        setEditRows((prev) => {
          const updatedEditRows = { ...prev };
          delete updatedEditRows[key]; // Remove the key from editRows
          localStorage.setItem('editedResult', JSON.stringify(updatedEditRows)); // Update localStorage
          return updatedEditRows; // Return updated state
        });
  
        setReloadPage(true); // Optionally reload the page or trigger UI updates

        const key = `${gymnast_id}-${apparatus_name}`;

        console.log(key);
        setClickedRows(prev => ({
          ...prev,
          [key]: false // Toggle the clicked state for the specific gymnastId-apparatusName key
        }));
  
      } else {
        setErrorMessage(`Error updating difficulty score.`);
        setShowErrorMessage(true);
        console.error('Error updating difficulty:', response.message);
      }
    } catch (error) {
      setErrorMessage(`An error occurred while updating the difficulty score.`);
      setShowErrorMessage(true);
      console.error('An error occurred while updating the difficulty score:', error);
    }
  };

  return (
    <div className="flex w-full h-screen bg-bright-white">
      {isNavVisible && <NavigationBarResults />}
      <div className="flex-1 mb-20 bg-bright-white p-5" style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)} />
        <div className="w-full mb-20 max-w-7xl mx-auto gap-10">
          {/* Header */}
          <PageHeader title={competitionInfo.competition_name} />

          {/* Sessions Configuration */}
          <div className="flex flex-col gap-8">
            <ConfigHeader text="Apparatus Results" />
            <div className="bg-white p-5 rounded-lg w-full">
              <div className="flex flex-col items-center justify-start">

                {/* Table Rows */}
                <div className="w-full rounded-lg">
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-col w-full gap-20">

                    {/* Step 2: Map over grouped results */}
                    {Object.keys(groupedResults).map((sessionId, index) => {
                    // Calculate the position and convert it to a letter
                    const letter = String.fromCharCode(65 + index); // 'A' corresponds to ASCII 65

                    return (
                      <div className="flex flex-col gap-10" key={sessionId}>
                        <LargeHeader text={`Competition ${letter}`} /> {/* Display the letter instead of sessionId */}

                        {Object.keys(groupedResults[sessionId]).map((levelAgeGroupKey) => (
                          <div className="flex flex-col gap-8" key={levelAgeGroupKey}>
                            <Header text={`Level ${levelAgeGroupKey.replace("-", ": ")} yrs`} />

                                {Object.keys(groupedResults[sessionId][levelAgeGroupKey]).map((apparatusName) => {
                                  const sortedResults = groupedResults[sessionId][levelAgeGroupKey][apparatusName]
                                    .map(result => {
                                      const finalScore = calculateFinalScore(result.difficulty, result.execution, result.penalty);
                                      return { ...result, finalScore };
                                    })
                                    .sort((a, b) => b.finalScore - a.finalScore);

                                      return (
                                        <div className="flex flex-col gap-3" key={apparatusName}>
                                          <div className="flex flex-row gap-4">
                                            <div className="flex flex-col w-full gap-3">
                                              {sortedResults.map((result, index) => {
                                                const key = `${result.gymnast_id}-${result.apparatus_name}`;
                                                const editedResult = editRows[key];
                                                const dataToDisplay = editedResult || result;

                                                return (
                                                  <div className="flex flex-col" key={result.gymnast_id}>
                                                    {editRows[key] ? (
                                                      <ResultsEditTableRow
                                                        gymnast_id={dataToDisplay.gymnast_id}
                                                        gymnast_name={dataToDisplay.gymnast_name}
                                                        apparatus_name={dataToDisplay.apparatus_name}
                                                        difficulty={dataToDisplay.difficulty}
                                                        execution={dataToDisplay.execution}
                                                        penalty={dataToDisplay.penalty}
                                                        isFirstRow={index === 0}
                                                        onUpdate={(updatedFields) =>
                                                          handleUpdateResults(dataToDisplay.gymnast_id, dataToDisplay.apparatus_name, updatedFields)
                                                        }
                                                      />
                                                    ) : (
                                                      <ResultsTableRow
                                                        gymnast_id={result.gymnast_id}
                                                        gymnast_name={result.gymnast_name}
                                                        apparatus_name={result.apparatus_name}
                                                        difficulty={result.difficulty}
                                                        execution={result.execution}
                                                        penalty={result.penalty}
                                                        onClick={() => handleRowClick(result.gymnast_id, result.apparatus_name, result.judges, result.execution)}
                                                        isFirstRow={index === 0}
                                                      />
                                                    )}

                                                    {clickedRows[key] && editRows[key] ? (
                                                      <JudgeEditTableRow
                                                        judges={dataToDisplay.judges}
                                                        executions={dataToDisplay.execution}
                                                        setExecutions={(updatedExecutions) =>
                                                          handleUpdateExecutions(result.gymnast_id, result.apparatus_name, {
                                                            execution: updatedExecutions,
                                                          })
                                                        }
                                                      />
                                                    ) : (
                                                      clickedRows[key] && (
                                                        <JudgeScoreTableRow
                                                          gymnast_id={result.gymnast_id}
                                                          executions={result.execution}
                                                          judges={result.judges}
                                                        />
                                                      )
                                                    )}
                                                  </div>
                                                );
                                              })}
                                            </div>

                                            <div className="flex flex-col gap-1">
                                              {sortedResults.map((result, index) => (
                                                <div
                                                  className={`flex justify-end 
                                                    ${index === 0 && clickedRows[`${result.gymnast_id}-${result.apparatus_name}`] ? 'pt-[82px] pb-[124px]' : ''}
                                                    ${index === 0 && !clickedRows[`${result.gymnast_id}-${result.apparatus_name}`] ? 'pt-[82px] pb-[23px]' : ''}
                                                    ${index > 0 && clickedRows[`${result.gymnast_id}-${result.apparatus_name}`] ? 'py-[21px] pb-[118px]' : ''}
                                                    ${index > 0 && !clickedRows[`${result.gymnast_id}-${result.apparatus_name}`] ? 'py-[21px]' : ''}
                                                  `}
                                                  key={result.gymnast_id}
                                                >
                                                  {editRows[`${result.gymnast_id}-${result.apparatus_name}`] ? (
                                                    <TickIcon onClick={() => handleUpdateResultsDB(`${result.gymnast_id}-${result.apparatus_name}`)} />
                                                  ) : (
                                                    (result.difficulty_judge !== null && result.judges.length > 0 && result.execution.length > 0) && (
                                                      <EditIcon onClick={() => handleEditClick(result.gymnast_id, result.apparatus_name, result)} />
                                                    )
                                                  )}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            );
                        })}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showErrorMessage && (
        <Popup
            message={errorMessage}
            onClose={() => setShowErrorMessage(false)} // Just hide the popup on "No"
          />
      )}
    </div>
  );
};

export default ResultsPage;