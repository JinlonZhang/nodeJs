/**
 * Created by xiaogang on 2017/4/8.
 * 测试 代理转发 页面
 */
"use strict";
var express = require('express');
var router = express.Router();

//service
var test_service = require("../service/server_test");
//util
var res_format = require("../util/response_format");

// 查询用户信息
router.post('/proxy', function (req, res) {
    console.log(req.body);
    let _body = req.body;
    if (!_body.name) {
        let _result = res_format.response_without_request({
            cmd: "proxy/proxy",
            msg: "name is null",
        });

        res.json(_result);
        return;
    }

    //sql
    test_service.proxy(_body, function (data) {
        console.log("=============== proxy query callback ==========");
        console.log(data);
        res.json(data);
    })

});


module.exports = router;