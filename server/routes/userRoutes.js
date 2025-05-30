import express from 'express';
import { register, login, saveStats } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/stats', authMiddleware, saveStats); // NEW protected route

export default router;
