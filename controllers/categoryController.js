const Category = require('./../models/Category');
const mongoose = require('mongoose');

exports.index = async (req, res, next) => {

    try {
        
        const categories = await Category.find()
        res.json({ 
            categories,
            success: true
         });

    } catch (error) {
        res.status(500).json({ success: false });
    }

}

exports.store = (req, res) => {

    let { label, icon, color } = req.body

    const myCategory = new Category(req.body)

    myCategory.save()
             .then(insertedCategory => {
                res.status(201).json({
                    category: insertedCategory,
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
        
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found !"
            })
        }
        res.json({ 
            category,
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
        
        const category = await Category.findOneAndReplace({'_id': id}, req.body);

        if(!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found !"
            })
        }

        res.json({ 
            category,
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
        
        const category = await Category.findOneAndUpdate({'_id': id}, req.body);

        if(!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found !"
            })
        }
        
        res.json({ 
            category,
            success: true
         });

    } catch (error) {
        res.status(500).json({ success: false });
    }
}