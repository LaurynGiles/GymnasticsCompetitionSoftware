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
import { getFinalResults } from "../utils/api.js";
import Header from "../components/Header.jsx";
import LargeHeader from "../components/LargeHeader.jsx";
import JudgeScoreTableRow from "../components/JudgeScoreTableRow.jsx"

const ResultsPage = () => {

  const { competitionInfo, setCompetitionInfo } = useNotifications();
  const [finalResults, setFinalResults] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCompetition = JSON.parse(localStorage.getItem('currentCompetition')) || {};
    setCompetitionInfo(storedCompetition);
  }, []);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('finalResults')) || [];
    console.log('Stored Results:', storedResults); // Check the output here
    setFinalResults(storedResults);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await getFinalResults(competitionInfo.competition_id);
      console.log('Fetched Results:', results.data); // Check the output here
    
      if (Array.isArray(results.data)) {
        setFinalResults(results.data);
        localStorage.setItem('finalResults', JSON.stringify(results.data));
      } else {
        console.error('Fetched results are not an array:', results.data);
      }
    };
    
    fetchResults();
  }, [competitionInfo]);

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
                    {Object.keys(groupedResults).map((sessionId) => (
                        <div className="flex flex-col gap-10" key={sessionId}>
                          <LargeHeader text={`Competition ${sessionId}`} />

                          {Object.keys(groupedResults[sessionId]).map((levelAgeGroupKey) => (
                            <div className="flex flex-col gap-8" key={levelAgeGroupKey}>
                              {/* Display Level and Age Group Header if needed */}
                              <Header text={`Level ${levelAgeGroupKey.replace("-", ": ")} yrs`} /> {/* Optional: Customize display */}

                              {Object.keys(groupedResults[sessionId][levelAgeGroupKey]).map((apparatusName) => {
                                // Sort the results by final score within this apparatus group
                                const sortedResults = groupedResults[sessionId][levelAgeGroupKey][apparatusName].map(result => {
                                  const finalScore = calculateFinalScore(result.difficulty, result.execution, result.penalty);
                                  return { ...result, finalScore }; // Add finalScore to the result
                                }).sort((a, b) => b.finalScore - a.finalScore); // Sort in descending order

                                return (
                                  <div className="flex flex-col gap-2" key={apparatusName}>
                                    {sortedResults.map((result, index) => (
                                      <div key={result.gymnast_id}>
                                        <ResultsTableRow 
                                          key={index}
                                          gymnast_id={result.gymnast_id}
                                          gymnast_name={result.gymnast_name}
                                          apparatus_name={result.apparatus_name}
                                          difficulty={result.difficulty}
                                          execution={result.execution}
                                          penalty={result.penalty}
                                          isFirstRow={index === 0}
                                        />
                                        <JudgeScoreTableRow 
                                          key={index}
                                          gymnast_id={result.gymnast_id}
                                          executions={result.execution}
                                          judges={result.judges}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      ))}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;