import { Schema, model } from "mongoose";
import { IUser } from "../utils/user-validator";
import jwt from "jsonwebtoken"

interface IUserSchema extends IUser{
    genAuthToken: ()=> string
}



const schema = new Schema<IUserSchema>({
    username: {
        type: "string",
        required: true,
        lowercase: true
    },
    email: {
        type: "string",
        required: true,
        unique: true,
        match: [/^[a-zA-Z]+@\w{3,7}.\w{2,6}/,"Email pattern does not match"],
        lowercase: true
    },
    password: {
        type: "string",
        required: true,
        minlength: 5,
    },
    isAdmin: {
        type: "boolean",
        default: false,
        
    }
});

schema.methods.genAuthToken = async function(): Promise<string>{
    const token = await jwt.sign({userid: this._id, admin: this.isAdmin}, `${process.env.SECRET_KEY}`);
    return token
}


export const User = model("User", schema)