import express from 'express';
import { Booking, CompleteBooking } from '../controller/bookingController.js';

const app=express();

app.post('/booking',Booking);
app.post('/complete',CompleteBooking);

export default app;