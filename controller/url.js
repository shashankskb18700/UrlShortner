const shortid = require("shortid");

const URL = require("../model/url");
const { resourceLimits } = require("worker_threads");

async function handleGenerateShortUrl(req, res) {
  const shortId = shortid(8);
  const body = req.body;

  if (!body.url) return res.status(404).json({ error: "url is required" });

  URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitedHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = {
  handleGenerateShortUrl,
  handleAnalytics,
};
