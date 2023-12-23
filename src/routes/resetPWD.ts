import express from 'express';

import { getResetLink, postResetLink, resetPassword, sendForgotLink } from '../controllers/authController';

const router = express.Router();

router.get("/reset", resetPassword)

router.post("/reset", sendForgotLink)

router.get("/reset/:userId/:token", getResetLink)

router.post("/reset/:userId/:token", postResetLink)


export default router