
module.exports = function(res){
    res.status(500)
    res.render('error', { error: "服务器端错误" })
}