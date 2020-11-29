const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserbyId, pushOrderInPurchaseList } = require("../controllers/user");
const { getOrderbyId, createOrder, getAllOrders, getOrder, updateStatus } = require("../controllers/order");
const { updateStock } = require("../controllers/product");

//PARAMS
router.param("userId", getUserbyId);
router.param("orderId", getOrderbyId);

//CREATE
router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
  );

//READ
router.get("/orders/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//Upate - Status update TODI: doubt on get order status route
router.get("/order/:orderId/:userId", isSignedIn, isAuthenticated, getOrder);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;