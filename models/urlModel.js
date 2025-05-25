const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      require: true,
    },
    shortCode: {
      type: String,
      require: true,
      unique: true,
    },
    visitedHistory: [
      {
        visitCount: { type: Number },
        visitTime: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
