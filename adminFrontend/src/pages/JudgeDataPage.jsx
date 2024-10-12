import React, { useState, useEffect } from "react";
import ConfigHeader from "../components/ConfigHeader.jsx";
import AddButton from "../components/AddButton.jsx"; 
import PageHeader from "../components/PageHeader.jsx";
import XIcon from "../components/XIcon.jsx";
import BarsIcon from "../components/BarsIcon.jsx";
import { useNavigate } from "react-router-dom";
import { updateJudge, deleteJudge, createJudge, getJudgesByCompetition } from "../utils/api.js";
import NavigationBarResults from "../components/NavigationBarResults.jsx";
import TickIcon from "../components/TickIcon.jsx";
import DeletePopup from "../components/DeletePopup.jsx";
import JudgeTableRow from "../components/JudgeTableRow.jsx";

const JudgeDataPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();
  const [judges, setJudges] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [judgeToDelete, setJudgeToDelete] = useState(() => {
    const storedJudgeToDelete = localStorage.getItem("judgeToDelete");
    return storedJudgeToDelete ? JSON.parse(storedJudgeToDelete) : null;
  });

  const [newJudge, setNewJudge] = useState(() => {
    const storedNewJudge = localStorage.getItem("newJudge");
    return storedNewJudge ? JSON.parse(storedNewJudge) : null;
  });

  const [competitionInfo, setCompetitionInfo] = useState(() => {
    const savedCompetition = localStorage.getItem("currentCompetition");
    return savedCompetition ? JSON.parse(savedCompetition) : null;
  });

  const [updatedJudges, setUpdatedJudges] = useState(() => {
    const storedUpdates = localStorage.getItem("updatedJudges");
    return storedUpdates ? JSON.parse(storedUpdates) : [];
  });

  useEffect(() => {
    const fetchJudgesForCompetition = async () => {
        if (competitionInfo && competitionInfo.competition_id) {
            const response = await getJudgesByCompetition(competitionInfo.competition_id); // Add this API call
            if (response.success) {
                setJudges(response.data);
            } else {
                console.error("Error fetching judges:", response.message);
            }
        }
    };

    fetchJudgesForCompetition();

    setShouldRefetch(false);
}, [competitionInfo, shouldRefetch]);

  const handleAddJudge = () => {

    const newJudge = {
        gsa_id: null,
        competition_id: competitionInfo.competition_id,
        first_name: "",
        last_name: "",
        club: "",
        district: "",
        level: "",
        head_judge: false,
        role: "E",
    };

    setNewJudge(newJudge);

    localStorage.setItem("newJudge", JSON.stringify(newJudge));
  };

  const handleCreateJudge = async () => {
    if (newJudge) {
        const { gsa_id, competition_id, first_name, last_name, club, level, head_judge, role } = newJudge;

        console.log(newJudge);
  
      // Validate required fields
      if (!gsa_id || !competition_id || !first_name || !last_name || !club || !level || role === null) {
        console.error("Invalid judge data. All fields must be filled.");
        return; // Exit if validation fails
      }
  
      const response = await createJudge(newJudge);
      if (response.success) {
        console.log("Judge created successfully:", response.data);
        setNewJudge(null); // Reset the newJudge state
        localStorage.removeItem("newJudge"); // Clear from local storage
        setShouldRefetch(true); // Trigger refetch of judges
      } else {
        console.error("Failed to create judge:", response.message);
      }
    }
  };

  const handleUpdateJudge = (id, updatedFields) => {
    console.log(id, updatedFields);
  
    const originalJudge = judges.find(judge => judge.judge_id === id);
  
    if (originalJudge) {
      const updatedJudge = {
        ...originalJudge, // Spread the original data
        ...updatedFields, // Spread the updated fields
      };

      console.log(updatedJudge)
  
      setUpdatedJudges(prev => {
        const newUpdates = [...prev.filter(g => g.judge_id !== updatedJudge.judge_id), updatedJudge];
        
        localStorage.setItem("updatedJudges", JSON.stringify(newUpdates));
        return newUpdates;
      });
    }
  };

  const handleUpdateJudgeDB = async (judgeId) => {
    const updatedJudge = updatedJudges.find(u => u.judge_id === judgeId);
  
    if (updatedJudge) {
        const { gsa_id, first_name, last_name, club, level, head_judge, role } = updatedJudge;

        if (!gsa_id || !first_name || !last_name || !club || !level || role === null) {
          console.log()
          console.error("Invalid judge data. All fields must be filled.");
          return; // Exit if validation fails
        }
  
      const response = await updateJudge(judgeId, updatedJudge);
  
      if (response.success) {
        console.log('Judge updated successfully:', response.data);
  
        setUpdatedJudges(prev => {
          const newUpdates = prev.filter(g => g.judge_id !== judgeId);
          // Update local storage
          localStorage.setItem("updatedJudges", JSON.stringify(newUpdates));
          return newUpdates;
        });
  
        setShouldRefetch(true);
  
      } else {
        console.error('Failed to update judge:', response.message);
        // Here you can show an error message to the user if needed
      }
    } else {
      console.error('No updated judge found for ID:', judgeId);
    }
  };

  const handleRemoveJudge = async (id) => {

    if (!id) {
      console.error("Invalid judge ID. Cannot delete.");
      return; // Exit if the ID is invalid
    }
  
    try {
      const response = await deleteJudge(id); // Call your delete function from the API
      if (response.success) {
        setJudges(prevJudges => prevJudges.filter(judge => judge.judge_id !== id));
        console.log("Judge removed successfully");
        // Optionally show a success message
  
        setShouldRefetch(true);
      } else {
        console.error("Error deleting judge:", response.message);
        // Show an error message if needed
      }
    } catch (error) {
      console.error("Error occurred while deleting judge:", error);
      // Handle any additional error reporting
    }
  };

  const handleShowPopup = (judgeId) => {
    setJudgeToDelete(judgeId);
    localStorage.setItem("judgeToDelete", JSON.stringify(judgeId));
    setShowPopup(true);
  };

  return (
    <div className={`flex w-full left-0 h-screen bg-bright-white`}>
      {isNavVisible && <NavigationBarResults />}
      
      <div className={`flex-1 mb-20 bg-bright-white p-5`} style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)}/>
        <div className={`w-full ml-20 mb-20 ${isNavVisible ? 'max-w-[1300px]' : 'max-w-[1600px]'}`}>
          <PageHeader title="Judge Info Configuration" />

            <div className="flex flex-col mt-16 gap-6">
              <ConfigHeader text="Judges" />


              <div className={`flex flex-col bg-white p-5 rounded-lg `}>
                
                <div className="flex flex-row gap-4">

                  <div className="w-[97%] flex flex-col gap-2">
                    {judges.map((judge, index) => {
                        console.log(judge);
                        const updatedJudge = updatedJudges.find(u => u.judge_id === judge.judge_id);

                        const dataToDisplay = updatedJudge || judge;

                        return (
                          <JudgeTableRow
                            key={dataToDisplay.judge_id}
                            ID={dataToDisplay.judge_id}
                            GSAId={Number(dataToDisplay.gsa_id)}
                            f_name={dataToDisplay.first_name}
                            l_name={dataToDisplay.last_name}
                            club={dataToDisplay.club}
                            level={Number(dataToDisplay.level)}
                            headJudge={dataToDisplay.head_judge}
                            role={dataToDisplay.role}
                            onUpdate={(updatedFields) => handleUpdateJudge(dataToDisplay.judge_id, updatedFields)}
                            showTitle={index === 0}
                          />
                        );
                      })}
                      {newJudge && (
                        <JudgeTableRow 
                          key={judges.length + 1} // Assign a new ID based on the current count
                          ID={judges.length > 0 ? Math.max(...judges.map(g => g.judge_id)) + 1 : 1} // Generate a new ID
                          GSAId={Number(newJudge.gsa_id)}
                          f_name={newJudge.first_name}
                          l_name={newJudge.last_name}
                          club={newJudge.club}
                          level={Number(newJudge.level)}
                          headJudge={newJudge.head_judge}
                          onUpdate={(updatedFields) => {
                            const updatedNewJudge = { ...newJudge, ...updatedFields };
                            setNewJudge(updatedNewJudge);
                            localStorage.setItem("newJudge", JSON.stringify(updatedNewJudge));
                          }}
                          showTitle={false} // or any condition you want
                        />
                      )}
                  </div>

                  {/* XIcons for each group */}
                  <div className="flex flex-col items-start">
                    {judges.map((judge, index) => {
                      const updatedJudge = updatedJudges.find(u => u.judge_id === judge.judge_id);

                      return (
                        <div className={`flex justify-end ${index === 0 ? 'pt-[60px] py-[23px]' : 'py-[23px]'}`} key={index}>
                         {/* Conditionally render TickIcon or XIcon */}
                          {updatedJudge ? (
                            <TickIcon className="cursor-pointer" onClick={() => handleUpdateJudgeDB(judge.judge_id)} />
                          ) : (
                            <XIcon className="cursor-pointer" onClick={() => handleShowPopup(judge.judge_id)} isVisible={true}/>
                          )}
                      </div>
                      );
                    })}
                    {newJudge && (
                      <div className={`flex justify-end pt-[19px]`}>
                        <TickIcon 
                          className="cursor-pointer" 
                          onClick={handleCreateJudge} // Call create judge on click
                        />
                      </div>
                    )}
                  </div>

                </div>
              </div>
              <div className="flex justify-center py-5">
                <AddButton title="+" onClick={handleAddJudge} isActive={newJudge === null}/>
              </div>
            </div>


        </div>
       
      </div>

    {showPopup && (
      <DeletePopup
          message="Are you sure you want to delete this judge?"
          onYes={async () => {
            handleRemoveJudge(judgeToDelete);
            setShowPopup(false); // Hide the popup after deletion
          }}
          onNo={() => setShowPopup(false)} // Just hide the popup on "No"
        />
    )}
      
    </div>


  );
};

export default JudgeDataPage;
