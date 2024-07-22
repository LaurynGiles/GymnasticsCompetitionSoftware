import express from 'express';
import { checkEventCompletion, checkSessionCompletion, checkTimeSlotCompletion } from '../controllers/completeController.js';

const router = express.Router();

router.get('/event/:eventId', checkEventCompletion);
router.get('/session/:sessionId', checkSessionCompletion);
router.get('/timeSlot/:timeSlotId', checkTimeSlotCompletion);

export default router;