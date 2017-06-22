/**
 * Created by xiaogang on 2017/4/6.
 *  基础 服务
 */
"use strict";
var md5 = require('md5');
//mysql

var util = require("../util/util");

/**
 *  验证码
 * @param params
 * @param callback
 */
exports.verifycode = function (params, callback) {
    //生成 code
    let _code = Math.random().toFixed(5).replace(/^0\./, '');

    callback && callback(_code);
};


