import { NextFunction, Request, Response } from "express";
import validate from "../utils/user-validator";
import { CustomError } from "./CustomError";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        const valid = validate(req.body);
        if(!valid){
            if(validate.errors && validate.errors[0].message){
                const err = new CustomError(validate.errors[0].message, 400, "Bad Request");
                return next(err);
            }
        }
        next()
    }