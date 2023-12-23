import { Request } from "express";

export interface Login {
    email: string;
    password: string;
}

export interface IUser extends Login {
    username: string;
    isAdmin?: boolean;
}

export interface IUserSchema extends IUser{
    _id: ObjectId
    genAuthToken: ()=> string
    active: boolean
}


export interface AuthRequest extends Request {
    user?: IUserSchema
}

