const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require('express-jwt');

//Create Operator
exports.signup = (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "NOT able to save user in Database"
            })
        }
        res.json({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            id: user._id
        })
    })
};

exports.signin = (req,res) => {

    const { email,password } = req.body

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()
        })
    }
    
    User.findOne({ email }, (err,user) => {
        //visit once
        if(err || !user){
            res.status(400).json({
                error: "USER does not exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email or password does not match"
            })
        }

        //create tokens
        const token = jwt.sign( {_id : user._id}, process.env.SECRET);

        //put tokens in cookie
        res.cookie("token", token, {expire : new Date() + 999});
        
        //send response to front end
        const { name, email, _id, role} = user;
        return res.json({token, user: { name, email, _id, role}});
    })

};

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message: "user signout"
    })
};


//protected
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    //this property is going to be added in every request as a property
    userProperty : "auth"
})

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = (req.profile && req.auth && req.profile._id == req.auth._id)
    if(!checker){
        res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(!req.profile.role === 0){
        res.status(403).json({
            error: "You are NOT an ADMIN, ACCESS DENIED"
        })
    }
    next();
}