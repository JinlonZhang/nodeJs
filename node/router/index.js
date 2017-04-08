/**
 * Created by xiaogang on 2017/4/4.
 */
"use strict";
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.send('Hello node-express World!');
        next();
    });
    // 具体的业务请求路由配置
    app.use('/user', require('./user'));


    //以下路由配置为测试路由
    app.use('/proxy', require('./proxy'));


    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404);
            res.status(404).render('../view/404');
        }
    });
};
