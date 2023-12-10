import bcrypt  from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
import { asyncFunction } from '../middlewares/asyncHandler';
import { CustomError } from '../middlewares/CustomError';


export const login = asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            const err = await new CustomError("Invalid username or password", 401, "Unauthorized")
            return next(err);
        }
        const password = await bcrypt.compare(req.body.password, user.password);
        if(!password){
            const err = await new CustomError("Invalid username or password", 401, "Unauthorized")
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