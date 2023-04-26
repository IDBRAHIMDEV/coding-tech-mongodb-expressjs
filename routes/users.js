var express = require('express');
var router = express.Router();

// Import the functions from UserController
const { index, register, login, userOrders } = require('./../controllers/userController')

/* GET users listing. */
router.get('/', index);

/* POST Register a user. */
router.post('/register', register);

/* POST login a user. */
router.post('/login', login);

/* GET all orders for a user using the id. */
router.get('/:id/orders', userOrders);

module.exports = router;
