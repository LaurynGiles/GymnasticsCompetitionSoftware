import express from 'express';
import { getAllEvents, findEvent, createEvent, updateEvent, deleteEvent, getEventsBySessionIds, checkEventExists } from '../controllers/eventController.js';

const router = express.Router();

router.post('/bySessions', getEventsBySessionIds);

router.get('/checkExists', checkEventExists);

router.get('/', getAllEvents);

router.get('/:id', findEvent);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export default router;