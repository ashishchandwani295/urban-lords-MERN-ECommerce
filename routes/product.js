const express = require("express");
const router = express.Router();

const { getProductbyId, getProduct, createProduct, removeProduct, updateProduct, getAllProducts, photo, getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserbyId } = require("../controllers/user");


//PARAMS
router.param("userId", getUserbyId );
router.param("productId", getProductbyId);


//Create
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

//Read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//Update
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

//Delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct);

//Listing Products
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);


module.exports = router;