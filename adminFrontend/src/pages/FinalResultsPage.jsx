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
import FinalResultsTableRow from "../components/FinalResultsTableRow.jsx";
import { getFinalResults } from "../utils/api.js";
import Header from "../components/Header.jsx";
import LargeHeader from "../components/LargeHeader.jsx";

const FinalResultsPage = () => {

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
  
    // Group by gymnast_id within the session
    if (!acc[result.session_id][result.gymnast_id]) {
      acc[result.session_id][result.gymnast_id] = {
        gymnast_name: result.gymnast_name,
        apparatusScores: {}, // To hold apparatus scores
        totalFinalScore: 0, // To hold total final score
      };
    }
  
    // Debugging print statements
    console.log("Processing result:", result); // Log the current result being processed
    console.log("Current groupedResults state:", JSON.stringify(acc, null, 2)); // Log the current state of groupedResults
  
    // Calculate average execution score
    const averageExecutionScore = Array.isArray(result.execution) && result.execution.length > 0 
      ? result.execution.reduce((total, score) => total + score, 0) / result.execution.length 
      : 0;
  
    const allScoresZero = result.difficulty === 0 && averageExecutionScore === 0 && result.penalty === 0;
  
    // Calculate final score for this apparatus
    const finalScore = allScoresZero ? 0 : result.difficulty - averageExecutionScore - result.penalty;
  
    // Store apparatus score for the gymnast
    acc[result.session_id][result.gymnast_id].apparatusScores[result.apparatus_name] = finalScore;
  
    // Update total final score for the gymnast
    acc[result.session_id][result.gymnast_id].totalFinalScore += finalScore;
  
    return acc;
  }, {});

  return (
    <div className="flex w-full h-screen bg-bright-white">
      {isNavVisible && <NavigationBarResults />}
      <div className="flex-1 mb-20 bg-bright-white p-5" style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)} />
        <div className="w-full max-w-7xl mx-auto gap-10">
          {/* Header */}
          <PageHeader title={competitionInfo.competition_name} />

          {/* Sessions Configuration */}
          <div className="flex flex-col gap-8">
            <ConfigHeader text="Final Results" />
            <div className="bg-white p-5 rounded-lg w-full">
              <div className="flex flex-col items-center justify-start">

                {/* Table Rows */}
                <div className="w-full rounded-lg">
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-col w-full gap-10">

                    {/* Step 2: Map over grouped results */}
                    {Object.keys(groupedResults).map((sessionId) => (
                        <div className="flex flex-col gap-10" key={sessionId}>
                          <LargeHeader text={`Competition ${sessionId}`} />

                          {Object.keys(groupedResults[sessionId]).map((gymnastId) => {
                            const gymnastData = groupedResults[sessionId][gymnastId];

                            return (
                              <div className="flex flex-col gap-2" key={gymnastId}>
                                <FinalResultsTableRow 
                                  gymnast_id={gymnastId}
                                  gymnast_name={gymnastData.gymnast_name}
                                  apparatus_list={gymnastData.apparatusScores} // Pass apparatus scores
                                  final_score={gymnastData.totalFinalScore} // Pass total final score
                                  isFirstRow={false} // Assuming this is not the first row for the gymnast
                                />
                              </div>
                            );
                          }).sort((a, b) => b.totalFinalScore - a.totalFinalScore)} {/* Sort by total final score in descending order */}
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

export default FinalResultsPage;