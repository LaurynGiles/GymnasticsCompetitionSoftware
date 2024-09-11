import db from '../models/index.js';

const { Event, Session, TimeSlot, GymnastGroup, Gymnast, Difficulty } = db;

export async function checkEventCompletion(req, res, next) {
  try {
    console.log("CHECKING event");
    const { eventId } = req.params;
    
    // Fetch the event with associated GymnastGroup and Difficulty entries
    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: GymnastGroup,
          as: 'GymnastGroup',
          include: [Gymnast],
        },
        Difficulty
      ],
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const allGymnasts = event.GymnastGroup.Gymnasts;
    console.log(allGymnasts);
    const difficultyEntries = event.Difficulties;  // Assuming `Difficulties` is the association name
    console.log(difficultyEntries);

    // Extract gymnast IDs from Difficulty entries
    const difficultyGymnastIds = difficultyEntries.map(entry => entry.gymnast_id);

    // Check if every gymnast has a corresponding entry in the Difficulty table
    const allGymnastsHaveEntries = allGymnasts.every(gymnast => 
      difficultyGymnastIds.includes(gymnast.gymnast_id)
    );

    console.log(allGymnastsHaveEntries);
    console.log(allGymnasts.length);
    console.log(difficultyEntries.length);

    const sessionId = event.GymnastGroup.session_id;
    console.log(event);
    console.log(event.GymnastGroup);
    console.log(`SESSIONID: ${sessionId}`);

    if (allGymnastsHaveEntries) {
      // Mark the event as complete
      await Event.update({ completed: true }, { where: { event_id: eventId } });

      return res.status(200).json({ complete: true, message: 'Event marked as complete.', session_id: sessionId });
    } else {
      return res.status(200).json({ complete: false, message: 'Event not complete yet.' });
    }
  } catch (error) {
    next(error);
  }
}

export async function checkSessionCompletion(req, res, next) {
    try {
      console.log("CHECKING session");
      const sessionId = req.params.sessionId;
      const session = await Session.findByPk(sessionId, { include: [{model: GymnastGroup, include: Event}] });

      if (!session) {
        console.log("ERROR 1");
        return res.status(404).json({ message: 'Session not found' });
      }

      const allEventsComplete = session.GymnastGroups.every(group => 
        group.Events.every(event => event.completed)
      );

      console.log(allEventsComplete);

      const timeSlotId = session.time_slot_id;

      if (allEventsComplete) {
        await Session.update({ completed: true }, { where: { session_id: sessionId } });
        // req.params.timeSlotId = session.time_slot_id;
        // await checkTimeSlotCompletion(req, res, next);

        return res.status(200).json({ complete:true, message: 'Session marked as complete.', time_slot_id: timeSlotId });
      } else {
        return res.status(200).json({ complete:false, message: 'Session not complete yet.' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  
  export async function checkTimeSlotCompletion(req, res, next) {
    try {
      console.log("CHECKING timeslot");
      const timeSlotId = req.params.timeSlotId;
      const timeSlot = await TimeSlot.findByPk(timeSlotId, { include: [Session] });

      if (!timeSlot) {
        console.log("ERROR 2");
        return res.status(404).json({ message: 'TimeSlot not found' });
      }

      const allSessionsComplete = timeSlot.Sessions.every(session => session.completed);

      console.log(allSessionsComplete);
  
      if (allSessionsComplete) {
        await TimeSlot.update({ completed: true }, { where: { time_slot_id: timeSlotId } });

        return res.status(200).json({ complete: true, message: 'TimeSlot marked as complete.' });
      } else {
        return res.status(200).json({ complete: false, message: 'TimeSlot not complete yet.' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }