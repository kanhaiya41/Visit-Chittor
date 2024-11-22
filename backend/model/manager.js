import mongoose from "mongoose";

const mangerSchema=new mongoose.Schema({
    Username: String,
    email: String,
    mobile: String,
    code: String,
    branch: String,
    address: String,
    profile_pic: String
});

export const Manager=new mongoose.model('manager',mangerSchema);