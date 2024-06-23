import express from 'express';
import { getAllEvents, findEvent, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);

router.get('/:id', findEvent);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export default router;