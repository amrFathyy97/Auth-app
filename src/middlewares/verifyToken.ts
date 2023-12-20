import { AuthRequest, IUserSchema } from './../types.d';
import { NextFunction, Response } from "express";
import { asyncFunction } from "./asyncHandler";
import jwt from "jsonwebtoken"
import { CustomError } from "./CustomError";
import { User } from "../models/userModel";


export const cookieHandler= asyncFunction(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        const token = await req.cookies.token;
        if(token){
            const decoded = await jwt.verify(token, `${process.env.SECRET_KEY}`);
            return res.redirect("/")
        }else {
            return next()
        }
    })

export const verifyToken = asyncFunction(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        const token: string = await req.headers["Authorization"] || req.cookies.token
        if(token){
            const decoded: any = await jwt.verify(token, `${process.env.SECRET_KEY}`)
            const user: IUserSchema = await User.findById(decoded.userid).select(["_id","username", "email", "isAdmin"]);
            req.user = user
            return await next()
        }else {
            return res.redirect("/login")
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