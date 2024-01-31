import express from 'express';
import { bookRoom } from '../controllers/bookControllers.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, bookRoom);

export default router;

