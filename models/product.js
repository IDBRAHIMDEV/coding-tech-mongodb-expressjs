
const { Schema, model } = require('mongoose');

const schemaProduct = new Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    description: String,
    content: String,
    brand: String,
    countStock: {
        type: Number,
        default: 0
    },
    price: Number,
    thumbnail: String,
    images: [String],
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    }
})

module.exports = model('Product', schemaProduct)

