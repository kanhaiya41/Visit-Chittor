import { AssignedTours } from "../model/assignedTours.js";
import { CompletedTour } from "../model/completedTour.js";
import { Customer } from "../model/Customer.js";
import { Guide } from "../model/guide.js";
import { Manager } from "../model/manager.js";
import jwt from 'jsonwebtoken';

export const appointGuide = async (req, res) => {
    try {
        const { Username, email, mobile, code, mCode, branch, address } = req.body;
        const profile_pic = `https://visit-chittor.onrender.com/file/${req.file.originalname}`;

        const user = await Guide.findOne({ email });
        const existcode = await Guide.findOne({ code });
        const existManager = await Manager.findOne({ code: mCode });

        if (user || existcode) {
            return res.status(500).json({
                success: false,
                message: 'Cradientials already exist'
            })
        }

        else if (!existManager) {
            return res.status(500).json({
                success: false,
                message: 'manager Cradiential is wrong'
            });
        }

        else {

            const manager = await Guide({ Username, email, mobile, code, branch, address, profile_pic });
            const data = await manager.save();
            return res.status(200).json({
                success: true,
                message: `Guide appointed for Branch ${branch}`,
                data
            })
        }
    } catch (error) {
        console.log("while appointing Guide", error);
    }
}

export const getAllGuide = async (req, res) => {
    try {
        const branch = req.params.branch;
        console.log(branch);
        const allManager = await Guide.find({ branch });
        return res.status(200).json({
            success: true,
            allManager
        });
    } catch (error) {
        console.log("while geting Guide list", error);
    }
}

export const getAllAssignedTours = async (req, res) => {
    try {
        const Branch = req.params.branch;
        const allManager = await AssignedTours.find({ Branch });
        
        return res.status(200).json({
            success: true,
            allManager
        });
    } catch (error) {
        console.log("while geting Assigned Tours list", error);
    }
}

export const getAllCompleted = async (req, res) => {
    try {
        const branch = req.params.branch;
        const allManager = await Guide.find({ branch });
        return res.status(200).json({
            success: true,
            allManager
        });
    } catch (error) {
        console.log("while geting Guide list", error);
    }
}

export const getSingleGuideAssignedTour = async (req, res) => {
    const guide = req.params.guide;
    const assigned = await AssignedTours.find({ guide });
    return res.status(200).json({
        success: true,
        assigned
    });
}

export const getSingleGuideCompletedTour = async (req, res) => {
    const guide = req.params.guide;
    const completed = await CompletedTour.find({ guide });
    return res.status(200).json({
        success: true,
        completed
    });
}

export const deleteGuide = async (req, res) => {
    try {
        const id = req.params.id;
        const manager = await Guide.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Guide deleted from list'
        })
    } catch (error) {
        console.log("while deleting Guide", error);
    }
}

export const guideSignin = async (req, res) => {
    try {
        const { email, code, branch } = req.body;
        const exist = await Guide.findOne({ email });
        if (!exist) {
            return res.status(400).json({
                success: false,
                message: `We do not have any branch at ${branch}`
            });
        }
        else if (exist.email !== email || exist.code !== code) {
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
                message: `Welcome Back`,
                exist

            });
        }
    } catch (error) {
        console.log("while guide sign in", error);
    }
}

export const assignWordToEmployee = async (req, res) => {
    try {
        const { ids, guide } = req.body;
        const data = await Customer.find({ _id: { $in: ids } });
        const work = data.map((curElem) => {
            return {
                name: curElem.name,
                email: curElem.email,
                mobile: curElem.mobile,
                people: curElem.people,
                Booking_Date: curElem.Booking_Date,
                Branch: curElem.Branch,
                guide: guide
            }
        });
        const assign = await AssignedTours.insertMany(work);
        await Customer.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({
            success: true,
            message: 'work Assigned successfully',
            assign
        })
    } catch (error) {
        console.log("while assigning work", error);
    }
}