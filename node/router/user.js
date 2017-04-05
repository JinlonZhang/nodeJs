/**
 * Created by xiaogang on 2017/4/4.
 */
"use strict";
var express = require('express');
var router = express.Router();
//mysql
var user_pool = require("../mysql/mysql_pool_user");
//util
var res_format = require("../util/response_format");

// 该路由使用的中间件 timeLog
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function (req, res) {
    // console.log(req);
    res.send(req.query || {});
});
// 定义 about 页面的路由
router.get('/about', function (req, res) {
    console.log(req.query);
    res.send(req.query);
});
// 定义 login 页面的路由
router.post('/login', function (req, res) {
    console.log(req.body);

    res.send(req.body);
});

// 定义 logout 页面的路由
router.post('/logout', function (req, res) {
    console.log(req.body);
    res.send('user logout');
});


// 查询用户信息
router.post('/infos', function (req, res) {
    console.log(req.body);
    let _body = req.body;
    if (!_body.name) {
        let _result = res_format.response_without_request({
            cmd: "user/infos",
            msg: "name is null",
        });
        res.json(_result);

        return;
    } else {
        user_pool.query("select * from user where name=1104", function (data) {
            console.log("=============== user query callback ==========");
            console.log(data);
            let _result = res_format.response_format({
                cmd: "user/infos",
                result: data
            });
            res.json(_result);
        });
    }
});


module.exports = router;