import { AuthRequest } from './types.d';
import { mongoDB } from './config/db';
import express, {Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import helmet from 'helmet';
import cookieParser from "cookie-parser"
mongoDB();
dotenv.config()

import userRouter from "./routes/user"
import authRouter from "./routes/auth"
import resetPassword from "./routes/resetPWD"
import path from 'path';
import cors from "cors"
import { errorHandler } from './middlewares/error-middleware';
import {  verifyToken } from './middlewares/verifyToken';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(helmet());

app.use(express.static(path.join(__dirname, "../public")));

app.set('view engine', 'ejs');

app.use("/register",userRouter)

app.use("/login",authRouter)

app.use("/password", resetPassword)

app.get("/",verifyToken,(req: AuthRequest, res: Response, next: NextFunction) => {
    if(!req.user){
        return res.redirect("/login");
    }
    res.header("user", req.user.username)
    return res.render("welcome", {user: req.user})
})

app.get("/logout",(req: AuthRequest, res: Response, next: NextFunction) => {
    res.clearCookie("token");
    return res.redirect("/")
})



app.all("/*", async (req: Request, res: Response, next: NextFunction) => {
    res.render("404.ejs")
})

app.use(errorHandler)

const main = async () => {
    try {
        await app.listen(PORT);
        console.log('Connected to port', PORT)
    }catch(err){
        console.log("Failed to connect", err)
    }
};
main();