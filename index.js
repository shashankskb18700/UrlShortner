const express = require("express");
const connectToDatabase = require("./connect");
const AppRouter = require("./routes/url");
const path = require("path");
const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
const PORT = 8001;

connectToDatabase("mongodb://127.0.0.1:27017/url_shortner");
AppRouter(app);

app.listen(PORT, () => {
  console.log("On port ", PORT);
});
