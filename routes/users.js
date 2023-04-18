var express = require('express');
var router = express.Router();

// Import the functions from UserController
const { index, register, login } = require('./../controllers/userController')

/* GET users listing. */
router.get('/', index);

/* POST Register a user. */
router.post('/register', register);

/* POST login a user. */
router.post('/login', login);

module.exports = router;
