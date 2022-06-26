const express = require('express');

const router = express.Router();

const { checkUserIsAuthenticated } = require('../middlewares/auth');
const { validateSchema } = require("../middlewares/validation");
const { itemSchema } = require('../validators/items');
const { createNewItem } = require('../controllers/items');

router.route('/').post([checkUserIsAuthenticated, validateSchema(itemSchema)], createNewItem);

module.exports = router;