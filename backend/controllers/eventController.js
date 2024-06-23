import db from '../models/index.js';

const { Event } = db;

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
        res.status(201).json(newEvent);
    } catch (error) {
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