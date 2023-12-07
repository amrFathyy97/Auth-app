import express from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import { login } from '../controllers/authController';

const router = express.Router();



router.post("/", login, authMiddleware)


export default router
