import express from 'express';
import { getAllAdmins, findAdmin, createAdmin, updateAdmin, deleteAdmin, checkAdminExists } from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAllAdmins);

router.get('/:id', findAdmin);

router.post('/', createAdmin);

router.put('/:id', updateAdmin);

router.delete('/:id', deleteAdmin);

router.get('/exists/:username', checkAdminExists);

export default router;