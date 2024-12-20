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
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

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
    return storedJudges.every((judge, index) => {
      console.log(`Validating judge at index ${index}:`, judge);
  
      if (!judge.gsa_id) {
        console.log(`Judge at index ${index} has an invalid or missing GSA ID`);
        return false;
      }
      if (!judge.first_name) {
        console.log(`Judge at index ${index} has an invalid or missing first name`);
        return false;
      }
      if (!judge.last_name) {
        console.log(`Judge at index ${index} has an invalid or missing last name`);
        return false;
      }
      if (!judge.club) {
        console.log(`Judge at index ${index} has an invalid or missing club`);
        return false;
      }
      if (judge.level === null || judge.level === undefined) {
        console.log(`Judge at index ${index} has an invalid or missing level`);
        return false;
      }
      if (!judge.head_judge === null || judge.head_judge === undefined) {
        console.log(`Judge at index ${index} has an invalid or missing head judge status`);
        return false;
      }
      if (!judge.role) {
        console.log(`Judge at index ${index} has an invalid or missing role`);
        return false;
      }
  
      console.log(`Judge at index ${index} is valid`);
      return true;
    });
  };

  const validateConfigPage = () => {
    // Validate competition data
    const storedCompetition = JSON.parse(localStorage.getItem('competition')) || {};
    const requiredCompetitionFields = [
      "name", "location", "startDate", "endDate", "style",
      "minBronze", "minSilver", "minGold"
    ];
  
    for (const field of requiredCompetitionFields) {
      if (!storedCompetition[field]) {
        return false; // Return false if any required field is empty
      }
    }
  
    // Validate apparatus events
    // Validate apparatus events
    const storedApparatusEvents = JSON.parse(localStorage.getItem('apparatusEvents')) || [];
    const apparatusCount = {};

    // Check for duplicates
    for (const apparatus of storedApparatusEvents) {
      console.log(apparatus);
      if (apparatus.selected === "") {
        console.log("error 1");
        return false; // Return false if any apparatus name is empty
      }
      apparatusCount[apparatus.selected] = (apparatusCount[apparatus.selected] || 0) + 1;
    }
    
    // If any apparatus has been selected more than once, return false
    if (Object.values(apparatusCount).some(count => count > 1)) {
      console.log("error 2");
      return false; // Return false if duplicates found
    }

    // Validate that at least one apparatus has been selected
    const hasValidApparatus = storedApparatusEvents.length > 0;
    if (!hasValidApparatus) {
      console.log("error 3");
      return false; // Return false if no apparatus has been selected
    }
  
    // Validate age groups
    const storedAgeGroups = JSON.parse(localStorage.getItem('age')) || [];
    const agePairs = {};
    for (const group of storedAgeGroups) {
      if (group.minAge === null || group.maxAge === null) {
        console.log("error 4");
        return false; // Return false if any age group is missing min or max age
      }

      if (group.minAge < 1 || group.minAge > 100 || group.maxAge < 1 || group.maxAge > 100) {
        console.log("error 6"); // Log an error for invalid age range
        return false; // Return false if ages are not within valid range
      }
      
      const pair = `${group.minAge}-${group.maxAge}`;
      if (agePairs[pair]) {
        console.log("error 5");
        return false; // Return false if there are duplicate age pairs
      }
      agePairs[pair] = true; // Mark this pair as seen
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
        "gsa_id", "first_name", "last_name", "club", 
        "district", "level", "date_of_birth", "age", "group_id"
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
      if (gymnast.group_id !== null && !validGroupIds.includes(gymnast.group_id)) {
        console.log("problem 4");
        return false; // Invalid gymnastGroup ID
      }
    }

    return true; // Return true if all validations pass
  };

  const handleCreateCompetition = async () => {
    // Validate all required pages
    if (!validateConfigPage() || !validateTimeSlotPage() || !validateGymnastPage() || !validateJudgePage()) {
      alert("Please complete all required fields of the required pages.");
      return;
    }
  
    const storedCompetition = JSON.parse(localStorage.getItem('competition')) || {};
    console.log("Stored Competition Data:", storedCompetition);
    console.log("Admin info:", adminInfo);
    // Create the competition payload
    const payload = {
      admin_id: adminInfo.admin_id,
      competition_name: storedCompetition.name,
      start_date: storedCompetition.startDate,
      end_date: storedCompetition.endDate,
      location: storedCompetition.location,
      style: storedCompetition.style,
      bronze_min_score: storedCompetition.minBronze,
      // bronze_max_score: storedCompetition.maxBronze,
      silver_min_score: storedCompetition.minSilver,
      // silver_max_score: storedCompetition.maxSilver,
      gold_min_score: storedCompetition.minGold,
      // gold_max_score: storedCompetition.maxGold,
    };
  
    console.log("Competition Payload:", payload);
  
    // Call the create competition API
    const response = await createCompetition(payload);
    console.log("Create Competition Response:", response);
  
    if (response.success) {
     
      const createdCompetitionId = response.data.competition_id; // Assuming your API returns this
      console.log("Created Competition ID:", createdCompetitionId);
  
      // Create qualifications using the competition id
      const storedQualifications = JSON.parse(localStorage.getItem('qualifications')) || [];
      console.log("Stored Qualifications:", storedQualifications);
  
      // Iterate through qualifications and create each one
      for (const qualification of storedQualifications) {
        const qualificationPayload = {
          competition_id: createdCompetitionId,
          name: qualification.name,
          min_score: parseFloat(qualification.score), // Ensure score is a float
        };
  
        console.log("Creating Qualification Payload:", qualificationPayload);
        const qualResponse = await createQualification(qualificationPayload);
        console.log("Qualification Response:", qualResponse);
  
        if (!qualResponse.success) {
          console.error(`Error creating qualification ${qualification.name}: ${qualResponse.message}`);
        }
      }
  
      const storedTimeSlots = JSON.parse(localStorage.getItem('timeslots')) || [];
      console.log("Stored Time Slots:", storedTimeSlots);

      const timeSlotMapping = {};
  
      for (const timeSlot of storedTimeSlots) {
        const timeSlotPayload = {
          competition_id: createdCompetitionId,
          date: new Date(timeSlot.date).toISOString().split('T')[0], // Convert to YYYY-MM-DD
          report_time: timeSlot.reportTime,
          competition_time: timeSlot.compTime,
          award_time: timeSlot.awardTime,
          completed: false,
        };
  
        console.log("Creating Time Slot Payload:", timeSlotPayload);
        const timeSlotResponse = await createTimeSlot(timeSlotPayload);
        console.log("Time Slot Response:", timeSlotResponse);
  
        if (timeSlotResponse.success) {
          // Map the local time slot ID to the created time slot ID
          timeSlotMapping[timeSlot.id] = timeSlotResponse.data.time_slot_id;
  
          const numSessions = timeSlot.numSessions; // Retrieve numSessions from timeslot
          for (let i = 0; i < numSessions; i++) {
            const sessionPayload = {
              time_slot_id: timeSlotResponse.data.time_slot_id, // Use the created time slot ID
              completed: false,
            };
  
            console.log("Creating Session Payload:", sessionPayload);
            const sessionResponse = await createSession(sessionPayload);
            console.log("Session Response:", sessionResponse);
  
            if (!sessionResponse.success) {
              console.error(`Error creating session for time slot ${timeSlotResponse.data.time_slot_id}: ${sessionResponse.message}`);
            }
          }
        } else {
          console.error(`Error creating time slot on ${timeSlot.date}: ${timeSlotResponse.message}`);
          continue;
        }
      }
  
      // Create gymnast groups
      const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
      const sessionGroupMapping = {}; // Create a mapping of session IDs
      const groupMapping = {};
  
      for (const group of storedGroups) {
        const timeSlotId = group.timeslotId; // Assuming you store timeslotId in the group object
        const createdTimeSlotId = timeSlotMapping[timeSlotId];

        const sessions = await getSessionsByTimeSlot(createdTimeSlotId); // Adjust as necessary
        console.log("Sessions for Time Slot ID:", createdTimeSlotId, "->", sessions);

        const sessionIndex = group.selectedNumSessions - 1; // Convert to zero-based index
        console.log(sessionIndex)
        console.log(sessions.data)
        const sessionId = sessions.data[sessionIndex]?.session_id; // Get the session ID based on the index
        console.log(sessionId)
  
        if (sessionId) {
          const gymnastGroupPayload = {
            session_id: sessionId,
          };
          console.log("Creating Gymnast Group Payload:", gymnastGroupPayload);
          const groupResponse = await createGymnastGroup(gymnastGroupPayload);
          console.log("Gymnast Group Response:", groupResponse);

          if (!groupResponse.success) {
            console.error(`Error creating gymnast group for session ${sessionId}: ${groupResponse.message}`);
          } else {
            // Save the group ID for event creation
            sessionGroupMapping[groupResponse.data.group_id] = sessionId;
            groupMapping[group.id] = groupResponse.data.group_id;
            console.log(`Mapped Group ID ${group.id} to Real Group ID ${groupResponse.data.group_id}`);
          }
        } else {
          console.error(`No session found for group with selectedNumSessions: ${group.selectedNumSessions}`);
        }
      }
  
      // Create apparatuses
      const storedApparatuses = JSON.parse(localStorage.getItem('apparatusEvents')) || [];
      console.log(storedApparatuses)
      const createdApparatusIds = []; // Array to store created apparatus IDs
      

      for (const apparatus of storedApparatuses) {
        const apparatusPayload = {
          apparatus_name: apparatus.selected, // Get the name from the selected field
          competition_id: createdCompetitionId,
        };
        console.log("Creating Apparatus Payload:", apparatusPayload);
        const apparatusResponse = await createApparatus(apparatusPayload);
        console.log("Apparatus Response:", apparatusResponse);
  
        if (apparatusResponse.success) {
          createdApparatusIds.push(apparatusResponse.data.apparatus_id); // Store the created apparatus ID
          console.log(`Apparatus "${apparatus.name}" created successfully!`);
        } else {
          console.error(`Error creating apparatus "${apparatus.name}": ${apparatusResponse.message}`);
        }
      }
  
      // Create events
      for (const groupId in sessionGroupMapping) {
        const sessionId = sessionGroupMapping[groupId];
        for (const apparatusId of createdApparatusIds) {
          const eventPayload = {
            group_id: groupId,
            // session_id: sessionId,
            apparatus_id: apparatusId,
          };
          console.log("Creating Event Payload:", eventPayload);
          const eventResponse = await createEvent(eventPayload);
          console.log("Event Response:", eventResponse);
  
          if (!eventResponse.success) {
            console.error(`Error creating event for group ${groupId} and apparatus ${apparatusId}: ${eventResponse.message}`);
          }
        }
      }
  
      const defaultGender = storedCompetition.style === "MAG" ? "M" : "F";

      const storedGymnasts = JSON.parse(localStorage.getItem('gymnasts')) || [];
      for (const gymnast of storedGymnasts) {
        const gymnastPayload = {
          gsa_id: gymnast.gsa_id,
          first_name: gymnast.first_name,
          last_name: gymnast.last_name,
          date_of_birth: new Date(gymnast.date_of_birth).toISOString().split('T')[0], // Convert to YYYY-MM-DD
          club: gymnast.club,
          district: gymnast.district,
          level: gymnast.level,
          age: gymnast.age ? gymnast.age.replace(' yrs', '') : '',
          gender: defaultGender,
          group_id: groupMapping[gymnast.group_id], // Link to the gymnast group created earlier
        };
        console.log("Creating Gymnast Payload:", gymnastPayload);
        const gymnastResponse = await createGymnast(gymnastPayload);
        console.log("Gymnast Response:", gymnastResponse);
  
        if (!gymnastResponse.success) {
          console.error(`Error creating gymnast ${gymnast.first_name} ${gymnast.last_name}: ${gymnastResponse.message}`);
        }
      }
  
      // Create judges
      const storedJudges = JSON.parse(localStorage.getItem('judges')) || [];
      for (const judge of storedJudges) {
        const judgePayload = {
          competition_id: createdCompetitionId,
          gsa_id: judge.gsa_id,
          first_name: judge.first_name,
          last_name: judge.last_name,
          club: judge.club,
          level: judge.level,
          head_judge: judge.head_judge === "True", // Convert string to boolean
          role: judge.role,
        };
        console.log("Creating Judge Payload:", judgePayload);
        const judgeResponse = await createJudge(judgePayload);
        console.log("Judge Response:", judgeResponse);
  
        if (!judgeResponse.success) {
          console.error(`Error creating judge ${judge.first_name} ${judge.last_name}: ${judgeResponse.message}`);
        }
      }
      
      localStorage.removeItem("competition");
      localStorage.removeItem("ageGroups");
      localStorage.removeItem("apparatusEvents");
      localStorage.removeItem("groups");
      localStorage.removeItem("gymnasts");
      localStorage.removeItem("judges");
      localStorage.removeItem("qualifications");
      localStorage.removeItem("timeslots");

      alert("Competition created successfully!");
      navigate("/homeAdmin");
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
                Once all pages have turned green, you would have successfully configured all required competition information.
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
              <span className="font-montserrat font-medium text-md md:text-lg lg:text-xl">
                <br />
                You’re now one step closer to a smooth and efficient competition experience.
                Thank you for using ScoreMatics to manage your event.
                <br />
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
