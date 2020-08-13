module.exports = 'hello';
console.log('aaa');

/* 
  module.exports 和 exports 有什么区别？为什么不直接用exports

    其实module.exports 和 exports 是一个东西
    源码中定义的是 let exports = module.exports = {}
    返回的结果是 module.exports 所以不能直接更改 exports 的值
    可以写 exports.a = xxx;

    如果两个都写了，只能识别 module.exports 的值
 */

/* 
  每个函数都会传入 module exports require, __filename, __dirname 全局变量
 */