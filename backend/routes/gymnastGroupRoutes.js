import express from 'express';
import { getAllGymnastGroups, findGymnastGroup, createGymnastGroup, updateGymnastGroup, deleteGymnastGroup, getGymnastGroupsByCompetition } from '../controllers/gymnastGroupController.js';

const router = express.Router();

router.get('/', getAllGymnastGroups);

router.get('/:id', findGymnastGroup);

router.get('/competition/:competition_id', getGymnastGroupsByCompetition);

router.post('/', createGymnastGroup);

router.put('/:id', updateGymnastGroup);

router.delete('/:id', deleteGymnastGroup);

export default router;