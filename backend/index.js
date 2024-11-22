import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db/db.js';
import bookingApp from './route/cutomerRoute.js';
import adminApp from './route/adminRoutes.js';
import managerApp from './route/managerRoutes.js';
import { getImage } from './middlewares/upload.js';
import path from 'path';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

db();

app.use('/customer', bookingApp);
app.use('/admin', adminApp);
app.use('/manager', managerApp);
app.get('/file/:filename', getImage);

const __direname = path.resolve();
app.use(express.static(path.join(__direname, '/frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__direname, "frontend", "build", "index.html"));
});

app.listen(8000, () => {
    console.log(`server listen on port 8000`);
})
