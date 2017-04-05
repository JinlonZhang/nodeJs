/**
 * Created by xiaogang on 2017/4/5.
 */
"use strict";

//default response
// {
//     cmd:"/uci-pre/unionpay/shop/getIndustryInfo.json"
//     msg:"invoke succes"
//     result:Object || Array
//     code:10000
//     v:"1.0"
// }
function response() {

}
/**
 * 请求的入参不对格式化返回
 * @returns {{cmd: string, msg: string, params: (Object|Array), code: number, v: string}}
 */
exports.response_without_request = function (params) {
    return {
        cmd: params.cmd || "",
        msg: params.msg || "请求的入参不对!",
        result: params.result || {},
        code: 10001,//统一code
        v: "1.0.0"
    };
};
/**
 *
 * @returns {{cmd: string, msg: string, result: {}, code: number, v: string}}
 */
exports.response_format = function (params) {
    return {
        cmd: params.cmd || "",
        msg: params.msg || "success",
        result: params.result || {},
        code: 10000,//统一code
        v: "1.0.0"
    };
};