const Product = require('./../models/product');
const mongoose = require('mongoose');

require('dotenv/config')

exports.index = async (req, res, next) => {

    try {
        
        const products = await Product.find().populate('category', '-icon');
        res.json({ 
            products,
            success: true
         });

    } catch (error) {
        res.status(500).json({ success: false });
    }

}

exports.store = (req, res) => {

    let { title, content, price, category, description, rating, isFeatured, countStock, brand } = req.body
    let {filename} = req.file

    let thumbnail = ""

    if(filename) {
        const domaine = process.env.DOMAINE_NAME
        const port = process.env.PORT
        thumbnail = `${domaine}/images/${filename}`
    }

    const myProduct = new Product({
        title,
        description,
        content,
        brand,
        rating,
        isFeatured,
        countStock,
        thumbnail,
        images,
        price,
        category
    })

    myProduct.save()
             .then(insertedProduct => {
                res.status(201).json({
                    product: insertedProduct,
                    success: true
                })
             })
             .catch(err => {
                res.status(500).json({
                    error: err,
                    success: false
                })
             })

}

exports.show = async (req, res, next) => {
    let { id } = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "id is not valid ! "
        })
    }
    
    try {
        
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found !"
            })
        }
        res.json({ 
            product,
            success: true
         });

    } catch (error) {
        res.status(500).json({ success: false });
    }
}

exports.update = async (req, res, next) => {
    let { id } = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "id is not valid ! "
        })
    }

    try {
        
        const product = await Product.findOneAndReplace({'_id': id}, req.body);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found !"
            })
        }

        res.json({ 
            product,
            success: true
         });

    } catch (error) {
        res.status(500).json({ success: false });
    }
}


exports.patch = async (req, res, next) => {
    let { id } = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "id is not valid ! "
        })
    }

    try {
        
        const product = await Product.findOneAndUpdate({'_id': id}, req.body);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found !"
            })
        }
        
        res.json({ 
            product,
            success: true
         });

    } catch (error) {
        res.status(500).json({ success: false });
    }
}


exports.search = async (req, res) => {
    
    let {search, fields} = req.query
    

    if(search) {

        try {
            
            let result = await Product.find({$or: 
                [
                    {title: { $regex: search, '$options': 'i' }}, 
                    {description: { $regex: search, '$options': 'i' }}, 
                    {content: { $regex: search, '$options': 'i' }}
                ]
            })
            .select(fields)
            .sort({'created_at': 1})

            if(!result.length) {
                return res.status(404).json({
                    success: false,
                    message: "Product(s) not found !"
                })
            }

            res.json({
                products: result,
                success: true
            })

        } catch (error) {

            res.status(500).json({
                message: "Server is down !",
                success: false
            })

        }


    }

}


exports.uploadImages = async (req, res) => {

    let id = req.params.id
    
    const domaine = process.env.DOMAINE_NAME

    const images = req.files.map(file => `${domaine}/images/${file.filename}`)

    try {

        const updatedProduct = await Product.findByIdAndUpdate(id, {images: images}, {new: true})

        if(!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found !"
            })
        }

        res.json({
            success: true,
            product: updatedProduct
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }


}