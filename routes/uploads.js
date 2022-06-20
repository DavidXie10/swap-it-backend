const express = require('express');
const { uploadFiles } = require('../controllers/uploads');
const { upload } = require('../middlewares/upload');

const router = express.Router();
router.route('/').post(upload.array('file'), uploadFiles);

module.exports = router;