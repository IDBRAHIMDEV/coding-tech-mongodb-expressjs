var express = require('express');
var router = express.Router();

// Import the functions from ProductController
const { index, show, store, update, patch } = require('./../controllers/categoryController')

/* GET home page. */
router.get('/', index);

/* GET home page. */
router.get('/:id', show);

/* PUT a product. */
router.put('/:id', update);

/* PATCH a product. */
router.patch('/:id', patch);

/* POST Product. */
router.post('/', store);

module.exports = router;
