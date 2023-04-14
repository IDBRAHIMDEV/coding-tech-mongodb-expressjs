var express = require('express');
var router = express.Router();

// Import the functions from UserController
const { index } = require('./../controllers/userController')

/* GET users listing. */
router.get('/', index);

module.exports = router;
