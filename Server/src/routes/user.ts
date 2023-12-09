import express from 'express';
import { getAllUsers, register, updateUser } from '../controllers/userController';
import { userMiddleware } from '../middlewares/user-middleware';
import { verifyToken } from '../middlewares/verifyToken';
import { authorizeMiddleware } from '../middlewares/authorization-md';



const router = express.Router();

router.get("/", authorizeMiddleware ,getAllUsers)

router.post("/", userMiddleware,register)

router.put("/:id", verifyToken ,updateUser)

export default router

