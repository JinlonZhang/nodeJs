/**
 * 处理数据校验
 * Created by xiaogang on 2017/4/6.
 */
"use strict";

//
exports.required = function (val) {
    return val == null || val == undefined;
};
