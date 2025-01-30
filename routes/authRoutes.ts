import express from 'express';
import { registerUser } from '../controllers/registerController';
import { loginUser } from '../controllers/loginController';

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export default router;
