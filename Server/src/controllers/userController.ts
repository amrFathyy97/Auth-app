import {Request, Response ,NextFunction } from "express"

import bcrypt from "bcrypt"

import { User } from "../models/userModel"
import { asyncFunction } from "../middlewares/asyncHandler"
import { CustomError } from "../middlewares/CustomError"




export const getAllUsers = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.find()
        return res.json({
            message: "OK",
            data: users
        })
    }
)


export const register = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const hashed = await bcrypt.hash(req.body.password, 10);
        const duplicated = await User.findOne({email: req.body.email});
        if(duplicated){
            const err = new CustomError("Email already in use", 400, "Bad Request");
            console.log(err);
            return next(err)
        }
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
        });
        await user.save();
        const createdUser = await User.findOne({email: req.body.email}).select({username: 1, email: 1})
        const token = await user.genAuthToken()
        res.header("x-auth-token", token)
        return res.status(201).json({
            message: "OK",
            data: createdUser
        })
    
}
)



export const updateUser = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        }, {new: true});
        return res.status(200).json({
            message: "OK",
            data: updatedUser
        })
    }
)