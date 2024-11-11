import React, { useState, useEffect } from "react";
import NavigationBarResults from "../components/NavigationBarResults";
import ConfigHeader from "../components/ConfigHeader";
import PageHeader from "../components/PageHeader";
import BarsIcon from "../components/BarsIcon.jsx";
import { useNotifications } from "../utils/connection.jsx";
import QualificationsTableRow from "../components/QualificationsTableRow.jsx";
import { getFinalResults } from "../utils/api.js";
import Header from "../components/Header.jsx";
import LargeHeader from "../components/LargeHeader.jsx";
import Popup from "../components/Popup.jsx";

const QualificationsPage = () => {
  const { competitionInfo, setCompetitionInfo, resultsUpdated, setResultsUpdated } = useNotifications();
  const [finalResults, setFinalResults] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      if (Array.isArray(results.data)) {
        setFinalResults(results.data);
        localStorage.setItem('finalResults', JSON.stringify(results.data));
      } else {
        setErrorMessage("Error fetching results.");
        setShowErrorMessage(true);
      }
    };

    if (competitionInfo.competition_id) {
      fetchResults();
    }
  }, [competitionInfo]);

  useEffect(() => {
    const fetchUpdatedResults = async () => {
      if (resultsUpdated) {
        const results = await getFinalResults(competitionInfo.competition_id);
        if (Array.isArray(results.data)) {
          setFinalResults(results.data);
          localStorage.setItem('finalResults', JSON.stringify(results.data));
        } else {
          setErrorMessage("Error fetching updated results.");
          setShowErrorMessage(true);
        }

        setResultsUpdated(false);
      }
    };

    fetchUpdatedResults();
  }, [resultsUpdated, competitionInfo.competition_id, setResultsUpdated]);

  const groupedResults = finalResults.reduce((acc, result) => {
    if (!acc[result.session_id]) {
      acc[result.session_id] = {};
    }

    const levelAgeGroupKey = `${result.gymnast_level}-${result.gymnast_age_group}`;
    
    if (!acc[result.session_id][levelAgeGroupKey]) {
      acc[result.session_id][levelAgeGroupKey] = {};
    }

    if (!acc[result.session_id][levelAgeGroupKey][result.gymnast_id]) {
      acc[result.session_id][levelAgeGroupKey][result.gymnast_id] = {
        gymnast_name: result.gymnast_name,
        apparatusScores: {},
        totalFinalScore: 0,
      };
    }
  
    const averageExecutionScore = Array.isArray(result.execution) && result.execution.length > 0 
      ? result.execution.reduce((total, score) => total + score, 0) / result.execution.length 
      : 0;

    const allScoresZero = result.difficulty === 0 && averageExecutionScore === 0 && result.penalty === 0;
    const finalScore = allScoresZero ? 0 : result.difficulty - averageExecutionScore - result.penalty;
  
    acc[result.session_id][levelAgeGroupKey][result.gymnast_id].apparatusScores[result.apparatus_name] = finalScore;
    acc[result.session_id][levelAgeGroupKey][result.gymnast_id].totalFinalScore += finalScore;
  
    return acc;
  }, {});

  return (
    <div className="flex w-full h-screen bg-bright-white">
      {isNavVisible && <NavigationBarResults />}
      <div className="flex-1 mb-20 bg-bright-white p-5" style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)} />
        <div className="w-full mb-20 max-w-7xl mx-auto gap-10">
          <PageHeader title={competitionInfo.competition_name} />

          <div className="flex flex-col gap-8">
            <ConfigHeader text="Final Results" />
            <div className="bg-white p-5 rounded-lg w-full">
              <div className="flex flex-col items-center justify-start">

                <div className="w-full rounded-lg">
                  <div className="flex flex-row gap-10">
                    <div className="flex flex-col w-full gap-20">

                      {Object.keys(groupedResults).map((sessionId) => (
                        <div className="flex flex-col gap-6" key={sessionId}>
                          <LargeHeader text={`Competition ${sessionId}`} />

                          {Object.keys(groupedResults[sessionId]).map((levelAgeGroupKey) => (
                            <div className="flex flex-col gap-2" key={levelAgeGroupKey}>
                              <Header text={`Level ${levelAgeGroupKey.replace("-", ": ")} yrs`} />
                              
                              <div className="flex flex-row gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                  {Object.entries(groupedResults[sessionId][levelAgeGroupKey])
                                    .sort(([, a], [, b]) => b.totalFinalScore - a.totalFinalScore)
                                    .map(([gymnastId, gymnastData], index) => (
                                      <QualificationsTableRow
                                        key={gymnastId}
                                        gymnast_id={Number(gymnastId)}
                                        gymnast_name={gymnastData.gymnast_name}
                                        apparatus_list={gymnastData.apparatusScores}
                                        final_score={gymnastData.totalFinalScore}
                                        isFirstRow={index === 0}
                                      />
                                    ))}
                                </div>
                              </div>
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
      {showErrorMessage && (
        <Popup
          message={errorMessage}
          onClose={() => setShowErrorMessage(false)}
        />
      )}
    </div>
  );
};

export default QualificationsPage;