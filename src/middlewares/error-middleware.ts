import { NextFunction, Request, Response } from "express";
import { CustomError } from "./CustomError";

export const errorHandler = async (err: CustomError,req: Request, res: Response, next: NextFunction) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}