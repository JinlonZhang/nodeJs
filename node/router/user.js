/**
 * Created by xiaogang on 2017/4/4.
 */
"use strict";
var express = require('express');
var router = express.Router();
//mysql
var user_pool = require("../mysql/mysql_pool_user");
//service
var user_service = require("../service/user");
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


// 定义 logout 页面的路由
router.post('/logout', function (req, res) {
    console.log(req.body);
    res.send('user logout');
});

// 用户注册
router.post('/sign', function (req, res) {
    console.log(req.body);
    let _body = req.body;
    //必要参数处理
    if (!(_body.name && _body.pwd && _body.password)) {
        let _result = res_format.response_without_request({
            cmd: "user/infos"
        });
        res.json(_result);

        return;
    }
    //参数 规则
    if (_body.pwd != _body.password) {
        let _result = res_format.response_error_request({
            cmd: "user/infos",
            msg: "密码输入不一致！"
        });
        res.json(_result);

        return;
    }

});
// 用户登录
router.post('/login', function (req, res) {
    console.log(req.body);
    let _body = req.body;
    //必要参数处理
    if (!(_body.name && _body.password)) {
        let _result = res_format.response_without_request({
            cmd: "user/infos"
        });
        res.json(_result);

        return;
    }
    //密码的 md5 处理

    //sql
    user_service.login(_body, function (data) {
        console.log("=============== router query callback ==========");
        console.log(data);
        res.json(data);
    })

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