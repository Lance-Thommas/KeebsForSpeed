import express from 'express';
import { register, login, saveStats, getStats } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/stats', authMiddleware, saveStats);
router.get('/stats', authMiddleware, getStats);

export default router;
