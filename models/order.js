const { Schema, model } = require('mongoose')

const schemaOrder = new Schema({
    shippingAddress: {
        type: String,
        required: true
    },
    invoiceAddress: String,
    city: String,
    country: String,
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['shipped', 'received', 'cancled', 'pending'],
        default: 'pending'
    },
    total: Number,
    user: {
        type: Schema.Types.ObjectId, 'ref': 'User',
        required: true
    },
    orderItems: [{
        type: Schema.Types.ObjectId, ref: 'OrderItem',
        required: true
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Order', schemaOrder)