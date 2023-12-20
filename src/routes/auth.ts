import express from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import { login, loginPage } from '../controllers/authController';
import { cookieHandler } from '../middlewares/verifyToken';

const router = express.Router();


router.get("/",cookieHandler,loginPage)


router.post("/", authMiddleware,login)


export default router
