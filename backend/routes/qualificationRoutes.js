import express from 'express';
import { getAllQualifications, findQualification, createQualification, updateQualification, deleteQualification, getQualificationsByCompetition } from '../controllers/qualificationController.js';

const router = express.Router();

router.get('/', getAllQualifications);

router.get('/:id', findQualification);

router.get('/competition/:competitionId', getQualificationsByCompetition);

router.post('/', createQualification);

router.put('/:id', updateQualification);

router.delete('/:id', deleteQualification);

export default router;