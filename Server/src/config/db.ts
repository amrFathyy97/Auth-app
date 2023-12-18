import mongoose, { ObjectId, Schema, Types } from "mongoose";

export const mongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/TestDB");
        console.log("Server up and running")
    }catch(err) {
        console.log(err)
    }
};

