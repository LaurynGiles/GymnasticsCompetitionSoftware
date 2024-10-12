import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar.jsx";
import ConfigHeader from "../components/ConfigHeader.jsx";
import AddButton from "../components/AddButton.jsx";
import GroupHeaders from "../components/GroupHeaders.jsx"; 
import PageHeader from "../components/PageHeader.jsx";
import GroupTableRow from "../components/GroupTableRow.jsx";
import GymnastHeaders from "../components/GymnastHeaders.jsx"
import GymnastTableRow from "../components/GymnastTableRow.jsx";
import XIcon from "../components/XIcon.jsx";
import BarsIcon from "../components/BarsIcon.jsx";
import StartButton from "../components/StartButton.jsx";
import { useNavigate } from "react-router-dom";
import { getGymnastGroupsByCompetition, getGymnastsByGroup, updateGymnast, deleteGymnast } from "../utils/api.js";
import { useNotifications } from "../utils/connection.jsx";
import GroupTableData from "../components/GroupTableData.jsx";
import NavigationBarResults from "../components/NavigationBarResults.jsx";
import TickIcon from "../components/TickIcon.jsx";
import DeletePopup from "../components/DeletePopup.jsx";

const JudgeDataPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();
  const [judges, setGymnasts] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [judgeToDelete, setJudgeToDelete] = useState(null);

  const [competitionInfo, setCompetitionInfo] = useState(() => {
    const savedCompetition = localStorage.getItem("currentCompetition");
    return savedCompetition ? JSON.parse(savedCompetition) : null;
  });

  const [updatedJudges, setUpdatedJudges] = useState(() => {
    // Load updated gymnasts from local storage if available
    const storedUpdates = localStorage.getItem("updatedJudges");
    return storedUpdates ? JSON.parse(storedUpdates) : [];
  });

  useEffect(() => {
    // const fetchGymnastsForGroups = async () => {
    //   const allGymnasts = [];

    //   for (const group of localGroups) {
    //     console.log(group.group_id)
    //     const response = await getGymnastsByGroup(group.group_id);
    //     if (response.success) {
    //       allGymnasts.push(...response.data); // Add gymnasts for this group to the array
    //     } else {
    //       console.error("Error fetching gymnasts for group:", response.message);
    //     }
    //   }

    //   setGymnasts(allGymnasts); // Update state with all gymnasts
    //   const uniqueAgeGroups = [...new Set(allGymnasts.map(gymnast => gymnast.age))]; // Get unique age groups
    //   console.log(uniqueAgeGroups);
    //   setAgeGroups(uniqueAgeGroups); // Set the age groups state
    // };

    // if (localGroups.length > 0) {
    //   fetchGymnastsForGroups();
    //   setShouldRefetch(false);
    // }

    // console.log(gymnasts);
  }, [shouldRefetch]);

  const handleAddGymnast = () => {
    const newId = judges.length > 0 
      ? Math.max(...judges.map(g => g.id)) + 1 
      : 1;

    const newGymnast = { 
      id: newId,
      GSAId: null,
      f_name: "",
      l_name: "",
      club: "",
      district: "",
      level: null,
      dateOfBirth: null,
      ageGroup: "",
      gymnastGroup: null
    };
    setGymnasts(prevGymnasts => [...prevGymnasts, newGymnast]);
  };

  const handleUpdateGymnast = (id, updatedFields) => {
    console.log(id, updatedFields);
  
    // Find the original gymnast data based on the ID
    const originalGymnast = judges.find(gymnast => gymnast.gymnast_id === id);
  
    // If the gymnast exists, create an updated version
    if (originalGymnast) {
      // Initialize updatedGymnast with the original gymnast data
      const updatedGymnast = {
        ...originalGymnast, // Spread the original data
        ...updatedFields, // Spread the updated fields
      };

      console.log(updatedGymnast)
  
      // Update the updatedGymnasts list
      setUpdatedJudges(prev => {
        const newUpdates = [...prev.filter(g => g.gymnast_id !== updatedGymnast.gymnast_id), updatedGymnast];
        
        // Store updated gymnasts in local storage
        localStorage.setItem("updatedGymnasts", JSON.stringify(newUpdates));
        return newUpdates;
      });
    }
  };

  const handleUpdateGymnastDB = async (gymnastId) => {
    // Find the updated gymnast details
    const updatedGymnast = updatedJudges.find(u => u.gymnast_id === gymnastId);
    
    if (updatedGymnast) {
      const response = await updateGymnast(gymnastId, updatedGymnast);
      
      if (response.success) {
        console.log('Gymnast updated successfully:', response.data);
        
        // Remove the updated gymnast from the updatedGymnasts list
        setUpdatedJudges(prev => {
          const newUpdates = prev.filter(g => g.gymnast_id !== gymnastId);
          // Update local storage
          localStorage.setItem("updatedGymnasts", JSON.stringify(newUpdates));
          return newUpdates;
        });

        setShouldRefetch(true);

      } else {
        console.error('Failed to update gymnast:', response.message);
        // Here you can show an error message to the user if needed
      }
    } else {
      console.error('No updated gymnast found for ID:', gymnastId);
    }
  };

  const handleRemoveGymnast = async (id) => {
    try {
      const response = await deleteGymnast(id); // Call your delete function from the API
      if (response.success) {
        // Update local state to remove the gymnast
        setGymnasts(prevGymnasts => prevGymnasts.filter(gymnast => gymnast.gymnast_id !== id));
        console.log("Gymnast removed successfully");
        // Optionally show a success message

        setShouldRefetch(true);

      } else {
        console.error("Error deleting gymnast:", response.message);
        // Show an error message if needed
      }
    } catch (error) {
      console.error("Error occurred while deleting gymnast:", error);
      // Handle any additional error reporting
    }
  };

  const getGroupDetails = (groupId) => {
    return localGroups.find(g => g.id === groupId);
  };

  const groupedGroups = localGroups.reduce((acc, group) => {
    const timeSlotId = group.Session?.time_slot_id; // Assuming time_slot_id is in the group object
    if (!acc[timeSlotId]) {
      acc[timeSlotId] = []; // Create an array for this time slot if it doesn't exist
    }
    acc[timeSlotId].push(group); // Add the group to the respective time slot array
    return acc;
  }, {});

  const handleShowPopup = (gymnastId) => {
    setJudgeToDelete(gymnastId);
    setShowPopup(true);
  };

  return (
    <div className={`flex w-full left-0 h-screen bg-bright-white`}>
      {isNavVisible && <NavigationBarResults />}
      
      <div className={`flex-1 mb-20 bg-bright-white p-5`} style={{ marginLeft: isNavVisible ? '18%' : '0', width: isNavVisible ? 'calc(100% - 18%)' : '100%' }}>
        <BarsIcon onClick={() => setIsNavVisible(!isNavVisible)}/>
        <div className={`w-full ml-20 ${isNavVisible ? 'max-w-[1300px]' : 'max-w-[1600px]'}`}>
          <PageHeader title="Gymnast Info Configuration" />

            <div className="flex flex-col mt-16 gap-6">
              <div className="flex flex-col items-start">
                  <ConfigHeader text="Gymnast Groups" />
              </div>

              <div className="flex flex-col items-center">

                  <div className={`flex flex-col items-center justify-center gap-10 bg-white p-5 rounded-lg ${isNavVisible ? 'w-full' : 'w-[80%]'}`}>
                      {Object.keys(groupedGroups).map((timeSlotId) => (
                      <div key={timeSlotId} className="w-full ml-4 flex items-center justify-center flex-row gap-1">
                        <div className="w-full flex flex-col gap-2">
                          {/* Sort the groups by sessionLabel before rendering */}
                          {groupedGroups[timeSlotId]
                            .sort((a, b) => (a.sessionLabel > b.sessionLabel ? 1 : -1)) // Sorting by sessionLabel
                            .map((group, index) => {
                              const timeSlot = group.Session?.TimeSlot; // Accessing the time slot data
                              return (
                                <GroupTableData
                                  key={group.group_id}
                                  groupId={group.group_id}
                                  sessionLabel={group.sessionLabel}
                                  date={timeSlot?.date || ''}
                                  reportTime={timeSlot?.report_time || ''}
                                  compTime={timeSlot?.competition_time || ''}
                                  awardTime={timeSlot?.award_time || ''}
                                  isFirstRow={index === 0} // Set isFirstRow to true for the first row
                                />
                              );
                            })}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            <div className="flex flex-col mt-16 gap-6">
              <ConfigHeader text="Gymnasts" />


              <div className={`flex flex-col bg-white p-5 rounded-lg `}>
                
                <div className="flex flex-row gap-4">

                  <div className="w-[97%] flex flex-col gap-2">
                    {judges.map((gymnast, index) => {
                        // Check if gymnast is updated
                        const updatedGymnast = updatedJudges.find(u => u.gymnast_id === gymnast.gymnast_id);

                        // Use updated gymnast data if it exists, otherwise use the original gymnast data
                        const dataToDisplay = updatedGymnast || gymnast;

                        const formattedDateOfBirth = 
                          dataToDisplay.date_of_birth instanceof Date 
                            ? dataToDisplay.date_of_birth.toISOString() // Convert to ISO string
                            : dataToDisplay.date_of_birth; // Keep as is

                        const group = getGroupDetails(dataToDisplay.gymnastGroup);
                        const groupValid = Boolean(group); 
                        return (
                          <GymnastTableRow
                            key={dataToDisplay.gymnast_id}
                            ID={dataToDisplay.gymnast_id}
                            GSAId={Number(dataToDisplay.gsa_id)}
                            f_name={dataToDisplay.first_name}
                            l_name={dataToDisplay.last_name}
                            club={dataToDisplay.club}
                            district={dataToDisplay.district}
                            level={Number(dataToDisplay.level)}
                            dateOfBirth={formattedDateOfBirth}
                            ageGroup={dataToDisplay.age}
                            gymnastGroup={dataToDisplay.group_id}
                            onUpdate={(updatedFields) => handleUpdateGymnast(dataToDisplay.gymnast_id, updatedFields)}
                            groupError={!groupValid}
                            age_options={ageGroups}
                            showTitle={index === 0}
                          />
                        );
                      })}
                  </div>

                  {/* XIcons for each group */}
                  <div className="flex flex-col items-start">
                    {judges.map((gymnast, index) => {
                      // Check if gymnast is updated
                      const updatedGymnast = updatedJudges.find(u => u.gymnast_id === gymnast.gymnast_id);

                      return (
                        <div className={`flex justify-end ${index === 0 ? 'pt-[91px] py-[23px]' : 'py-[23px]'}`} key={index}>
                         {/* Conditionally render TickIcon or XIcon */}
                          {updatedGymnast ? (
                            <TickIcon className="cursor-pointer" onClick={() => handleUpdateGymnastDB(gymnast.gymnast_id)} />
                          ) : (
                            <XIcon className="cursor-pointer" onClick={() => handleShowPopup(gymnast.gymnast_id)} isVisible={true}/>
                          )}
                      </div>
                      );
                    })}
                  </div>

                </div>
              </div>
              <div className="flex justify-center py-5">
                <AddButton title="+" onClick={handleAddGymnast} />
              </div>
            </div>


        </div>
       
      </div>

    {showPopup && (
      <DeletePopup
          message="Are you sure you want to delete this gymnast?"
          onYes={async () => {
            handleRemoveGymnast(judgeToDelete);
            setShowPopup(false); // Hide the popup after deletion
          }}
          onNo={() => setShowPopup(false)} // Just hide the popup on "No"
        />
    )}
      
    </div>


  );
};

export default JudgeDataPage;
