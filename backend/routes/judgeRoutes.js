import express from 'express';
import { getAllJudges, findJudge, createJudge, updateJudge, deleteJudge } from '../controllers/judgeController.js';

const router = express.Router();

router.get('/', getAllJudges);

router.get('/:id', findJudge);

router.post('/', createJudge);

router.put('/:id', updateJudge);

router.delete('/:id', deleteJudge);

export default router;