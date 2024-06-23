import express from 'express';
import { getAllGymnastGroups, findGymnastGroup, createGymnastGroup, updateGymnastGroup, deleteGymnastGroup } from '../controllers/gymnastGroupController.js';

const router = express.Router();

router.get('/', getAllGymnastGroups);

router.get('/:id', findGymnastGroup);

router.post('/', createGymnastGroup);

router.put('/:id', updateGymnastGroup);

router.delete('/:id', deleteGymnastGroup);

export default router;