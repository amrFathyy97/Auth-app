import { NextFunction, Request, Response } from "express";
import { asyncFunction } from "./asyncHandler";
import jwt from "jsonwebtoken"
import { CustomError } from "./CustomError";
import { User } from "../models/userModel";
import { IUserSchema } from "../types";

export interface AuthRequest extends Request {
    user?: IUserSchema
}





export const verifyToken = asyncFunction(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        if(req.headers["x-auth-token"] && typeof req.headers["x-auth-token"] === "string"){
            const decoded: any = await jwt.verify(req.headers["x-auth-token"], `${process.env.SECRET_KEY}`)
            const user: IUserSchema = await User.findById(decoded.userid).select(["_id","username", "email"]);
            req.user = user
            await next()
        }else {
            const err = new CustomError("Token required", 400, "Unauthorized");
            return next(err)
        }
        
    }
)