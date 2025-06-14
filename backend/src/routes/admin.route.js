// routes/admin.routes.js
import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

export default router;
