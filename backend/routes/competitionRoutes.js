import express from 'express';
import { getAllCompetitions, findCompetition, createCompetition, updateCompetition, deleteCompetition, getCompetitionsByAdmin } from '../controllers/competitionController.js';

const router = express.Router();

router.get('/', getAllCompetitions);

router.get('/:id', findCompetition);

router.get('/admin/:admin_id', getCompetitionsByAdmin);

router.post('/', createCompetition);

router.put('/:id', updateCompetition);

router.delete('/:id', deleteCompetition);

export default router;