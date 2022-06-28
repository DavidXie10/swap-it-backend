const express = require('express');
const { uploadFiles, deleteUrls } = require('../controllers/uploads');
const { upload, uploadsErrorHandler } = require('../middlewares/upload');
const { checkUserIsAuthenticated } = require("../middlewares/auth");
const { deleteSingleUrlSchema, deleteMultipleUrlSchema } = require('../validators/uploads.js');
const { validateSchema } = require("../middlewares/validation");

const router = express.Router();
router.route('/').post([checkUserIsAuthenticated, upload.array('file', 3), uploadsErrorHandler], uploadFiles);
router.route('/single').delete([checkUserIsAuthenticated, validateSchema(deleteSingleUrlSchema)], deleteUrls);
router.route('/multiple').delete([checkUserIsAuthenticated, validateSchema(deleteMultipleUrlSchema)], deleteUrls);

module.exports = router;