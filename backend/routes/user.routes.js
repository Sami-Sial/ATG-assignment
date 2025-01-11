const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers.js");


router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get("/logout", userControllers.logoutUser);
router.post("/password/forgot", userControllers.forgotPassword);
router.put("/password/reset/:token", userControllers.resetPassword);


module.exports = router;