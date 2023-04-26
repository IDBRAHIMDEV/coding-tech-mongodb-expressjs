var express = require('express');
var router = express.Router();

// Import the functions from ProductController
const { index, store } = require('../controllers/orderController')

/* GET home page. */
router.get('/', index);

/* POST Product. */
router.post('/', store);


module.exports = router;
