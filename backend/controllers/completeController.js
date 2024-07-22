import db from '../models/index.js';

const { Event, Session, TimeSlot, GymnastGroup, Gymnast, Execution, Difficulty } = db;

export async function checkEventCompletion(req, res, next) {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId, {
      include: [{
        model: Session,
        include: [{
          model: GymnastGroup,
          include: [Gymnast]
        }]
      }, Execution, Difficulty]
    });

    const allGymnasts = event.Session.GymnastGroups.reduce((acc, group) => acc.concat(group.Gymnasts), []);
    const completedGymnasts = event.Executions.concat(event.Difficulties).filter(score => allGymnasts.some(gymnast => gymnast.gymnast_id === score.gymnast_id));

    if (completedGymnasts.length === allGymnasts.length) {
      await Event.update({ completed: true }, { where: { event_id: eventId } });
      await checkSessionCompletion(event.session_id);
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
      const { sessionId } = req.params;
      const session = await Session.findByPk(sessionId, { include: [Event] });
      const allEventsComplete = session.Events.every(event => event.completed);
  
      if (allEventsComplete) {
        await Session.update({ completed: true }, { where: { session_id: sessionId } });
        await checkTimeSlotCompletion(req, res, next);
        return res.status(200).json({ message: 'Session marked as complete.' });
      } else {
        return res.status(200).json({ message: 'Session not complete yet.' });
      }
    } catch (error) {
      next(error);
    }
  }
  
  export async function checkTimeSlotCompletion(req, res, next) {
    try {
      const { timeSlotId } = req.params;
      const timeSlot = await TimeSlot.findByPk(timeSlotId, { include: [Session] });
      const allSessionsComplete = timeSlot.Sessions.every(session => session.completed);
  
      if (allSessionsComplete) {
        await TimeSlot.update({ completed: true }, { where: { time_slot_id: timeSlotId } });
        return res.status(200).json({ message: 'TimeSlot marked as complete.' });
      } else {
        return res.status(200).json({ message: 'TimeSlot not complete yet.' });
      }
    } catch (error) {
      next(error);
    }
  }