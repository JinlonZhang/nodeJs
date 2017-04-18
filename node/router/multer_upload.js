/**
 * Created by xiaogang on 2017/4/18.
 * 使用 multer 插件 封装文件上传 模块
 */
"use strict";
var multer = require('multer');

//设置固定的图片 存放 文件夹
// var upload = multer({dest: 'uploads/'});
// 根据 请求动态设置
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("=========destination =======");
        cb(null, 'public/' + file.fieldname);
    },
    filename: function (req, file, cb) {
        console.log("=========filename =======");
        cb(null, file.fieldname + '_' + req.body.userName + '_' + Date.now() + "_" + file.originalname);
    }
});

module.exports = multer({storage: storage});