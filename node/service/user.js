/**
 * Created by xiaogang on 2017/4/6.
 */
"use strict";
//mysql
var user_pool = require("../mysql/mysql_pool_user");
//util
var res_format = require("../util/response_format");


exports.sign = function (params) {
    user_pool.insert(_body, function (data) {
        console.log("=============== user query callback ==========");
        console.log(data);
        let _result = res_format.response_format({
            cmd: "user/infos",
            result: data
        });
        res.json(_result);
    });
};

exports.login = function (params, callback) {
    user_pool.query(params, function (data) {
        console.log("=============== service query callback ==========");
        console.log(data);
        let _result = null;
        if (Array.isArray(data) && data.length) {
            _result = res_format.response_format({
                cmd: "user/infos",
                result: {login: true}
            });
        } else {
            _result = res_format.response_without_result({
                cmd: "user/login",
                result: {login: false}
            });
        }
        callback(_result);
    });
};