const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/boke', {useNewUrlParser: true});
// let db =mongoose.connection;
// db.on("open",()=>console.log("数据库已连接"));