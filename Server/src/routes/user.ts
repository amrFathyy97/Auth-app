import express from 'express';
import { getAllUsers, register, updateUser } from '../controllers/userController';
import { userMiddleware } from '../middlewares/user-middleware';
import { Authorization, verifyToken } from '../middlewares/verifyToken';



const router = express.Router();

router.get("/",verifyToken ,Authorization ,getAllUsers)

router.post("/", userMiddleware,register)

router.put("/:id", userMiddleware,verifyToken, Authorization, updateUser)

export default router

