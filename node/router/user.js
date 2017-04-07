/**
 * Created by xiaogang on 2017/4/4.
 */
"use strict";
var express = require('express');
var router = express.Router();

var request = require('request');

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
    }

    //sql
    user_service.query(_body, function (data) {
        console.log("=============== router query callback ==========");
        console.log(data);
        //res.json(data);

        //proxy 老后台查询  todo 相关逻辑放到 service 层维护
        var url = 'http://120.132.3.52:8088/uci-pre/unionpay/shop/getIndustryInfo.json';

        request({
            uri: url,
            method: "POST",
            body: _body,
            json: true
        }, function (_err, _res, _resBody) {
            console.log("=============== proxy ==========");
            console.log(_err);
            console.log("=============== proxy _resBody ==========");
            console.log(_resBody);
            console.log("=============== proxy _res ==========");
            console.log(_res.body);

            res.json(_resBody);
        });
    })

});

// 定义 about 页面的路由
router.get('/about', function (req, res) {
    console.log(req.query);
    res.send(req.query);
});


module.exports = router;