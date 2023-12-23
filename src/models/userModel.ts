import { ObjectId, Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import { IUserSchema } from "../types";




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
        match: [/^[a-zA-Z]+.*@\w{2,8}.\w{2,8}/,"Email pattern does not match"],
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
        
    },
    active: {
        type: "boolean",
        default: false,
    }
});

schema.methods.genAuthToken = async function(): Promise<string>{
    const token = await jwt.sign({userid: this._id, admin: this.isAdmin}, `${process.env.SECRET_KEY}`);
    return token
}


export const User = model("User", schema)