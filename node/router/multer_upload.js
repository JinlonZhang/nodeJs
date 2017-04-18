/**
 * Created by xiaogang on 2017/4/18.
 */
"use strict";
var multer = require('multer');

//设置固定的图片 存放 文件夹
// var upload = multer({dest: 'uploads/'});
// 根据 请求动态设置
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("=========destination =======")
        cb(null, 'public/logo');
    },
    filename: function (req, file, cb) {
        console.log("=========filename =======")
        cb(null, req.body.userName + '_' + file.fieldname + '_' + Date.now() + "_" + file.originalname);
    }
});

module.exports = multer({storage: storage});