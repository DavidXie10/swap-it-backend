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
    })
});