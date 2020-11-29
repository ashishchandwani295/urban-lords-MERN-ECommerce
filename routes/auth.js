var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.post("/signup",
[
    check("name","name should be at least 3 characters").isLength({min : 3}),
    check("email","incorrect email address").isEmail(),
    check("password","password should be at least 5 characters").isLength({min : 5})
], 
signup);

router.post("/signin",
[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min : 5})
], 
signin);

router.get("/signout", signout);


//test protected route
router.get("/protected", isSignedIn, (req,res) => {
    res.status(200).json(req.auth)
});

module.exports = router;