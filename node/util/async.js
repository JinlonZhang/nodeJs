/**
 * Created by xiaogang on 2017/4/8.
 * 解决办法：
 * - 升级node (最简单有效的办法)
 * - 通过 babel 编译器和相关的打包工具编译
 */
"use strict";
function test(flag = 1) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (flag) {
                resolve("1000 ms");
            } else {
                reject("1000 ms");
            }
        }, 1000);
    });
}

(async () => {
    let _res = await test(1);
    console.log(_res);
})();