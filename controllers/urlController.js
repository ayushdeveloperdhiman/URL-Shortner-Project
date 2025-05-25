const shortid = require("shortid");
const URL = require("../models/urlModel");
const cookieParser = require("cookie-parser");

exports.getHomePage = async (req, res) => {
  try {
    const urls = await URL.find();
    res.render("index", { urls });
  } catch (error) {
    res.status(500).render("error", { message: "Error fetching urls" });
  }
};
exports.shortnerUrl = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    console.log(req.body);

    const shortCode = shortid.generate();
    await URL.create({
      shortCode,
      originalUrl,
      visitedHistory: [],
    });
    res.redirect("/api");
    // return res.json({ shortCode });
  } catch (error) {
    console.log("Failed to short the URL", error);
  }
};

exports.reDirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const url = await URL.findOne({ shortCode: shortId });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    const visitedEntry = {
      visitCount: url.visitedHistory.length + 1,
      visitTime: new Date(),
    };
    url.visitedHistory.push(visitedEntry);
    await url.save();
    return res.redirect(url.originalUrl);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error", err });
  }
};

exports.getAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const url = await URL.findOne({ shortCode: shortId });

  if (url) {
    res.render("urlDetails", { url });
  } else {
    res.status(404).render("error", { msg: "URL not found" });
  }
  // if (!url) {
  //   return res.status(404).json({ error: "URL not found" });
  // }
  // return res.status(200).json({
  //   totalClicks: url.visitedHistory.length,
  //   analytics: url.visitedHistory,
  // });
};
