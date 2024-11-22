import multer, { memoryStorage } from "multer";
import grid from 'gridfs-stream';
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfs, gridFsBucket;

mongoose.connection.once('open', () => {
    gridFsBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'profilePicture',
    });
    gfs = new grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('profilePicture');
});

export const upload = multer({
    storage: memoryStorage(),
});

export const uploadToGridFs = async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            next();
        }
        else {
            const filename = `${Date.now()}-file-${file.originalname}`;
            file.originalname = filename;

            const writeStream = gridFsBucket.openUploadStream(file.originalname, {
                contentType: file.mimetype
            });

            writeStream.end(file.buffer);

            writeStream.on('finish', () => {
                req.file.id = writeStream.id;
                next();
            });

            writeStream.on('error', () => {
                return res.status(500).json({
                    error: error.message
                });
            })
        }
    } catch (error) {
        console.log("while upload to grid-fs", error);
    }
}

export const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readstream = gridFsBucket.openDownloadStream(file._id);
        readstream.pipe(res);
    } catch (error) {
        console.log("error while getting image", error)
    }
}