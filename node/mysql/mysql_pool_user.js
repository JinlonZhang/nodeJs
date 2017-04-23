/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var pool = require("./mysql_pool");
var pool_base = require("./mysql_pool_base");

//常量配置
const TABLE = 'userinfo';

//继承父类的函数
exports.select = pool_base.select;
exports.insert = pool_base.insert;
/**
 *  用户注册
 * @param params
 * @param callback
 */
exports.sign = function (params, cb) {
    // service 层已经封装好，当然service层也可以直接调用 pool_base
    let _params = {
        $table: TABLE,
        $values: params
    }

    this.insert(_params, function (error, results, fields) {
        if (error) {
            cb(error, results, fields);
        } else {
            cb(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });

}
/**
 *  用户 登录
 * @param params
 * @param callback
 */
exports.login = function (params, cb) {
    // service 层已经封装好，当然service层也可以直接调用 pool_base
    let _params = {
        $table: TABLE,
        $where: params
    }

    this.select(_params, function (error, results, fields) {
        if (error) {
            cb(error, results, fields);
        } else {
            cb(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });

}
/**
 * logo
 * @param params
 * @param cb
 */
exports.logo = function (params, cb) {
    let _params = {
        $table: 'userlogo',
        $values: params
    }

    this.insert(_params, function (error, results, fields) {
        if (error) {
            cb(error, results, fields);
        } else {
            cb(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });
};


/**
 *  获取用户 全部信息
 * @param params
 * @param callback
 */
exports.info = function (params, callback) {
    //select * from userlogo a ,`user` b  where a.username = b.`name` and b.`name` = '1qaz2wsx1' order by a.date desc limit 1 ;
    let sql = {
        sql: "select * from userlogo a ,`userinfo` b  where a.username = b.`username` and b.`username` = ? order by a.date desc limit 1",
        values: [params.username]
    };
    pool.query(sql, function (error, results, fields) {
        if (error) {
            // throw error;
            callback(error, results, fields);
        } else {
            callback(null, JSON.parse(JSON.stringify(results)), fields);
        }
    });
}




