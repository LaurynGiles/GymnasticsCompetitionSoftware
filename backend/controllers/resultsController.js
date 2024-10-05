import db from '../models/index.js';
const { TimeSlot, Session, Event, Gymnast, Difficulty, Execution } = db; // Import necessary models

// Fetch final results based on competition ID
export async function getFinalResults(req, res, next) {
    try {
      const { competitionId } = req.params;
      console.log("Competition ID:", competitionId); // Log the competition ID
  
      // Find all timeslots for the given competition
      const timeslots = await TimeSlot.findAll({
        where: { competition_id: competitionId },
        include: [{ model: Session }] // Include sessions for each timeslot
      });
      console.log("Timeslots found:", timeslots); // Log the found timeslots
  
      // Map to get session IDs
      const sessionMapping = {};
      for (const timeslot of timeslots) {
        const sessions = await Session.findAll({ where: { time_slot_id: timeslot.time_slot_id } });
        console.log(`Sessions for Timeslot ID ${timeslot.time_slot_id}:`, sessions); // Log sessions for each timeslot
        sessionMapping[timeslot.time_slot_id] = sessions;
      }
  
      // Prepare final results
      const finalResults = [];
  
      // For each timeslot and its sessions, fetch events and their gymnast results
      for (const timeslot of timeslots) {
        const sessions = sessionMapping[timeslot.time_slot_id];
        console.log(`Processing Timeslot ID ${timeslot.time_slot_id} with Sessions:`, sessions); // Log the sessions for the current timeslot
  
        for (const session of sessions) {
          const events = await Event.findAll({ where: { session_id: session.session_id } });
          console.log(`Events for Session ID ${session.session_id}:`, events); // Log the events for each session
  
          for (const event of events) {
            const gymnasts = await Gymnast.findAll({ where: { group_id: event.group_id } });
            console.log(`Gymnasts for Event ID ${event.event_id}:`, gymnasts); // Log the gymnasts for each event
  
            for (const gymnast of gymnasts) {
              const difficultyResults = await Difficulty.findOne({ where: { event_id: event.event_id, gymnast_id: gymnast.gymnast_id } });
              const executionResults = await Execution.findOne({ where: { event_id: event.event_id, gymnast_id: gymnast.gymnast_id } });
  
              finalResults.push({
                gymnast_id: gymnast.gymnast_id,
                gymnast_name: `${gymnast.first_name} ${gymnast.last_name}`,
                difficulty: difficultyResults ? difficultyResults.difficulty_score : 0,
                execution: executionResults ? executionResults.execution_score : 0,
                penalty: executionResults ? executionResults.penalty : 0,
              });
              console.log(`Final Result for Gymnast ID ${gymnast.gymnast_id}:`, finalResults[finalResults.length - 1]); // Log the final result for each gymnast
            }
          }
        }
      }
  
      res.status(200).json(finalResults);
    } catch (error) {
      console.error("Error in getFinalResults:", error); // Log the error if one occurs
      next(error);
    }
  };