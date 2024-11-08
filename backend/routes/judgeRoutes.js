import express from 'express';
import { getAllJudges, findJudge, createJudge, updateJudge, deleteJudge, findJudgeGsa, getJudgesByCompetition } from '../controllers/judgeController.js';

const router = express.Router();

router.get('/', getAllJudges);

router.get('/id/:id', findJudge);

router.get('/gsa/:gsa_id', findJudgeGsa);

router.get('/competition/:competitionId', getJudgesByCompetition);

router.post('/', createJudge);

router.put('/:id', updateJudge);

router.delete('/:id', deleteJudge);

export default router;