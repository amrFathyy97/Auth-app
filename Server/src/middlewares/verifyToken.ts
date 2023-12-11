import { AuthRequest, IUserSchema } from './../types.d';
import { NextFunction, Response } from "express";
import { asyncFunction } from "./asyncHandler";
import jwt from "jsonwebtoken"
import { CustomError } from "./CustomError";
import { User } from "../models/userModel";

export const verifyToken = asyncFunction(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        if(req.headers["x-auth-token"] && typeof req.headers["x-auth-token"] === "string"){
            const decoded: any = await jwt.verify(req.headers["x-auth-token"], `${process.env.SECRET_KEY}`)
            const user: IUserSchema = await User.findById(decoded.userid).select(["_id","username", "email", "isAdmin"]);
            req.user = user
            return await next()
        }else {
            const err = new CustomError("Token required", 400, "Unauthorized");
            return next(err)
        }
        
    }
);


export const Authorization = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user?.isAdmin){
        return await next()
    }else {
        userAuthorization(req,res,next)
    }

}

export const userAuthorization = asyncFunction(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        if(req.user?._id.toString() === req.params.id){
            return await next()
        }
        const err = new CustomError("You are not allowed", 403, "Unauthorized");
        return next(err)
    }
)