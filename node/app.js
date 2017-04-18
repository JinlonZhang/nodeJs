/**
 * Created by xiaogang on 2017/3/29.
 */
"use strict";
//相关依赖
var path = require('path');
var express = require("express");
var favicon = require('serve-favicon');
var pug = require('pug');
var config = require('config-lite');
var bodyParser = require('body-parser');

const routes = require('./router/index');//require('./router');

//相关配置文件
// var pkg = require('../package');
//实例
var app = express();
//设置地址栏icon
app.use(favicon(path.join(__dirname, './public', 'favicon/favi.ico')));

// 设置模板目录和模板引擎pug
app.set('views', path.join(__dirname, 'view'));
// 设置模板引擎为 ejs
app.set('view engine', 'pug');

// 设置静态文件目录
app.use(config.publicPath, express.static(path.join(__dirname, './public')));
// 前端 静态资源区 [更多配置 查看官方api]
// app.use('/', express.static(path.join(__dirname, './webapp')，{maxAge: 1000}));
app.use(express.static(path.join(__dirname, './webapp'), {maxAge: 1000}));

// 设置模板全局常量
app.locals.blog = {
    title: "node-express",
    description: "1104"
};


// bodyParser ：ajax 请求的配置项
// app.use(bodyParser.json({
//      type: 'application/*+json',
//      strict: false
// })); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded

// 路由
routes(app);

//错误处理
app.use(function (err, req, res, next) {
    console.log("=================错误处理=================")
    //其他 业务逻辑
    console.log(err);
    if (res.headersSent) {
        //return next(err);
    }
    res.status(500);
    res.render('error', {error: err});
});

// 监听端口，启动程序
const SERVER = app.listen(config.port, function () {
    var address = SERVER.address();
    console.log(address);
    console.log(`nodeApp listening on port ${config.port}`);
    // console.log(`${pkg.name} listening on port ${config.port}`);
});
