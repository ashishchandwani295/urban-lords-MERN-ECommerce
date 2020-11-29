const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/payment");
const { getUserbyId } = require("../controllers/user");

//params
router.param("userId", getUserbyId );

//Get/Generate token
router.get("/payment/getToken/:userId", isSignedIn, isAuthenticated, getToken);

//Process payment
router.post("/payment/checkout/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;