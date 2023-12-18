import jwt  from 'jsonwebtoken';
import { AuthRequest } from './../types.d';
import {Request, Response ,NextFunction } from "express"

import bcrypt from "bcrypt"

import { User } from "../models/userModel"
import { asyncFunction } from "../middlewares/asyncHandler"
import { CustomError } from "../middlewares/CustomError"



export const getAllUsers = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const search_key = await Object.keys(req.query)[0] || "username"
        const page = await Number(req.query.page) || 1
        const users = await User.find({[search_key]: {$regex: req.query[search_key] || ""}}).limit(2).skip((page - 1) * 2)
        return res.json({
            message: "OK",
            data: users
        })
    }
)

export const getUserById = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findById(req.params.id);
        if(!user){
            const err = new CustomError("User not found", 404, "Not Found");
            return next(err);
        }
        return res.json({
            message: "OK",
            data: user
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
        const createdUser = await User.findOne({email: req.body.email}).select('-password')
        const token = await user.genAuthToken()
        res.header("x-auth-token", token)
        return res.status(201).json({
            message: "OK",
            data: createdUser
        })
    
}
)



export const updateUser = asyncFunction(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        if(req.user?.isAdmin){
            const user = await User.updateOne({_id: req.params.id}, {$set: {isAdmin: req.body.isAdmin}});
        }
        if(req.body.isAdmin !== undefined && !req.user?.isAdmin){
            const err = new CustomError("You do not have permission to update this field.", 401, "Unauthorized");
            return next(err);
        }
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

export const deleteUser = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const targetUser = await User.findById(req.params.id);
        if(!targetUser){
            const err = new CustomError("User not found", 404, "Not Found");
            return next(err)
        }
        await User.findByIdAndDelete(req.params.id);
        return res.json({
            message: "OK",
            data: null
        })
    }
)