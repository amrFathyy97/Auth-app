import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"

export const authorizationMiddleware =async  (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.header("x-auth-token");
        if(!token) return res.status(401).send("<h1>Access denied</h1>");
        const decodedPayload = jwt.verify(token, `${process.env.SECRET_KEY}`);
        if(!decodedPayload.admin) {
            return res.status(401).send("<h1>Access denied</h1>");
        }
        next()
    }catch(err){
        return res.status(400).send("<h1>Invalid token...</h1>")
    }

}