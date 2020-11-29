const { Order, ProductCart } = require("../models/order");

//Middleware
exports.getOrderbyId = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error: "No Order(s) found"
            })
        }

        req.order = order;
        next();
    })
}

//CREATE controller
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if(err){
            return res.status(400).json({
                error: "Order NOT saved in DB"
            })
        }

        res.json(order);
    })
}

//READ controller
exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err,orders) => {
        if(err){
            return res.status(400).josn({
                error: "No order(s) found"
            })
        }

        res.json(orders);
    })
}

//READ a particular order
exports.getOrder = (req, res) => {
    return res.json(req.order);
}
//Status Update controllers TODO: get order status to be revisited
exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
}


exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, orderStatus) => {
            if(err){
                return res.status(400).json({
                    error: "Cannot update order status"
                })
            }

            res.json(orderStatus);
        }
    )
}
