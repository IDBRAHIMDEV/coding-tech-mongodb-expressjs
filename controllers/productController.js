const Product = require('./../models/product');
const mongoose = require('mongoose');

exports.index = async (req, res, next) => {

    try {
        
        const products = await Product.find().populate('category', '-label');
        res.json({ 
            products,
            success: true
         });

    } catch (error) {
        res.status(500).json({ success: false });
    }

}

exports.store = (req, res) => {

    let { title, content, price, category } = req.body

    const myProduct = new Product({
        title: title,
        content: content,
        price: price,
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