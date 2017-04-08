/**
 * Created by xiaogang on 2017/4/4.
 */
"use strict";
var express = require('express');
var router = express.Router();

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
router.get('/', function (req, res, next) {
    // console.log(req);
    res.send(req.query || {});
});

// 用户注册
router.post('/sign', function (req, res, next) {
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

    //手机号
    if (/\D+/.test(_body.phone)) {
        let _result = res_format.response_error_request({
            cmd: "user/infos",
            msg: "手机号错误！"
        });
        res.json(_result);

        return;
    }

    //sql
    user_service.sign(_body, function (data) {
        console.log("=============== router query callback ==========");
        console.log(data);
        // next(data);
        res.json(data);
    })
});
// 用户登录
router.post('/login', function (req, res) {
    console.log(req.body);
    let _body = req.body;
    //必要参数处理
    if (!(_body.name && _body.password)) {
        let _result = res_format.response_without_request({
            cmd: "user/login"
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

module.exports = router;