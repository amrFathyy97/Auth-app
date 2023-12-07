import {Request, Response ,NextFunction } from "express"

import bcrypt from "bcrypt"

import { User } from "../models/userModel"
import { asyncFunction } from "../middlewares/asyncHandler"
import { CustomError } from "../middlewares/CustomError"

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









// export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await User.find({})
//         if(users.length < 0) {
//             return res.status(404).json({
//                 message: "User not found"
//             })
//         }
//         return res.status(200).json({
//             message: "OK",
//             data: users
//         })
//     }catch(err){
//         return res.status(500).json({
//             message: "Something went wrong"
//         })
//     }
// }