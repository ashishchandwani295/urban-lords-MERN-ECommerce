const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product",
    },

    name:{
        type: String
    },

    count:{
        type: Number
    },

    price:{
        type: Number
    },
},{timestamps:true}
);

const ProductCart = mongoose.model("ProductCart", productCartSchema )

const orderSchema = new mongoose.Schema({

    products: [productCartSchema],
    transaction_id: {},
    amount: {type: Number},
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    address: {type: String},
    updated: {type: Date},
    user:{
        type: ObjectId,
        ref: "User",
    }

},{timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart }