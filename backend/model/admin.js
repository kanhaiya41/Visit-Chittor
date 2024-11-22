import mongoose from "mongoose";

const mangerSchema = new mongoose.Schema({
    email: String,
    code: String
});

export const Admin = new mongoose.model('admin', mangerSchema);