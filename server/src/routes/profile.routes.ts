import express from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/get-profile', authMiddleware, getProfile); // Get profile
router.post('/update-profile', authMiddleware, updateProfile); // Update profile


export default router;
