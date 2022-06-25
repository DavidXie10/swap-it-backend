const express = require('express');
const { uploadFiles, deleteUrls } = require('../controllers/uploads');
const { upload } = require('../middlewares/upload');
const { checkUserIsAuthenticated } = require("../middlewares/auth");
const { deleteSingleUrlSchema, deleteMultipleUrlSchema } = require('../validators/uploads.js');
const { validateSchema } = require("../middlewares/validation");

const fileSizeLimitErrorHandler = (err, req, res, next) => {
    if (err) {
        res.status(400).json({ error: true, message: 'Se necesita subir al menos un archivo y un máximo de 5.'})
    } else {
        next();
    }
}

const router = express.Router();
router.route('/').post([checkUserIsAuthenticated, upload.array('file', 5), fileSizeLimitErrorHandler], uploadFiles);
router.route('/single').delete([checkUserIsAuthenticated, validateSchema(deleteSingleUrlSchema)], deleteUrls);
router.route('/multiple').delete([checkUserIsAuthenticated, validateSchema(deleteMultipleUrlSchema)], deleteUrls);

module.exports = router;