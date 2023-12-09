import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"
import { CustomError } from "./CustomError";
import { asyncFunction } from "./asyncHandler";

export const authorizeMiddleware = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const token: any = req.headers["x-auth-token"]
        if(!token){
            const err = new CustomError("No token provided", 403, "Forbidden")
            return next(err);
        }
        const decoded: any = jwt.verify(token, `${process.env.SECRET_KEY}`);
        if(decoded.admin){
            next();
        }else {
            const err = new CustomError("Access denied", 401, "Unauthorized");
            return next(err)
        }
    }
)