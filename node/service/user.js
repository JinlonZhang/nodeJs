/**
 * Created by xiaogang on 2017/4/6.
 */
"use strict";
var md5 = require('md5');
//mysql
var user_pool = require("../mysql/mysql_pool_user");
var userlogo_pool = require("../mysql/mysql_pool_userlogo");
//util
var res_format = require("../util/response_format");
var util = require("../util/util");
/**
 * 用户注册
 * @param params
 * @param callback
 */
exports.sign = function (params, callback) {
    let _params = {
        name: params.name,
        password: md5(params.password),
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
/**
 * 用户登录
 * @param params
 * @param callback
 */
exports.login = function (params, callback) {
    let _params = {
        name: params.name,
        password: md5(params.password)
    };
    user_pool.query(_params, function (err, data, fields) {
        console.log("=============== service login callback ==========");
        let _result = null;
        if (Array.isArray(data) && data.length) {
            _result = res_format.response_format({
                result: {login: true}
            });
        } else {
            _result = res_format.response_without_result({
                msg: "用户名或密码错误！",
                result: {login: false}
            });
        }
        callback(_result);
    });
};

exports.info = function (params, callback) {
    console.log("========info params===========");
    console.log(params);
    let _params = {
        name: params.userId,
    };
    user_pool.query(_params, function (err, data, fields) {
        console.log(data);
        let _result = null;
        if (err) {
            //数据库错误
            _result = res_format.response_sql_error({
                result: err
            })
        } else {
            if (Array.isArray(data) && data.length) {
                _result = res_format.response_format({
                    result: data
                });
            } else {
                _result = res_format.response_without_result({
                    msg: "请重新登录！",
                    result: {info: false}
                });
            }
        }

        callback(_result);
    });

};
/**
 * 用户头像修改
 * @param params
 * @param callback
 */
exports.logo = function (params, callback) {
    console.log(params.body);
    console.log(params.file);
    let _file = params.file;
    let _params = {
        username: params.body.userName,
        originalname: _file.originalname,
        type: _file.mimetype,
        filename: _file.filename,
        path: _file.path
    };
    userlogo_pool.insert(_params, function (err, data, fields) {
        let _result = null;
        if (err) {
            //数据库错误
            _result = res_format.response_sql_error({
                result: {logo: false}
            });
        } else {
            console.log(params.hostname);
            console.log(util.absolutePath(_file.path));
            _result = res_format.response_format({
                result: {
                    path: util.absolutePath(_file.path)
                }
            })
        }

        callback(_result);
    });


};