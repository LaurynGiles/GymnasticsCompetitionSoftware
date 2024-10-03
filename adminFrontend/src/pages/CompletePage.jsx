import React from "react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import TinyBlueButton from "../components/TinyBlueButton";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../utils/connection.jsx";
import { createCompetition, createQualification, createTimeSlot } from "../utils/api.js";

const CompletePage = () => {

  const navigate = useNavigate();
  const { adminInfo, competition } = useNotifications();

  const handleJudgeHome = () => {
    navigate("HomeAdmin");
  };

  const handleCreateCompetition = async () => {
    // Ensure all required fields are present
    if (!competition.name || !competition.location || !competition.startDate || !competition.endDate || !competition.style) {
      alert("Please fill in all required fields before creating a competition.");
      return;
    }

    // Create the competition payload
    const payload = {
      admin_id: adminInfo.admin_id,
      competition_name: competition.name,
      start_date: competition.startDate,
      end_date: competition.endDate,
      location: competition.location,
      style: competition.style,
      bronze_min_score: competition.minBronze,
      bronze_max_score: competition.maxBronze,
      silver_min_score: competition.minSilver,
      silver_max_score: competition.maxSilver,
      gold_min_score: competition.minGold,
      gold_max_score: competition.maxGold,
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
        const sessions = await getSessionsForTimeSlot(timeSlotResponse.data.time_slot_id); // Adjust as necessary
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

      navigate("HomeAdmin");
    } else {
      alert(`Error creating competition: ${response.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-bright-white">
      <NavigationBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-0 ml-64 gap-6 md:gap-16">
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
        <TinyBlueButton title={"Create Competition"} onClick={handleCreateCompetition} />
      </div>
    </div>
  );
};

export default CompletePage;
