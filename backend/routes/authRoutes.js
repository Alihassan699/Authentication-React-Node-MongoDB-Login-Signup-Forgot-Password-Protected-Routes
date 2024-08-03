import express from 'express';
import { signup, signin, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import otpLimiter from '../middleware/otpLimiter.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
