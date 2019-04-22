let { UserModel } = require("../models/index.js");
let objectId = require("mongodb").ObjectId;
const md5 = require("md5");


class User{
    constructor(){
    }
    //添加用户
    add(opts){
        return new Promise(function(resolve,reject){
            //对密码进行md5加密
            this._mdPassword(opts);
            let newUser = new UserModel(opts);
            newUser.save((err,doc) => {
                if(err){
                    reject("user add:创建新用户失败" + err)
                }else{
                    resolve(doc);
                }
            })
        }.bind(this))
    }
    //查询单个用户
    get(opts,fields = null){
        return new Promise(function(resolve,reject){
            //如果使用id查询则将id转为objectid
            if(opts._id){
                opts._id = objectId(opts._id);
            }
            //对密码实行md5加密
            this._mdPassword(opts);
            UserModel.findOne(opts,fields,function(err,doc){
                if(err){
                    reject("user get:获取用户失败" + err)
                }else{
                    resolve(doc);
                }
            })
        }.bind(this))
    }
    //更新用户数据
    update(conditions,newData){
        if(conditions._id){
            conditions._id = objectId(conditions._id);
        }
        return new Promise((resolve,reject) => {
            UserModel.update(conditions,newData,(err,docs) => {
                if(err){
                    reject("user update :更新用户数据失败" + err);
                }else{
                    resolve(docs);
                }
            })
            
        })
    }
    _mdPassword(opts){
        let salt = "pjw521";
        if(opts.password){
            opts.password = md5(md5(salt) + opts.password);
        }
    }
}

module.exports = User;