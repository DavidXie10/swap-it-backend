const express = require('express');
const { exchangeSchema } = require('../validators/exchanges');
const { exchangeItems } = require('../controllers/exchanges');
const { validateSchema } = require("../middlewares/validation");
const { checkUserIsAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/').post([checkUserIsAuthenticated, validateSchema(exchangeSchema)], exchangeItems);

module.exports = router;