/**
 * Created by xiaogang on 2017/4/4.
 */
"use strict";
var express = require('express');
var router = express.Router();

// 该路由使用的中间件 timeLog
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function (req, res) {
    // console.log(req);
    res.send('user home page');
});
// 定义 about 页面的路由
router.get('/about', function (req, res) {
    console.log(req.query);
    res.send('About user');
});
// 定义 login 页面的路由
router.post('/login', function (req, res) {
    console.log(req);
    res.send('user login');
});

// 定义 logout 页面的路由
router.post('/logout', function (req, res) {
    res.send('user logout');
});

module.exports = router;