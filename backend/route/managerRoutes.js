import express from 'express';
import { upload, uploadToGridFs } from '../middlewares/upload.js';
import { appointGuide, assignWordToEmployee, deleteGuide, getAllAssignedTours, getAllCompleted, getAllGuide, getSingleGuideAssignedTour, getSingleGuideCompletedTour, guideSignin } from '../controller/guideController.js';

const app = express();

app.post('/appointGuide', upload.single('profile_pic'), uploadToGridFs, appointGuide);
app.get('/getAllguide/:branch', getAllGuide);
app.get('/getAllasignedTours/:branch', getAllAssignedTours);
app.get('/getAllcompletedTours/:branch', getAllCompleted);
app.get('/getSingleguideAssignedTours/:guide', getSingleGuideAssignedTour);
app.get('/getSingleguideCompletedTours/:guide', getSingleGuideCompletedTour);
app.delete('/deleteGuide/:id', deleteGuide);
app.post('/guidelogin', guideSignin);
app.post('/assignWork', assignWordToEmployee);

export default app;