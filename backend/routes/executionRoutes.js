import express from 'express';
import { getAllExecutions, findExecution, createExecution, updateExecution, deleteExecution } from '../controllers/executionController.js';

const router = express.Router();

router.get('/', getAllExecutions);

router.get('/:eventId/:gymnastId/:judgeId', findExecution);

router.post('/', createExecution);

router.put('/:eventId/:gymnastId/:judgeId', updateExecution);

router.delete('/:eventId/:gymnastId/:judgeId', deleteExecution);

export default router;