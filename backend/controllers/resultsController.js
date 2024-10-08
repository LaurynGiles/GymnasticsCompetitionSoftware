import db from '../models/index.js';
const { TimeSlot, Session, Event, Gymnast, Difficulty, Execution, GymnastGroup } = db; // Import necessary models

// Fetch final results based on competition ID
// Fetch final results based on competition ID
export async function getFinalResults(req, res, next) {
  try {
    console.log("Request received for getFinalResults:", req.params);
    
    const { competitionId } = req.params;
    console.log("Competition ID:", competitionId); // Log the competition ID

    // Find all timeslots for the given competition
    const timeslots = await TimeSlot.findAll({
      where: { competition_id: competitionId },
      include: [{ model: Session }] // Include sessions for each timeslot
    });
    console.log("Timeslots found:", timeslots); // Log the found timeslots

    // Map to get session IDs and groups for each timeslot
    const sessionMapping = {};
    for (const timeslot of timeslots) {
      const sessions = await Session.findAll({ where: { time_slot_id: timeslot.time_slot_id } });
      console.log(`Sessions for Timeslot ID ${timeslot.time_slot_id}:`, sessions); // Log sessions for each timeslot
      sessionMapping[timeslot.time_slot_id] = sessions;

      // Preload groups for each session to reduce database queries later
      for (const session of sessions) {
        const groups = await GymnastGroup.findAll({ where: { session_id: session.session_id } });
        session.groups = groups; // Attach groups to the session for later use
      }
    }

    // Prepare final results
    const finalResults = [];
    console.log("Starting to process timeslots and their sessions...");

    // For each timeslot and its sessions, fetch events and their gymnast results
    for (const timeslot of timeslots) {
      const sessions = sessionMapping[timeslot.time_slot_id];
      console.log(`Processing Timeslot ID ${timeslot.time_slot_id} with Sessions:`, sessions); // Log the sessions for the current timeslot

      for (const session of sessions) {
        const groups = session.groups || [];
        for (const group of groups) {
          const events = await Event.findAll({ where: { group_id: group.group_id } });
          console.log(`Events for Group ID ${group.group_id}:`, events); // Log the events for each group

          // Store execution scores to calculate the average later
          const gymnastScores = {}; // Object to hold gymnast scores by gymnast ID
          
          for (const event of events) {
            const gymnasts = await Gymnast.findAll({ where: { group_id: event.group_id } });
            console.log(`Gymnasts for Event ID ${event.event_id}:`, gymnasts); // Log the gymnasts for each event

            for (const gymnast of gymnasts) {
              const difficultyResults = await Difficulty.findOne({ where: { event_id: event.event_id, gymnast_id: gymnast.gymnast_id } });
              const executionResults = await Execution.findAll({ where: { event_id: event.event_id, gymnast_id: gymnast.gymnast_id } }); // Get all execution results

              // Calculate total and count of execution scores
              let totalExecutionScore = 0;
              let executionCount = 0;

              for (const result of executionResults) {
                totalExecutionScore += result.execution_score; // Sum execution scores
                executionCount++; // Count the execution results
              }

              // Calculate average execution score
              const averageExecutionScore = executionCount > 0 ? totalExecutionScore / executionCount : 0;

              const finalResult = {
                gymnast_id: gymnast.gymnast_id,
                gymnast_name: `${gymnast.first_name} ${gymnast.last_name}`,
                apparatus: event.apparatus_id,
                difficulty: difficultyResults ? difficultyResults.difficulty_score : 0,
                execution: averageExecutionScore, // Use average execution score
                penalty: difficultyResults ? difficultyResults.penalty_score : 0,
              };

              finalResults.push(finalResult);
              console.log(`Final Result for Gymnast ID ${gymnast.gymnast_id}:`, finalResult); // Log the final result for each gymnast
            }
          }
        }
      }
    }

    console.log("Final results compiled:", finalResults); // Log the final results before sending response
    res.status(200).json(finalResults);
  } catch (error) {
    console.error("Error in getFinalResults:", error); // Log the error if one occurs
    next(error);
  }
}