const mongoose = require("mongoose");

async function connectToDatabase(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("connected to database");
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = connectToDatabase;
