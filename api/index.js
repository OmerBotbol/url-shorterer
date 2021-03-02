const {Router} = require("express");
const shortUrl = require("./shortUrl");

const api = Router();

api.use("/shorturl", shortUrl);

module.exports = api;