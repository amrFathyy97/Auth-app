import { NextFunction, Request, Response } from "express";
import { asyncFunction } from "./asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { CustomError } from "./CustomError";
import { User } from "../models/userModel";
import { IUser } from "../utils/user-validator";

export interface AuthRequest extends Request {
    user?: {
        username: string,
        email: string
    }
}

interface IPayload extends JwtPayload {
    userid: string,
    isAdmin: boolean
}

export const verifyToken = asyncFunction(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        if(req.headers["x-auth-token"] && typeof req.headers["x-auth-token"] === "string"){
            const decoded: any = await jwt.verify(req.headers["x-auth-token"], `${process.env.SECRET_KEY}`)
            const user = await User.findById(decoded.userid).select(["username", "email"])
            if(user){
                req.user = user
            }
            console.log(user);
            await next()
        }else {
            const err = new CustomError("Token required", 400, "Unauthorized");
            return next(err)
        }
        
    }
)