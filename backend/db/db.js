import mongoose from "mongoose";

export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect to db");
        
    } catch (error) {
        console.log('While connect with db',error);
    }
}