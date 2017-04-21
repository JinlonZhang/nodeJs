/**
 * Created by xiaogang on 2017/4/19.
 * 数据的基本操作：增删查改
 * sql 语句的 拼接处理 放到 业务层处理
 */
"use strict";
//数据库连接池
var pool = require("./mysql_pool");

/**
 * 单表 的 数据
 * @param queryData 数据库 query  对象
 * @param callback 回调 处理结果
 */
exports.query = function (queryData, callback) {
    console.log("============pool base ================");
    console.log(queryData);
    pool.query(queryData, function (error, results, fields) {
        if (error) {
            // throw error;
            callback(error, results, fields);
        } else {
            callback(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });
};

/**
 * 查询
 * @param params
 * @param callback
 */
exports.select = function (params, callback) {
    //"SELECT * FROM table WHERE a = ? and b = ?,
    let post = [];
    let queryArr = [];

    for (let key in params.$where) {
        post.push(params.$where[key]);
        queryArr.push(key + ' = ?');
    }
    let _sql = {
        sql: "SELECT * FROM " + params.$table + " WHERE " + queryArr.join(" AND ") || 1,
        values: post
    };

    pool.query(_sql, callback);
};
/**
 * insert
 * @param params
 * @param cb
 */
exports.insert = function (params, cb) {
    console.log("===========base insert==================");
    let _sql = {
        sql: 'INSERT INTO ' + params.$table + ' SET ?',
        values: params.$values
    };
    console.log(_sql);
    pool.query(_sql, cb);

};

