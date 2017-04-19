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
    pool.query(queryData, function (error, results, fields) {
        if (error) {
            // throw error;
            callback(error, results, fields);
        } else {
            callback(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });
};

