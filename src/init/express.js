const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = new express();
let staticPath = path.resolve(__dirname,"../static");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.use(session({
    secret:"pjw521",
    resave:true,//允许刷新过期时间
    saveUninitialized:true,//允许刷新过期时间，必须与resave同时开启
    cookie:{
        maxAge:3600 * 24 * 30 *100
    }
}))
module.exports = app