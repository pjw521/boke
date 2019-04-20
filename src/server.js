"use strict"
require("./init/mongodb.js");
require("./models/user.js");
let app = require("./init/express.js");


app.listen(3000,err => {
    if(err){
        console.log(err);
    }else{
        console.log("server on port 3000")
    }
})