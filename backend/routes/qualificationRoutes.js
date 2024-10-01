import express from 'express';
import { getAllQualifications, findQualification, createQualification, updateQualification, deleteQualification } from '../controllers/qualificationController.js';

const router = express.Router();

router.get('/', getAllQualifications);
router.get('/:id', findQualification);
router.post('/', createQualification);
router.put('/:id', updateQualification);
router.delete('/:id', deleteQualification);

export default router;