var express = require('express');
const path = require('path')
const multer = require('multer')
var router = express.Router();


const storage = multer.diskStorage({

    destination: (req, file, cb) => {

    const ALLOWED_IMAGE = {
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'image/jpg': 'jpg',
    }

    error = null

    if(!ALLOWED_IMAGE[file.mimetype]) {
        error = new Error('FileError')
    } 
      
      cb(error, `${__dirname}/../public/images`)
    },
    filename: function (req, file, cb) {
      const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePreffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

// Import the functions from ProductController
const { index, show, store, update, patch, search, uploadImages } = require('./../controllers/productController')

/* GET home page. */
router.get('/', index);

/* GET home page. */
router.get('/search', search);

/* GET home page. */
router.get('/:id', show);

/* PUT a product. */
router.put('/:id', update);

/* PATCH a product. */
router.patch('/:id', patch);

/* POST Product. */
router.post('/', upload.single('thumbnail'), store);

/* POST Product. */
router.put('/:id/images', upload.array('images'), uploadImages);

module.exports = router;
