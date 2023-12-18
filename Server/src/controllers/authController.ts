import bcrypt  from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
import { asyncFunction } from '../middlewares/asyncHandler';
import { CustomError } from '../middlewares/CustomError';
import jwt from "jsonwebtoken"


export const login = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            const err = new CustomError("Invalid username or password", 401, "Unauthorized")
            return next(err);
        }
        const password = await bcrypt.compare(req.body.password, user.password);
        if(!password){
            const err = new CustomError("Invalid username or password", 401, "Unauthorized")
            return next(err);
        }
        const token = await user.genAuthToken()
        res.header("x-auth-token", token)
        res.status(200).json({
            message: "OK",
            data: `Hello ${user.username}`
        })
}
)

export const resetPassword = asyncFunction(
    (req: Request, res: Response, next: NextFunction) => {
        res.render('forgot')
    }
)

export const sendForgotLink = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            const err = new CustomError("Email is not exist", 404, "Not Found")
            return next(err)
        }
        const secret = process.env.SECRET_KEY + user.password;
        const token = await jwt.sign({email: user.email, id: user._id}, secret, {
            expiresIn: "15m"
        });
        const link = `http://localhost:3000/password/reset/${user._id}/${token}`;
        res.json({
            message: "Click on the link",
            reset: link
        })
    }
)

export const getResetLink = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({_id: req.params.userId});
        if(!user){
            const err = new CustomError("Email is not exist", 404, "Not Found")
            return next(err)
        }
        const secret = process.env.SECRET_KEY + user.password;
        const token = await jwt.verify(req.params.token, secret);
        if(!token) {
            const err = new CustomError("Invalid token", 401, "Unauthorized");
            return next(err)
        }
        return res.render("reset-password", {email: user.email})

    }
)

export const postResetLink = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({_id: req.params.userId});
        if(!user){
            const err = new CustomError("Email is not exist", 404, "Not Found")
            return next(err)
        }
        const secret = process.env.SECRET_KEY + user.password;
        const token = await jwt.verify(req.params.token, secret);
        if(!token){
            const err = new CustomError("Invalid token", 401, "Unauthorized");
            return next(err)
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(req.params.userId, {$set: {password: hashed}});
        return res.render("success-password")
    }
)
