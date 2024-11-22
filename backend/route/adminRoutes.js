import express from 'express';
import { adminSignin, AppointManager, deleteManager, getAllManager, getSingleBranchBooking, getSingleBranchCompleteTour, managerSignin } from '../controller/managerController.js';
import { upload, uploadToGridFs } from '../middlewares/upload.js';

const app = express();

app.post('/appointManager', upload.single('profile_pic'), uploadToGridFs, AppointManager);
app.get('/allmanager', getAllManager);
app.get('/singlebranchbooking/:Branch', getSingleBranchBooking);
app.get('/singlebranchcompletedtour/:Branch', getSingleBranchCompleteTour);
app.delete('/deletemanager/:id', deleteManager);
app.post('/login', adminSignin);
app.post('/managerlogin',managerSignin);

export default app;