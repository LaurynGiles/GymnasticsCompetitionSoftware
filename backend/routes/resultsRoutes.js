import express from 'express';
import { getFinalResults } from '../controllers/resultsController.js';

const router = express.Router();

router.get('/:competitionId', getFinalResults);

export default router;