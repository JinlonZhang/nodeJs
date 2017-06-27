/**
 * Created by xiaogang on 2017/6/5.
 */
"use strict";
var readline = require('readline');//引入readline模块
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var bool = -1;// 初始状态为负数，表示还没开始读取
var ans = 0;
var sequence;
var result = [];
rl.on('line_bak', function (line) {
    console.log(line);
    if (bool < 0) {
        bool = parseInt(line.trim());
    } else {

        sequence = line.split(" ").map(function (index) {
            return parseInt(index);
        })
        ans = sequence.length;
        while (bool != 0) {
            var LeftList = sequence.slice(0, ans / 2).reverse();
            var RightList = sequence.slice(ans / 2, ans).reverse();
            for (var i = 0; i < LeftList.length; i++) {
                result.push(RightList[i]);
                result.push(LeftList[i]);
            }
            result = result.reverse()
            bool--;
            sequence = result.slice(0)
            if (bool == 0) {
                result.length = ans
                console.log(result.join(" "))
            }
        }
    }
    // 重新初始化相关变量
    if (bool == 0) {
        bool = -1;
        ans = 0;
    }
});

prompt('请输入需要变换的数字字符串，偶数个数！');
rl.on('line', function (input) {
    //获取变换数组
    var inputArr = input.split(' ').filter(item => item && parseInt(item));
    console.log(inputArr);

    if (inputArr.length > 1) {
        //获取变换数据
        ans = inputArr.length;
        sequence = ans % 2 ? inputArr.slice(0, --ans) : inputArr;
    } else {
        //变化次数
        bool = inputArr[0];
    }
    //开始变换
    while (bool > 0) {
        console.log('开始变换！');
        console.log(sequence);
        console.log(ans);
        //分排

        var left = sequence.slice(0, ans / 2);
        var right = sequence.slice(ans / 2);
        console.log(left);
        console.log(right);

        //洗牌
        for (let i = ans / 2; i > 0; i--) {
            result.push(right[i - 1]);
            result.push(left[i - 1]);
        }

        bool--;
        sequence = result.reverse();
        result = [];
    }

    if (bool == 0) {
        //输出结果
        console.log('out:' + sequence.join(' '));
    }

});
function prompt(msg) {
    console.log(`${msg}\n`);
}
