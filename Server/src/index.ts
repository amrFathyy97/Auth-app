import { AuthRequest } from './types.d';
import { mongoDB } from './config/db';
import express, {Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import helmet from 'helmet';
mongoDB();
dotenv.config()

import userRouter from "./routes/user"
import authRouter from "./routes/auth"
import resetPassword from "./routes/resetPWD"
import path from 'path';
import cors from "cors"
import { errorHandler } from './middlewares/error-middleware';
import { verifyToken } from './middlewares/verifyToken';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(helmet());

app.use(express.static(path.join(__dirname, "../public")));

app.set('view engine', 'ejs');

app.use("/user(s)?",userRouter)

app.use("/login",authRouter)

app.use("/password", resetPassword)

app.get("/us", verifyToken,async (req:AuthRequest, res, next) => {
    console.log(req.headers["x-auth-token"]);
    const user: any = req.user
    return res.send(`<h1>Hello ${user.username}</h1>`)

})

app.all("/*", async (req: Request, res: Response, next: NextFunction) => {
    return res.render("404.ejs")
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