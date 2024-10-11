import express from 'express';
import { getAllGymnasts, findGymnast, createGymnast, updateGymnast, deleteGymnast, getGymnastsByEvent, getGymnastsByGroup } from '../controllers/gymnastController.js';

const router = express.Router();

router.get('/event/:event_id/gymnasts', getGymnastsByEvent);

router.get('/', getAllGymnasts);

router.get('/:id', findGymnast);

router.get('/group/:group_id', getGymnastsByGroup);

router.post('/', createGymnast);

router.put('/:id', updateGymnast);

router.delete('/:id', deleteGymnast);

export default router;