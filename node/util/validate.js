/**
 * 处理数据校验
 * Created by xiaogang on 2017/4/6.
 */
"use strict";

//
exports.required = function (val) {
    return val == null || val == undefined;
};
/**
 * 手机号的校验
 * @param val
 * @returns {boolean}
 */
exports.phone = function (val) {
    return /^1[^01246]\d{9}$/.test(val);
};
/**
 * 联系电话的校验
 * @param val
 * @returns {boolean}
 */
exports.tel = function (val) {
    return false;
};
/**
 * 邮箱
 * @param val
 * @returns {boolean}
 */
exports.email = function (val) {
    return false;
};
/**
 * 用户名
 * 6-16 数字和大小写字母
 */
exports.username = function (val) {
    return /\w{6,16}/.test(val);
}
/**
 * 用户密码
 * 8-16 数字、大小写字母和 !@#$%^&*()-
 * 必须 同时含有 数字 、大写字母、 小写字母 和 特殊符 中三种
 */
exports.password = function (val) {
    return /[!@#\$%\^&\*\(\)\w]{8,16}/.test(val) && /[\d\w]?\d+\w+[\d\w]?/.test(val);
}
/**
 * 验证码
 * @param val
 * @returns {boolean}
 */
exports.verifycode = function (val) {
    return false;
};
/**
 *  身份证号码
 * @param val
 * @returns {boolean}
 */
exports.idcard = function (val) {
    return false;
};