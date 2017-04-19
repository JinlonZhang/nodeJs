/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var pool = require("./mysql_pool");
// var sql = 'INSERT INTO user (name, password, phone, date) VALUES (1104 , 1104 ,1104 , NOW())'
/**
 * 封装 查单表 sql 语句处理
 * @param table
 * @param params
 * @returns {{sql: string, values: Array}}
 */
function query_params(table = "user", params) {
    let post = [];
    let queryArr = [];
    for (let key in params) {
        post.push(params[key]);
        queryArr.push(key + ' = ?');
    }
    return {
        sql: "SELECT * FROM " + table + " WHERE " + queryArr.join(" AND "),
        values: post
    };
}

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
    let _queryData = query_params("user", params);
    console.log(_queryData);
    pool.query(_queryData, function (error, results, fields) {
        if (error) {
            // throw error;
            callback(error, results, fields);
        } else {
            callback(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });
};

