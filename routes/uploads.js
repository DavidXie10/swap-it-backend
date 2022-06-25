const express = require('express');
const { uploadFiles, deleteUrls } = require('../controllers/uploads');
const { upload } = require('../middlewares/upload');
const { checkUserIsAuthenticated } = require("../middlewares/auth");
const { deleteSingleUrlSchema, deleteMultipleUrlSchema } = require('../validators/uploads.js');

const router = express.Router();
router.route('/').post(upload.array('file'), uploadFiles);
router.route('/single').delete([checkUserIsAuthenticated, validateSchema(deleteSingleUrlSchema)], deleteUrls);
router.route('/multiple').delete([checkUserIsAuthenticated, validateSchema(deleteMultipleUrlSchema)], deleteUrls);

module.exports = router;