const { Order } = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");



exports.getUserbyId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found in DB"
            })
        }

        req.profile = user;
        next();
    })
};

exports.getUser = (req, res) => {
        req.profile.salt = undefined;
        req.profile.encry_password = undefined;
        return res.json(req.profile);
}

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id },
        { $set: req.body},
        { new : true, useFindAndModify : false},
        (err, user) => {
            if(err){
                res.status(400).json({
                    error: "You are NOT authorized to update this user!"
                })
            }

        req.profile = user;
        req.profile.salt = undefined;
        req.profile.encry_password = undefined;
        return res.json(req.profile);
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find( {user : req.profile._id } )
    .populate("User", "_id name")
    .exec((err, order) => {
        if(err){
            res.status(400).json({
                error: "No order(s) found for this user"
            })
        }

        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];

    req.body.order.products.forEach( product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,
        })
    });

    //Storing in DB

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: {purchases:purchases}},
        {new : true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }
            next();
        })
}


//Get all users assignment
/*exports.getAllUsers = (req,res) => {
    User.find().exec((err, user) => {
            if(err){
                return res.status(400).json({
                    error: "No USER found"
                })
            }
        req.profile = user;
        for(let i=0;i<user.length;i++){
            req.profile[i].salt = undefined;
            req.profile[i].encry_password = undefined;
            //break;
        }
        return res.json(req.profile)
    })
}*/