const User = require('./../models/user')
const Order = require('./../models/order')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.index = async (req, res) => {
    
    try {

       const result = await User.find()

       res.json({
        success: true,
        users: result
       })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            error
           })
        
    }
}


exports.userOrders = async (req, res, next) => {

    let { id } = req.params

    try {
        
       const myOrders = await Order.find({user: id}, '-user')
                                   .populate({ path: 'orderItems', populate: {
                                    path: 'product', select: 'title description', populate: {
                                        path: 'category',
                                        select: 'label'
                                    }
                                   }})

        // let total = 0

        // myOrders.forEach(order => {
        //     total += order.total
        // })

        const total = myOrders.reduce((cumul, order) => cumul + order.total, 0)


       res.json({
        total,
        success: true,
        orders: myOrders
       })

    } catch (error) {
        res.status(500).json({ success: false });
    }

}


exports.register = async (req, res) => {

    let {name, email, password, address, city, country, phone} = req.body

    const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        address,
        city,
        country,
        phone
    })

    try {
        
        const result = await user.save()
        
        res.status(201).json({
            success: true,
            user: result
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            error
        })
        
    }

}

exports.login = async (req, res) => {

    const { email, password } = req.body

    
    const user = await User.findOne({email: email}, 'name email password isAdmin')

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "email or password is Wrong !"
        })
    }

    if(user && bcrypt.compareSync(password, user.password)) {

        const secret = process.env.SECRET_KEY

        const token = jwt.sign({
            userId: user._id,
            name: user.name,
            isAdmin: user.isAdmin
        }, secret, {expiresIn: '1h'})

        return res.status(200).json({
            success: true,
            message: "User is Authenticated",
            user: user.name,
            token
        })
    }

    res.status(400).json({
        success: false,
        message: "email or password is Wrong !"
    })

}