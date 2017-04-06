/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var pool = require("./mysql_pool");
// var sql = 'INSERT INTO user (name, password, phone, date) VALUES (1104 , 1104 ,1104 , NOW())'


exports.insert = function (params, callback) {
    let post = Object.assign({date: new Date()}, params);
    pool.query('INSERT INTO user SET ?', post, function (error, results, fields) {
        if (error) throw error;
        console.log(fields);
        callback(JSON.parse(JSON.stringify(results)));
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
        if (error) throw error;
        // console.log(fields);
        callback(JSON.parse(JSON.stringify(results)));
    });
}

exports.update = function (sql, callback) {
    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(JSON.parse(JSON.stringify(results)));
    });
}