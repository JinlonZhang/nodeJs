/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";
var config = require('config-lite');
var mysql = require('mysql');
var connection = mysql.createConnection(config.mysql);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM `user` WHERE 1', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0]);

    console.log(JSON.parse(JSON.stringify(results)));
});

connection.end();

module.exports = connection;