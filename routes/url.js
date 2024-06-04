const { timeStamp } = require("console");
const {
  handleGenerateShortUrl,
  handleAnalytics,
} = require("../controller/url");

const URL = require("../model/url");

function AppRouter(app) {
  app.post("/url/", handleGenerateShortUrl);

  app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitedHistory: {
            timeStamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectUrl);
  });

  app.get("/analytics/:shortId", handleAnalytics);

  app.get("/test", async (req, res) => {
    const allUser = await URL.find({});

    // res.send(
    //   `<html> <head></head><body><ol> ${allUser.map(
    //     (user) => `<li>${user.shortId} - ${user.redirectUrl}</li>`
    //   )}</ol></body> </html>`
    // );

    res.render("home", {
      urls: allUser,
    });
  });
}

module.exports = AppRouter;
