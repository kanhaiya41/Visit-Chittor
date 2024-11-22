import { Admin } from "../model/admin.js";
import { CompletedTour } from "../model/completedTour.js";
import { Customer } from "../model/Customer.js";
import { Manager } from "../model/manager.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const AppointManager = async (req, res) => {
    try {
        const { Username, email, mobile, code, branch, address } = req.body;
        const profile_pic = `${process.env.BACKEND_URL}/file/${req.file.originalname}`;

        const user = await Manager.findOne({ email });
        const existCode = await Manager.findOne({ code });

        if (user || existCode) {
            return res.status(500).json({
                success: false,
                message: 'Cradientials already exist'
            })
        }

        else {


            const manager = await Manager({ Username, email, mobile, code, branch, address, profile_pic });
            const data = await manager.save();
            return res.status(200).json({
                success: true,
                message: `Manager appointed for Branch ${branch}`,
                data
            })
        }
    } catch (error) {
        console.log("while appointing manager", error);
    }
}

export const getAllManager = async (req, res) => {
    try {
        const allManager = await Manager.find();
        return res.status(200).json({
            success: true,
            allManager
        });
    } catch (error) {
        console.log("while geting manager list", error);
    }
}

export const getSingleBranchBooking = async (req, res) => {
    try {
        const Branch = req.params.Branch;
        const data = await Customer.find({ Branch });
        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log("while geting this manager branch booking", error);
    }
}

export const getSingleBranchCompleteTour = async (req, res) => {
    try {
        const Branch = req.params.Branch;
        const data = await CompletedTour.find({ Branch });
        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log("while geting this manager branch complete tours", error);
    }
}

export const deleteManager = async (req, res) => {
    try {
        const id = req.params.id;
        const manager = await Manager.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Manager deleted from list'
        })
    } catch (error) {
        console.log("while deleting manager", error);
    }
}

export const adminSignin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, code } = req.body;
        const exist = await Admin.findOne({ email });
        if (!exist || exist.code !== code) {
            return res.status(401).json({
                success: false,
                message: 'Cradientials does not match'
            });
        }

        else {
            const token = await jwt.sign({
                userId: exist._id
            },
                process.env.SECRET_KEY,
                {
                    expiresIn: '1d'
                }
            );

            return res.status(200).cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                success: true,
                message: 'Welcome Master 🙂❤️',

            });
        }
    } catch (error) {
        console.log("while admin sign in", error);
    }
}

export const managerSignin = async (req, res) => {
    try {
        const { email, code, branch } = req.body;
        console.log(req.body);

        // Find the manager by branch
        const exist = await Manager.findOne({ branch });

        if (!exist) {
            return res.status(400).json({
                success: false,
                message: `We do not have any branch at ${branch}`
            });
        }

        // Validate email and code
        if (exist.email !== email || exist.code !== code) {
            return res.status(400).json({
                success: false,
                message: 'Credentials do not match'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: exist._id },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        // Send response with token
        return res
            .status(200)
            .cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 })
            .json({
                success: true,
                message: `Welcome Manager of branch ${branch} 🙂❤️`,
                exist
            });

    } catch (error) {
        console.error("Error during manager sign-in:", error);
        res.status(500).json({
            success: false,
            message: "An internal server error occurred. Please try again later."
        });
    }
};
