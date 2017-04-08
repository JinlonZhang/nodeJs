/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var pool = require("./mysql_pool");
// var sql = 'INSERT INTO user (name, password, phone, date) VALUES (1104 , 1104 ,1104 , NOW())'

/**
 *  用户注册
 * @param params
 * @param callback
 */
exports.insert = function (params, cb) {

    // let post = Object.assign(params, {date: new Date()});

    pool.query('INSERT INTO user SET ?', params, function (error, results, fields) {
        if (error) {
            console.log(error);
            //throw error; 不要直接抛出错误
            cb(error, results, fields);
        } else {
            cb(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });

}
/**
 * 根据用户名和密码查询 是否有相应的用户信息
 * @param params
 * @param callback
 */
exports.query = function (params, callback) {
    let post = [params.name, params.password];
    pool.query("SELECT * FROM user WHERE name = ? AND password = ?", post, function (error, results, fields) {
        if (error) {
            // throw error;
            callback(error, results, fields);
        } else {
            callback(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });
}

