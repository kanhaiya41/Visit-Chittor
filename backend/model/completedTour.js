import mongoose from "mongoose";

const completedSchema = new mongoose.Schema({
    customerName: String,
    customerEmail: String,
    people: String,
    Booking_Date: String,
    completionData: String,
    Branch: String,
    guide: String
});

export const CompletedTour = new mongoose.model('completedTour', completedSchema);