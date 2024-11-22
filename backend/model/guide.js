import mongoose from 'mongoose'

const guideSchema = new mongoose.Schema({
    Username: String,
    email: String,
    mobile: String,
    code: String,
    branch: String,
    address: String,
    profile_pic: String
});

export const Guide = new mongoose.model('guide', guideSchema);