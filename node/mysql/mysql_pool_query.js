/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var pool = require("./mysql_pool");

exports.insert = function (sql, callback) {
    pool.insert(sql, function (error, results, fields) {
        if (error) throw error;
        callback(JSON.parse(JSON.stringify(results)));
    });
}
exports.query = function (sql, callback) {
    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(JSON.parse(JSON.stringify(results)));
    });
}

exports.update = function (sql, callback) {
    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(JSON.parse(JSON.stringify(results)));
    });
}