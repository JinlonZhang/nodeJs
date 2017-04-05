/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var config = require('config-lite');
var mysql = require('mysql');
var pool = mysql.createPool(config.mysql_pool);


module.exports = pool;