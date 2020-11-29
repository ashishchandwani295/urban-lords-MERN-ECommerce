const express = require("express");
const router = express.Router();

const { getUserbyId, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//PARAMS
router.param("userId", getUserbyId);

//Read operator
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//Update operator
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//Order route for users
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

//get all users assignment route

/*router.get("/users", getAllUsers );*/


module.exports = router;