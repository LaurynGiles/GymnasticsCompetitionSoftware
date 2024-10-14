import db from '../models/index.js';
const { TimeSlot, Session, Event, Gymnast, Difficulty, Execution, GymnastGroup, Apparatus } = db; // Import necessary models

// Fetch final results based on competition ID
export async function getFinalResults(req, res, next) {
  try {
    console.log("Request received for getFinalResults:", req.params);
    
    const { competitionId } = req.params;
    console.log("Competition ID:", competitionId); // Log the competition ID

    // Fetch all apparatus for the competition
    const apparatusList = await Apparatus.findAll({ where: { competition_id: competitionId } });
    // Create a mapping of apparatus IDs to names
    const apparatusMapping = apparatusList.reduce((acc, apparatus) => {
      acc[apparatus.apparatus_id] = apparatus.apparatus_name;
      return acc;
    }, {});

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

              const executionScores = executionResults.map(execution => execution.execution_score);
              const judgeIds = executionResults.map(execution => execution.judge_id);
              // const difficultyJudge = difficultyResults.judge_id;
              // console.log(difficultyJudge);

              const finalResult = {
                session_id: session.session_id,
                timeslot_id: timeslot.time_slot_id,
                event_id: event.event_id,
                date: timeslot.date,
                report_time: timeslot.report_time,
                competition_time: timeslot.competition_time,
                award_time: timeslot.award_time,
                session_completed: session.completed,
                gymnast_id: gymnast.gymnast_id,
                gymnast_name: `${gymnast.first_name} ${gymnast.last_name}`,
                gymnast_level: gymnast.level,
                gymnast_age_group: gymnast.age,
                apparatus_id: event.apparatus_id,
                apparatus_name: apparatusMapping[event.apparatus_id] || 'Unknown',
                difficulty: difficultyResults ? difficultyResults.difficulty_score : 0,
                execution: executionScores,
                judges: judgeIds,
                penalty: difficultyResults ? difficultyResults.penalty_score : 0,
                difficulty_judge: difficultyResults ? difficultyResults.judge_id : null,
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