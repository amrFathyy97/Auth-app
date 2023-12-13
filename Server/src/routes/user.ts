import express from 'express';
import { deleteUser, getAllUsers, getUserById, register, updateUser } from '../controllers/userController';
import { userMiddleware } from '../middlewares/user-middleware';
import { Authorization, verifyToken } from '../middlewares/verifyToken';



const router = express.Router();

router.get("/",verifyToken ,Authorization ,getAllUsers)

router.get("/:id",verifyToken, Authorization, getUserById )

router.post("/", userMiddleware,register)

router.put("/:id", userMiddleware,verifyToken, Authorization, updateUser)

router.delete("/:id", verifyToken, Authorization, deleteUser)

export default router

