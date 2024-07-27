import express from 'express';
import { getAllGymnasts, findGymnast, createGymnast, updateGymnast, deleteGymnast, getGymnastsByEvent } from '../controllers/gymnastController.js';

const router = express.Router();

router.get('/event/:event_id', getGymnastsByEvent);

router.get('/', getAllGymnasts);

router.get('/:id', findGymnast);

router.post('/', createGymnast);

router.put('/:id', updateGymnast);

router.delete('/:id', deleteGymnast);

export default router;