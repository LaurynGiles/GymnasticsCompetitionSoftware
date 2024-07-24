import db from '../models/index.js';
import { fetchActiveTimeSlot } from './timeslotController.js';

const { Event, Apparatus } = db;

export async function getAllEvents(req, res, next) {
    try {
        const allEvents = await Event.findAll();
        console.log(allEvents);
        res.status(200).json(allEvents);
    } catch (error) {
        next(error);
    }
}

export async function findEvent(req, res, next) {
    try {
        const eventId = req.params.id;
        const event = await Event.findByPk(eventId);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function createEvent(req, res, next) {
    try {
        const newEvent = await Event.create(req.body);

        // if (newEvent) {
        //     res.status(201).json(newEvent);
        // } else {
        //     res.status(404).send('Error creating event');
        // }
        res.status(201).json(newEvent);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export async function updateEvent(req, res, next) {
    try {
        const eventId = req.params.id;
        const [updated] = await Event.update(req.body, {
            where: { event_id: eventId }
        });
        if (updated) {
            const updatedEvent = await Event.findByPk(eventId);
            console.log(updatedEvent);
            res.status(200).json(updatedEvent);
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function deleteEvent(req, res, next) {
    try {
        const eventId = req.params.id;
        const deleted = await Event.destroy({
            where: { event_id: eventId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        next(error);
    }
}

export async function getEventsBySessionIds(req, res, next) {
    try {
      console.log("IN FUNC");
      const { sessionIds } = req.body;
      console.log(req.body);

      const events = await Event.findAll({
        where: { session_id: sessionIds },
        include: [{
            model: Apparatus,
            as: 'Apparatus',
            attributes: ['apparatus_name']
        }]
      });

      console.log(events);
      if (events) {
            res.status(200).json(events);
      } else {
        console.log("EVENT NOT FOUND");
            res.status(404).send('Event not found');
      }
    } catch (error) {
        next(error);
    }
  }

  export async function checkEventExists(req, res, next) {
    const { level, age, apparatus } = req.query;

    try {
        const activeTimeSlot = await fetchActiveTimeSlot();
        console.log("HERE");
        console.log(activeTimeSlot);
    
        if (!activeTimeSlot) {
          return res.status(404).json({ exists: false });
        }
    
        const sessions = await db.Session.findAll({
          where: {
            level,
            age,
            time_slot_id: activeTimeSlot.time_slot_id
          }
        });

        console.log(sessions);
    
        const sessionIds = sessions.map(session => session.session_id);
    
        const event = await db.Event.findOne({
          where: {
            session_id: sessionIds,
            '$Apparatus.apparatus_name$': apparatus
          },
          include: [
            {
              model: db.Apparatus,
              as: 'Apparatus',
              attributes: []
            }
          ]
        });

        console.log(event);
    
        if (event) {
          return res.json({ exists: true, event_id: event.event_id });
        } else {
          return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking event existence:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
  }