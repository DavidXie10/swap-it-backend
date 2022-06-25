const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

aws.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY_SECRET,
    region: "us-east-1",
});

const s3 = new aws.S3();

exports.upload = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'ci0137',
        key: function (req, file, cb){
            cb(null, `swap-it/uploads/${req.filename ? req.filename : uuidv4() + file.originalname.substring(file.originalname.lastIndexOf("."))}`);
        }
    }),
    fileFilter: function (req, file, callback) {
        const extension = file.originalname.substring(file.originalname.lastIndexOf("."));
        if(extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
            callback(new Error(''));
            return;
        }
        callback(null, true);
    },
});

exports.uploadsErrorHandler = (error, req, res, next) => {
    if (error) {
        res.status(400).json({ error: true, message: 'Solo se puede subir un máximo de 3 imágenes y solo se permiten subir imágenes .png, .jpg o .jpeg.'})
    } else {
        next();
    }
}