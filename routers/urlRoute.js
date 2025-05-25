const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const urlController = require("../controllers/urlController");

router.post("/shorten", authMiddleware, urlController.shortnerUrl);
4;
// Redirectional Route
router.get("/:shortId", urlController.reDirectUrl);

// Analytics route
router.get("/analytics/:shortId", authMiddleware, urlController.getAnalytics);

router.get("/", authMiddleware, urlController.getHomePage);

module.exports = router;
