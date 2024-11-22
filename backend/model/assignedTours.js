import mongoose from "mongoose";

const assignedSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    people: String,
    Booking_Date: String,
    Branch: String,
    guide: String
});

export const AssignedTours = new mongoose.model('assignedTours', assignedSchema);