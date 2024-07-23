import express from 'express';
import { getAllSessions, findSession, createSession, updateSession, deleteSession, getSessionsByTimeSlot } from '../controllers/sessionController.js';

const router = express.Router();

router.get('/byTimeSlot/:timeSlotId', getSessionsByTimeSlot);

router.get('/', getAllSessions);

router.get('/:id', findSession);

router.post('/', createSession);

router.put('/:id', updateSession);

router.delete('/:id', deleteSession);

export default router;