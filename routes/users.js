const express = require('express');

const router = express.Router();

const { loginUser, logoutUser, updateUser, getItemsByUser } = require('../controllers/users');
const { checkUserIsAuthenticated } = require('../middlewares/auth');
const { validateSchema } = require("../middlewares/validation");
const { loginSchema, updateUserSchema } = require('../validators/users');

router.route('/login').post([validateSchema(loginSchema)], loginUser);
router.route('/:id/logout').delete([checkUserIsAuthenticated], logoutUser);
router.route('/:id').patch([checkUserIsAuthenticated, validateSchema(updateUserSchema)], updateUser);
router.route('/:userId/items').get([checkUserIsAuthenticated],getItemsByUser);

module.exports = router;