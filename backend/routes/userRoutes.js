import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { authUser, getUserProfiles, logoutUser, registerUser, updateUserProfiles } from '../controllers/userConrollers.js';

router.route('/auth').post(authUser);
router.route('/').post(registerUser);
router.post('/logout', logoutUser);
router
  .route('/profiles')
  .get(protect, getUserProfiles)
  .put(protect, updateUserProfiles);

export default router;