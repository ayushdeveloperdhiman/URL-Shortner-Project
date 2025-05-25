const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Render Registration form
router.get("/register", (req, res) => {
  res.render("register");
});

// Render Loging page
router.get("/login", (req, res) => {
  res.render("login");
});

// User Registration Route
router.post("/register", authController.registerUser);

// User login route
router.post("/login", authController.loginUser);

router.get("/logoutUser", authController.logoutUser);

module.exports = router;
