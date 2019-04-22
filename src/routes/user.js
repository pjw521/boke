let express = require("express");
let router = express.Router();
let User = require("../methods/user.js");
let user = new User();

router.post("/login",async function(req,res,next){
    if(req.body.username && req.body.password){
        let { username, password } = req.body;
        let user = new User();
        try{
            let doc = await user.get({name:username,password});
            if(doc){
                req.session.user = doc.name;
                req.session.logout_token = getLogoutToken();
                res.json({
                    success:true,
                    token:req.session.logout_token
                })
            }else{
                res.json({
                    success:false,
                    text:"用户不存在"
                })
            }
        }catch(err){
            next(err);
        }

    }else{
        res.json({
            success:false,
            text:"请输入用户名和密码"
        });
    }
})
//实现退出登录
router.post("/logout",async function(req,res){
    if(req.session.logout_token && req.query.token !== req.session.logout_token){
        return next("注销token错误")
    }
    //删除该用户的session
    req.session.destroy();
    res.json({
        success:true,
        text:"退出成功"
    })
})
//实现注册
router.post("/sigup",async function(req,res,next){
    let opt = {name:req.body.username,...req.body};
    let doc;
    //查询该用户名是否已被注册
    try{
        doc = await user.get({name:opt.name});
        if(doc){
            res.json({
                success:false,
                text:"该用户名已被注册"
            })
            return;
        }
    }catch(err){
        next(err);
    }

    try{
        doc = await user.add(opt);
    }catch(err){
        next(err);
    }
    if(doc){
        res.json({
            success:true,
            text:"注册成功",
            username:doc.name
        })
    }else{
        res.json({
            success:false,
            text:"注册失败"
        })
    }

})

function getLogoutToken(){
    return (" " + Math.random()).substring(3);
}

module.exports = function userRouter(app){
    app.use("/user",router);
}