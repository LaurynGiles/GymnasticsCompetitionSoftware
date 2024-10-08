import express from 'express';
import { getAllApparatus, findApparatus, createApparatus, updateApparatus, deleteApparatus, getApparatusByCompetition } from '../controllers/apparatusController.js';

const router = express.Router();

router.get('/', getAllApparatus);

router.get('/:id', findApparatus);

router.get('/competition/:competitionId', getApparatusByCompetition);

router.post('/', createApparatus);

router.put('/:id', updateApparatus);

router.delete('/:id', deleteApparatus);

export default router;