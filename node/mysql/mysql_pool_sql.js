/**
 * Created by xiaogang on 2017/4/19.
 */
"use strict";
var pool_query = require("./mysql_pool_base");
/**
 * 封装 查单表 sql 语句处理
 * @param table
 * @param params
 * @returns {{sql: string, values: Array}}
 */
exports.select_single_table = function (table, params, callback) {
    let post = [];
    let queryArr = [];

    for (let key in params) {
        post.push(params[key]);
        queryArr.push(key + ' = ?');
    }
    let _sql = {
        sql: "SELECT * FROM " + table + " WHERE " + queryArr.join(" AND ") || 1,
        values: post
    };

    pool_query.query(_sql, callback);
};

exports.insert_single_table = function (table, params, callback) {
    // 'INSERT INTO user SET ?', params
    let _sql = {
        sql: 'INSERT INTO ' + table + ' SET ?',
        values: params
    };

    pool_query.query(_sql, callback)
};
