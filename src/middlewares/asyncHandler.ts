import { NextFunction, Request, Response } from "express";
import { CustomError } from "./CustomError";

export const asyncFunction = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await fn(req,res,next)
        }catch(err: any){
            const error = new CustomError(err.message, 401, "Bad Request")
            return next(error)
        }
    }
}