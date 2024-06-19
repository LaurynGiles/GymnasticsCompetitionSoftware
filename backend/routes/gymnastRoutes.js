import express from 'express';
import { getAllGymnasts, findGymnast, createGymnast, updateGymnast, deleteGymnast } from '../controllers/gymnastController.js';

const router = express.Router();

router.get('/', getAllGymnasts);

router.get('/:id', findGymnast);

router.post('/', createGymnast);

router.put('/:id', updateGymnast);

router.delete('/:id', deleteGymnast);

export default router;