require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./shorturl")

app.use(cors());

app.use(express.static(`./public`));
app.use("/api", api);

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render('index');
});


module.exports = app;
