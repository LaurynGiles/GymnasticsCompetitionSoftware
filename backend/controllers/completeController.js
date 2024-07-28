import db from '../models/index.js';

const { Event, Session, TimeSlot, GymnastGroup, Gymnast, Execution } = db;

export async function checkEventCompletion(req, res, next) {
  try {
    console.log("CHECKING event");
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId, { include: [{ model: GymnastGroup, as: 'GymnastGroup', include: [Gymnast], }, Execution, ], });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const allGymnasts = event.GymnastGroup.Gymnasts;
    const completedGymnasts = event.Executions.filter(execution => 
      allGymnasts.some(gymnast => gymnast.gymnast_id === execution.gymnast_id)
    );

    if (completedGymnasts.length === allGymnasts.length) {
      await Event.update({ completed: true }, { where: { event_id: eventId } });
      req.params.sessionId = event.GymnastGroup.session_id;
      await checkSessionCompletion(req, res, next);
      return res.status(200).json({ message: 'Event marked as complete.' });
    } else {
      return res.status(200).json({ message: 'Event not complete yet.' });
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

      if (allEventsComplete) {
        await Session.update({ completed: true }, { where: { session_id: sessionId } });
        req.params.timeSlotId = session.time_slot_id;
        await checkTimeSlotCompletion(req, res, next);
        return res.status(200).json({ message: 'Session marked as complete.' });
      } else {
        return res.status(200).json({ message: 'Session not complete yet.' });
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
  
      if (allSessionsComplete) {
        await TimeSlot.update({ completed: true }, { where: { time_slot_id: timeSlotId } });
        return res.status(200).json({ message: 'TimeSlot marked as complete.' });
      } else {
        return res.status(200).json({ message: 'TimeSlot not complete yet.' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }