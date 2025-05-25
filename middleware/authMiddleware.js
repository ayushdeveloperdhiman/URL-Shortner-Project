const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
};
