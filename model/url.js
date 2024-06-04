const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: "string",
      required: "true",
      unique: "true",
    },
    redirectUrl: {
      type: "string",
      required: true,
    },
    visitedHistory: [{ timeStamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = new mongoose.model("url", urlSchema);

module.exports = URL;
