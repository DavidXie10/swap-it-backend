const express = require('express');

const router = express.Router();

const { loginUser } = require('../controllers/users');
const { checkUserIsAuthenticated } = require('../middlewares/auth');
const { validateSchema } = require("../middlewares/validation");
const { loginSchema } = require('../validators/users');

router.route('/login').post([validateSchema(loginSchema)], loginUser);

module.exports = router;

/*
console.log(typeof(users))

users.forEach(user => {
    console.log(user.username);
    console.log(typeof(user));
})

*/