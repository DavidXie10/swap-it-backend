const express = require('express');

const router = express.Router();

const { loginUser, logoutUser, updateUser, deleteProfilePhoto } = require('../controllers/users');
const { checkUserIsAuthenticated } = require('../middlewares/auth');
const { validateSchema } = require("../middlewares/validation");
const { loginSchema, updateUserSchema, urlSchema } = require('../validators/users');

router.route('/login').post([validateSchema(loginSchema)], loginUser);
router.route('/:id/logout').delete([checkUserIsAuthenticated], logoutUser);
router.route('/:id').patch([checkUserIsAuthenticated, validateSchema(updateUserSchema)], updateUser);

module.exports = router;