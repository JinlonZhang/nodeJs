/**
 * Created by xiaogang on 2017/4/19.
 */
"use strict";
/**
 * 封装 查单表 sql 语句处理
 * @param table
 * @param params
 * @returns {{sql: string, values: Array}}
 */
exports.select_single_table = function (table, params) {
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
};

exports.insert_single_table = function (table, params) {
    'INSERT INTO user SET ?', params
    return {
        sql: "SELECT * FROM " + table + " WHERE " + queryArr.join(" AND "),
        values: post
    };
};
