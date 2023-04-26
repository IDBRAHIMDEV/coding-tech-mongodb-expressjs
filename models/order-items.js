const { Schema, model } = require('mongoose')

const schemaOrderItem = new Schema({
    product: {
        type: Schema.Types.ObjectId, 'ref': 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: Number
})

module.exports = model('OrderItem', schemaOrderItem)