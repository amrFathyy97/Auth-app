import { NextFunction, Request, Response } from "express";

export const asyncFunction = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return fn(req,res,next)
        }catch(err){
            return next(err)
        }
    }
}