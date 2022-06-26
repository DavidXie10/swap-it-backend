const express = require('express');

const router = express.Router();

const { checkUserIsAuthenticated } = require('../middlewares/auth');
const { validateSchema } = require("../middlewares/validation");
const { itemSchema } = require('../validators/items');
const { createNewItem, editItem, deleteItem } = require('../controllers/items');

router.route('/').post([checkUserIsAuthenticated, validateSchema(itemSchema)], createNewItem);
router.route('/:id').patch([checkUserIsAuthenticated, validateSchema(itemSchema)], editItem);
router.route('/:id').delete([checkUserIsAuthenticated], deleteItem);

module.exports = router;