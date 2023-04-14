
const { Schema, model } = require('mongoose');

const schemaProduct = new Schema({
    title: String,
    content: String,
    price: Number,
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    }
})

module.exports = model('Product', schemaProduct)

