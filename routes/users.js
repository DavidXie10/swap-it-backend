const express = require('express');

const router = express.Router();

const { loginUser, logoutUser } = require('../controllers/users');
const { checkUserIsAuthenticated } = require('../middlewares/auth');
const { validateSchema } = require("../middlewares/validation");
const { loginSchema } = require('../validators/users');

router.route('/login').post([validateSchema(loginSchema)], loginUser);
router.route('/:id/logout').delete([checkUserIsAuthenticated], logoutUser);

module.exports = router;

/*
console.log(typeof(users))

users.forEach(user => {
    console.log(user.username);
    console.log(typeof(user));
})

*/