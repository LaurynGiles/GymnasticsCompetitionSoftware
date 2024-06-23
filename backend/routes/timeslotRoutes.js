import express from 'express';
import { getAllTimeSlots, findTimeSlot, createTimeSlot, updateTimeSlot, deleteTimeSlot } from '../controllers/timeslotController.js';

const router = express.Router();

router.get('/', getAllTimeSlots);

router.get('/:id', findTimeSlot);

router.post('/', createTimeSlot);

router.put('/:id', updateTimeSlot);

router.delete('/:id', deleteTimeSlot);

export default router;