const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("../routes/test.js");

const app = new express();
let staticPath = path.resolve(__dirname,"../static");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.use(router);
module.exports = app