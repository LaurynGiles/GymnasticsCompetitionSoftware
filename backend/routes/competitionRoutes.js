import express from 'express';
import { getAllCompetitions, findCompetition, createCompetition, updateCompetition, deleteCompetition } from '../controllers/competitionController.js';

const router = express.Router();

router.get('/', getAllCompetitions);

router.get('/:id', findCompetition);

router.post('/', createCompetition);

router.put('/:id', updateCompetition);

router.delete('/:id', deleteCompetition);

export default router;