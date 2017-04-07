/**
 * Created by xiaogang on 2017/4/6.
 */
"use strict";
//mysql
var user_pool = require("../mysql/mysql_pool_user");
//util
var res_format = require("../util/response_format");


exports.sign = function (params, callback) {
    let _params = {
        name: params.name,
        password: params.password,
        phone: params.phone
    };
    user_pool.insert(_params, function (err, data, fields) {
        console.log("=============== service query callback ==========");
        console.log(data);
        let _result = null;
        if (err) {
            if (err.errno == 1062) {
                //用户已存在，违反唯一性约束
                _result = res_format.response_sql_unique({
                    cmd: "user/sign",
                    msg: "用户名已被抢注！",
                    result: {sign: false, msg: "用户名已被抢注！"}
                })
            } else {
                //其他数据库错误
                _result = res_format.response_sql_error({
                    cmd: "user/sign",
                    result: {sign: false}
                })
            }
        } else {
            // data = JSON.parse(JSON.stringify(data));
            if (data && data.affectedRows) {
                _result = res_format.response_format({
                    cmd: "user/sign",
                    result: {sign: true}
                });
            } else {
                _result = res_format.response_without_result({
                    cmd: "user/sign",
                    result: {sign: false}
                });
            }
        }
        callback(_result);
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
                msg: "用户名或密码错误！",
                result: {login: false}
            });
        }
        callback(_result);
    });
};