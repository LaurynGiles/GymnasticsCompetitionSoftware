import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import TinyBlueButton from "../components/TinyBlueButton";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../utils/connection.jsx";
import { createCompetition, createQualification, createTimeSlot, createSession, getSessionsByTimeSlot, createGymnastGroup, createEvent, createApparatus, createGymnast, createJudge } from "../utils/api.js";
import CompletionStatus from "../components/CompletionStatus.jsx";

const CompletePage = () => {

  const navigate = useNavigate();
  const { adminInfo } = useNotifications();

  const [storedCompetition, setCompetition] = useState({});
  const [storedTimeSlots, setStoredTimeSlots] = useState([]);
  const [storedGroups, setStoredGroups] = useState([]);
  const [storedGymnasts, setStoredGymnasts] = useState([]);
  const [storedJudges, setStoredJudges] = useState([]);
  const [storedApparatusEvents, setStoredApparatusEvents] = useState([]);
  const [storedAgeGroups, setStoredAgeGroups] = useState([]);
  const [pageStatus, setPageStatus] = useState({
    configPage: 'incomplete',
    timeSlotPage: 'incomplete',
    gymnastPage: 'incomplete',
    judgePage: 'incomplete',
  });

  useEffect(() => {
    const loadData = () => {
      const comp = JSON.parse(localStorage.getItem('competition')) || {};
      const timeSlots = JSON.parse(localStorage.getItem('timeslots')) || [];
      const groups = JSON.parse(localStorage.getItem('groups')) || [];
      const apparatusEvents = JSON.parse(localStorage.getItem('apparatusEvents')) || [];
      const ageGroups = JSON.parse(localStorage.getItem('ageGroups')) || [];
      const gymnasts = JSON.parse(localStorage.getItem('gymnasts')) || [];
      const judges = JSON.parse(localStorage.getItem('judges')) || [];

      setStoredTimeSlots(timeSlots);
      setStoredGroups(groups);
      setStoredApparatusEvents(apparatusEvents);
      setStoredAgeGroups(ageGroups);
      setCompetition(comp);
      setStoredGymnasts(gymnasts);
      setStoredJudges(judges);
    };

    loadData();
  }, []);

  useEffect(() => {
    const isValid = validateConfigPage();
    console.log(isValid);
    setPageStatus((prev) => ({ ...prev, configPage: isValid ? 'complete' : 'incomplete' }));
  }, [storedCompetition, storedApparatusEvents, storedAgeGroups]);

  useEffect(() => {
    const isValidTimeSlots = validateTimeSlotPage();
    setPageStatus((prev) => ({ ...prev, timeSlotPage: isValidTimeSlots ? 'complete' : 'incomplete' }));
  }, [storedTimeSlots]);

  useEffect(() => {
    const isValidGymnastPage = validateGymnastPage();
    setPageStatus((prev) => ({ ...prev, gymnastPage: isValidGymnastPage ? 'complete' : 'incomplete' }));
  }, [storedGroups, storedGymnasts, storedTimeSlots]);

  useEffect(() => {
    const isValidJudgePage = validateJudgePage();
    setPageStatus((prev) => ({ ...prev, judgePage: isValidJudgePage ? 'complete' : 'incomplete' }));
  }, [storedJudges]);

  const validateTimeSlotPage = () => {
    const storedTimeSlots = JSON.parse(localStorage.getItem('timeslots')) || [];
    
    return storedTimeSlots.every(slot => 
      slot.date && slot.reportTime && slot.compTime && slot.awardTime && slot.numSessions
    );
  };

  const validateJudgePage = () => {
    const storedJudges = JSON.parse(localStorage.getItem('judges')) || [];
    
    // Check that every judge has all required fields filled
    return storedJudges.every(judge => 
      judge.GSAId && judge.f_name && judge.l_name && judge.club && 
      judge.level !== null && judge.headJudge && judge.role
    );
  };

  const validateConfigPage = () => {
    // Validate competition data
    const storedCompetition = JSON.parse(localStorage.getItem('competition')) || {};
    const requiredCompetitionFields = [
      "name", "location", "startDate", "endDate", "style",
      "minBronze", "maxBronze", "minSilver", "maxSilver", 
      "minGold", "maxGold"
    ];
  
    for (const field of requiredCompetitionFields) {
      if (!storedCompetition[field]) {
        return false; // Return false if any required field is empty
      }
    }
  
    // Validate apparatus events
    const storedApparatusEvents = JSON.parse(localStorage.getItem('apparatusEvents')) || [];
    const hasValidApparatus = storedApparatusEvents.some(apparatus => apparatus.selected !== '');
    if (!hasValidApparatus) {
      return false; // Return false if no apparatus has been selected
    }
  
    // Validate age groups
    const storedAgeGroups = JSON.parse(localStorage.getItem('ageGroups')) || [];
    const hasValidAgeGroups = storedAgeGroups.some(group => group.minAge !== null && group.maxAge !== null);
    if (!hasValidAgeGroups) {
      return false; // Return false if no age group is defined correctly
    }
  
    return true; // Return true if all validations pass
  };

  const validateGymnastPage = () => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const storedTimeSlots = JSON.parse(localStorage.getItem('timeslots')) || [];
    const storedGymnasts = JSON.parse(localStorage.getItem('gymnasts')) || [];

    // Check if each gymnast group has a valid timeslotId and numSessions
    for (const group of storedGroups) {
      if (!group.timeslotId || group.numSessions === null) {
        console.log("problem 1");
        return false; // Incomplete if timeslotId or numSessions is missing
      }
      
      // Check if timeslotId exists in storedTimeSlots
      const validTimeslot = storedTimeSlots.some(slot => slot.id === group.timeslotId);
      if (!validTimeslot) {
        console.log("problem 2");
        return false; // Incomplete if the timeslotId is not found
      }
    }

    // Validate that all gymnast fields are filled and check gymnastGroup validity
    const validGroupIds = storedGroups.map(group => group.id);
    for (const gymnast of storedGymnasts) {
      const requiredFields = [
        "GSAId", "f_name", "l_name", "club", 
        "district", "level", "dateOfBirth", "ageGroup", "gymnastGroup"
      ];

      for (const field of requiredFields) {
        if (!gymnast[field]) {
          console.log("problem 3");
          console.log(gymnast);
          console.log(gymnast[field]);
          return false; // Return false if any required field is empty
        }
      }

      // Check if the gymnast's group ID is valid
      if (gymnast.gymnastGroup !== null && !validGroupIds.includes(gymnast.gymnastGroup)) {
        console.log("problem 4");
        return false; // Invalid gymnastGroup ID
      }
    }

    return true; // Return true if all validations pass
  };

  const handleCreateCompetition = async () => {

    if (!validateConfigPage() || !validateTimeSlotPage() || !validateGymnastPage() || !validateJudgePage()) {
      alert("Please complete all required fields of the required pages.");
      return;
    }
  
    const storedCompetition = JSON.parse(localStorage.getItem('competition')) || {};

    // Create the competition payload
    const payload = {
      admin_id: adminInfo.admin_id,
      competition_name: storedCompetition.name,
      start_date: storedCompetition.startDate,
      end_date: storedCompetition.endDate,
      location: storedCompetition.location,
      style: storedCompetition.style,
      bronze_min_score: storedCompetition.minBronze,
      bronze_max_score: storedCompetition.maxBronze,
      silver_min_score: storedCompetition.minSilver,
      silver_max_score: storedCompetition.maxSilver,
      gold_min_score: storedCompetition.minGold,
      gold_max_score: storedCompetition.maxGold,
    };

    // Call the create competition API
    const response = await createCompetition(payload);
    if (response.success) {
      alert("Competition created successfully!");

      // Create qualifications using the competition id
      const createdCompetitionId = response.data.competition_id; // Assuming your API returns this
      const storedQualifications = JSON.parse(localStorage.getItem('qualifications')) || [];

      // Iterate through qualifications and create each one
      for (const qualification of storedQualifications) {
        const qualificationPayload = {
          competition_id: createdCompetitionId,
          name: qualification.name,
          min_score: parseFloat(qualification.score) // Ensure score is a float
        };

        const qualResponse = await createQualification(qualificationPayload);
        if (!qualResponse.success) {
          console.error(`Error creating qualification ${qualification.name}: ${qualResponse.message}`);
        }
      }

      const storedTimeSlots = JSON.parse(localStorage.getItem('timeslots')) || [];

      for (const timeSlot of storedTimeSlots) {
        const timeSlotPayload = {
          competition_id: createdCompetitionId,
          date: new Date(timeSlot.date).toISOString().split('T')[0], // Convert to YYYY-MM-DD
          report_time: timeSlot.reportTime,
          competition_time: timeSlot.compTime,
          award_time: timeSlot.awardTime,
          completed: false,
        };

        const timeSlotResponse = await createTimeSlot(timeSlotPayload);
        if (!timeSlotResponse.success) {
          console.error(`Error creating time slot on ${timeSlot.date}: ${timeSlotResponse.message}`);
          continue;
        }

        const numSessions = timeSlot.numSessions; // Retrieve numSessions from timeslot
        for (let i = 0; i < numSessions; i++) {
          const sessionPayload = {
            time_slot_id: timeSlotResponse.data.time_slot_id, // Use the created time slot ID
            completed: false,
          };

          const sessionResponse = await createSession(sessionPayload);
          if (!sessionResponse.success) {
            console.error(`Error creating session for time slot ${timeSlotResponse.data.time_slot_id}: ${sessionResponse.message}`);
          }
        }

      }

      // Create gymnast groups
      const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
      const sessionMapping = {}; // Create a mapping of session IDs

      for (const group of storedGroups) {
          const sessions = await getSessionsByTimeSlot(timeSlotResponse.data.time_slot_id); // Adjust as necessary
          const sessionIndex = group.selectedNumSessions - 1; // Convert to zero-based index
          const sessionId = sessions[sessionIndex]?.session_id; // Get the session ID based on the index

          if (sessionId) {
              const gymnastGroupPayload = {
                  session_id: sessionId,
              };
              const groupResponse = await createGymnastGroup(gymnastGroupPayload);
              if (!groupResponse.success) {
                  console.error(`Error creating gymnast group for session ${sessionId}: ${groupResponse.message}`);
              } else {
                  // Save the group ID for event creation
                  sessionMapping[groupResponse.data.group_id] = sessionId;
              }
          } else {
              console.error(`No session found for group with selectedNumSessions: ${group.selectedNumSessions}`);
          }
      }

      // Create apparatuses
      const storedApparatuses = JSON.parse(localStorage.getItem('apparatusEvents')) || [];
      const createdApparatusIds = []; // Array to store created apparatus IDs

      for (const apparatus of storedApparatuses) {
          const apparatusPayload = {
              name: apparatus.selected, // Get the name from the selected field
          };
          const apparatusResponse = await createApparatus(apparatusPayload);
          if (apparatusResponse.success) {
              createdApparatusIds.push(apparatusResponse.data.apparatus_id); // Store the created apparatus ID
              console.log(`Apparatus "${apparatus.name}" created successfully!`);
          } else {
              console.error(`Error creating apparatus "${apparatus.name}": ${apparatusResponse.message}`);
          }
      }

      // Create events
      for (const groupId in sessionMapping) {
          const sessionId = sessionMapping[groupId];
          for (const apparatusId of createdApparatusIds) {
              const eventPayload = {
                  group_id: groupId,
                  session_id: sessionId,
                  apparatus_id: apparatusId,
              };
              const eventResponse = await createEvent(eventPayload);
              if (!eventResponse.success) {
                  console.error(`Error creating event for group ${groupId} and apparatus ${apparatusId}: ${eventResponse.message}`);
              }
          }
      }

      const storedGymnasts = JSON.parse(localStorage.getItem('gymnasts')) || [];
      for (const gymnast of storedGymnasts) {
          const gymnastPayload = {
              gsa_id: gymnast.GSAId,
              first_name: gymnast.f_name,
              last_name: gymnast.l_name,
              date_of_birth: new Date(gymnast.dateOfBirth).toISOString().split('T')[0], // Convert to YYYY-MM-DD
              club: gymnast.club,
              district: gymnast.district,
              level: gymnast.level,
              age: gymnast.ageGroup,
              group_id: gymnast.gymnastGroup, // Link to the gymnast group created earlier
          };
          const gymnastResponse = await createGymnast(gymnastPayload);
          if (!gymnastResponse.success) {
              console.error(`Error creating gymnast ${gymnast.first_name} ${gymnast.last_name}: ${gymnastResponse.message}`);
          }
      }

      // Create judges
      const storedJudges = JSON.parse(localStorage.getItem('judges')) || [];
      for (const judge of storedJudges) {
          const judgePayload = {
              gsa_id: judge.GSAId,
              first_name: judge.f_name,
              last_name: judge.l_name,
              club: judge.club,
              level: judge.level,
              head_judge: judge.headJudge === "True", // Convert string to boolean
              role: judge.role,
          };
          const judgeResponse = await createJudge(judgePayload);
          if (!judgeResponse.success) {
              console.error(`Error creating judge ${judge.first_name} ${judge.last_name}: ${judgeResponse.message}`);
          }
      }

      navigate("HomeAdmin");
    } else {
      alert(`Error creating competition: ${response.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-bright-white">
      <NavigationBar />
      <div className="flex-1 flex flex-col items-center px-4 lg:px-0 ml-64 gap-8 mt-[50px]">
        <div className="w-full mx-auto flex flex-col items-center justify-center text-left">
          <div className="bg-notification-box p-5 rounded-lg shadow-lg max-w-5xl mx-auto">
            <p className="text-prussian-blue leading-relaxed">
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">
                Competition Setup Complete!
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                <br />
                You have successfully configured all required competition information.
                Your competition setup is now complete, and you are ready to create and start the competition.
                <br />
                <br />
              </span>
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">
                What’s next?
                <br />
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                Review the details you’ve entered to ensure all configurations are correct.
                Once verified, you can create the competition by clicking the "Create Competition" button below.
                <br />
                If you want to make further changes, feel free to revisit the configuration pages using the navigation bar.
                <br />
                <br />
              </span>
              <span className="font-montserrat font-semibold text-lg md:text-xl lg:text-2xl">
                Congratulations on completing the setup!
              </span>
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                <br />
                You’re now one step closer to a smooth and efficient competition experience.
                Thank you for using ScoreMatics to manage your event.
                <br />
                Click the button below to finalize your setup and officially create the competition.
              </span>
            </p>
          </div>
        </div>
        <CompletionStatus pageStatus={pageStatus} /> {/* Include the status component */}
        <TinyBlueButton title={"Create Competition"} onClick={handleCreateCompetition} />
      </div>
    </div>
  );
};

export default CompletePage;
