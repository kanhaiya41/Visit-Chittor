import { AssignedTours } from "../model/assignedTours.js";
import { CompletedTour } from "../model/completedTour.js";
import { Customer } from "../model/Customer.js";
import { Guide } from "../model/guide.js";

export const Booking = async (req, res) => {
    try {
        const { name, email, mobile, people, Booking_Date, Branch } = req.body;
        const book = await Customer({ name, email, mobile, people, Booking_Date, Branch });
        const confirm = await book.save();
        res.status(200).json({
            success: true,
            message: 'Booking Confirm',
            confirm
        })
    } catch (error) {
        console.log("While Booking", error);
    }
}

export const CompleteBooking = async (req, res) => {
    try {
        const { customerName, customerEmail, people, Booking_Date, completionData, Branch, code } = req.body;
        const existGuide = await Guide.findOne({ code });
        if (!existGuide) {
            return res.status(500).json({
                success: false,
                message: 'Wrong Employee Code',
            });
        }
        else {
            const completed = await CompletedTour({ customerName, customerEmail, people, Booking_Date, completionData, Branch, guide: existGuide.Username });
            const deleteAssign = await AssignedTours.deleteOne({ email: customerEmail });
            const tour = await completed.save();
            return res.status(200).json({
                success: true,
                message: 'Tour Completed Successfully',
                tour
            });
        }
    } catch (error) {
        console.log("while Complete Booking", error);
    }
}