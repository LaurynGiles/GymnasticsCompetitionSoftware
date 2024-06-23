import express from 'express';
import { getAllDifficulties, findDifficulty, createDifficulty, updateDifficulty, deleteDifficulty } from '../controllers/difficultyController.js';

const router = express.Router();

router.get('/', getAllDifficulties);

router.get('/:eventId/:gymnastId/:judgeId', findDifficulty);

router.post('/', createDifficulty);

router.put('/:eventId/:gymnastId/:judgeId', updateDifficulty);

router.delete('/:eventId/:gymnastId/:judgeId', deleteDifficulty);

export default router;