/**
 * Created by xiaogang on 2017/4/6.
 */
"use strict";
var config = require('config-lite');
/**
 *
 * @param value
 * @returns {boolean}
 */
exports.isFunction = function (value) {
    return type(value) == "function";
};
/**
 * 将静态 服务端资源的相对路径 转换为 可以直接访问的绝对 路径
 * @param relativePath
 * @returns {string}
 */
exports.absolutePath = function (relativePath) {
    return config.origin + relativePath.replace(/\\/ig, "/").replace(/^\/?public/i, config.publicPath);
};