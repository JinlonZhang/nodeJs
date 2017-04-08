/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var pool = require("./mysql_pool");

exports.query = function (sql, callback) {
    sql = "SELECT * FROM user WHERE 1";
    pool.query(sql, function (error, results, fields) {
        console.log("========= sql =============");
        console.log(results);
        if (error) {
            // throw error;
            callback(error, results, fields);
        } else {
            callback(null, JSON.parse(JSON.stringify(results), fields));
        }
    });
}
