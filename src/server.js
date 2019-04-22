"use strict"
require("./init/mongodb.js");
let app = require("./init/express.js");
let  { userRouter }= require("./routes/index.js");
userRouter(app);

app.use(function (req, res, next) {
    res.status(404).send('页面未找到，请输入正确网址');

  })
  //函数错误处理 只有在next（err）才触发
app.use(function (err,req, res, next) {
  console.log(err);
    res.status(500).send('服务器端错误')
  })
app.listen(3000,err => {
    if(err){
        console.log(err);
    }else{
        console.log("server on port 3000")
    }
})

// let User = require("./methods/user.js");

// async function test(){
//     let user = new User();
//     let res = await user.add({
//         name:"123",
//         password:"123"
//     });
//     console.log(res);
// }
//  test();
//路由错误处理 路由