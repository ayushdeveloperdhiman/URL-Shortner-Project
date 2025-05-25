const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const cookieParser = require("cookie-parser");

// User registration
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.redirect("/auth/login");
  } catch (error) {
    res.json({ msg: "User registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    console.log("isMatch", isMatch);

    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

    //   Create Token
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    //save token in cookies
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/api");
  } catch (error) {
    res.render("login", { error: "Error logging in. Please try again" });
  }
};

// user logout

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};
