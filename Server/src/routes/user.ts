import express from 'express';
import { register } from '../controllers/userController';
import { userMiddleware } from '../middlewares/user-middleware';



const router = express.Router();

router.post("/", userMiddleware,register)


export default router

