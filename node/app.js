/**
 * Created by xiaogang on 2017/3/29.
 */
"use strict";
//相关基础依赖
var path = require('path');
var express = require("express");
var session = require('express-session');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var pug = require('pug');
var config = require('config-lite');
var bodyParser = require('body-parser');
var winston = require('winston');
var expressWinston = require('express-winston');
require('winston-daily-rotate-file');

// 路由
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
app.use('/webapp', express.static(path.join(__dirname, './webapp'),{maxAge: 1000}));
app.use('/developer', express.static(path.join(__dirname, '../src'),{maxAge: 1000}));
// app.use('/', express.static(path.join(__dirname, './build/react-dev'), {
//     maxAge: 1000,
//     index: ['index.html', 'app.html']
// }));


// 建议使用 helmet 插件处理 header
app.disable('x-powered-by');
app.use(helmet());


// session 中间件（暂时利用内存 临时 处理session）
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    // store: new MongoStore({// 将 session 存储到 mongodb
    //     url: config.mongodb// mongodb 地址
    // })
}));


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

// expressWinston.requestWhitelist.push('body');
// expressWinston.responseWhitelist.push('body');
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,//json格式
            silent: true,//控制台不输出
            colorize: true
        }),
        new winston.transports.File({
            filename: 'log/success.log',
            timestamp: function () {
                return new Date().toString();
            },
            maxsize: 1024 * 1024//文件大小1K
        }),
        new winston.transports.DailyRotateFile({
            dirname: './log',//文件夹路径
            filename: './logs',//文件后缀
            datePattern: 'yyyy-MM-dd-HH-mm.',//文件前缀（.要自己加上）
            prepend: true,
            level: process.env.ENV === 'development' ? 'debug' : 'info'
        })
    ],
    requestWhitelist: ["body", "session"], // Array of request properties to log. Overrides global requestWhitelist for this instance
    responseWhitelist: ["body"], // Array of response properties to log. Overrides global responseWhitelist for this instance
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
        return false;
    } // optional: allows to skip some log messages based on request and/or response
}));

// 路由
routes(app);

// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'log/error.log'
        })
    ]
}));

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
