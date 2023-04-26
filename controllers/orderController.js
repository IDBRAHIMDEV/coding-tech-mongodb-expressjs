const Order = require('../models/order');
const Product = require('../models/product');
const OrderItem = require('./../models/order-items')

const mongoose = require('mongoose');

exports.index = async (req, res, next) => {

    try {
        
       const myOrders = await Order.find()
                                   .populate('user', 'name email')
                                   .populate({ path: 'orderItems', populate: {
                                    path: 'product', select: 'title description', populate: {
                                        path: 'category',
                                        select: 'label'
                                    }
                                   }})
       res.json({
        success: true,
        orders: myOrders
       })

    } catch (error) {
        res.status(500).json({ success: false });
    }

}




exports.store = async (req, res) => {

   
    let {  shippingAddress, invoiceAddres, city, country, phone, items } = req.body
    let total = 0
    const user = "643d4f35b610791767a35e96"

    const orderItemsIds = await Promise.all(items.map(async item => {
        const {price} = await Product.findById(item.product, 'price')
        
        const newItem = {
            ...item,
            price
        }
        total += (item.quantity * price)
       const myOrderItem = await OrderItem.create(newItem)
       return myOrderItem._id
    }))
    const myOrder = new Order({shippingAddress, invoiceAddres, city, country, phone, orderItems: orderItemsIds, user, total})

    myOrder.save()
             .then(insertedOrder => {
                res.status(201).json({
                    order: insertedOrder,
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
