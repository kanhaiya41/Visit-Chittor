import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    people: String,
    Booking_Date: String,
    Branch: String
});

export const Customer = new mongoose.model('custormerBooking', customerSchema);