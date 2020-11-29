const express = require("express")
const router =  express.Router();

const { getCategorybyId, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category");
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const { getUserbyId, getUser } = require("../controllers/user")

//User and Category PARAMS
router.param("userId", getUserbyId );
router.param("categoryId", getCategorybyId);

//Category Routes
//Create     //only certain users( admins ) can create categories
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

//Read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

//Delete
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);



module.exports = router;