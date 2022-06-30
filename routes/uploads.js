const express = require('express');
const { uploadFiles, deleteUrls } = require('../controllers/uploads');
const { upload, uploadsErrorHandler } = require('../middlewares/upload');
const { checkUserIsAuthenticated } = require("../middlewares/auth");
const { deleteUrlsSchema } = require('../validators/uploads.js');
const { validateSchema } = require("../middlewares/validation");

const router = express.Router();
router.route('/').post([checkUserIsAuthenticated, upload.array('file', 3), uploadsErrorHandler], uploadFiles);
router.route('/').delete([checkUserIsAuthenticated, validateSchema(deleteUrlsSchema)], deleteUrls);

module.exports = router;