// 模板引擎 ejs jade underscore

let name = 'shenjp';
let age = '18';

let str = "${name}今年${age}岁"; // 实现模板字符串

let res = str.replace(/\$\{([\s\S]+?)\}/g, (...args) => {
  return eval(args[1]);
});
// console.log(res);

// 使用ejs模板
/* 
  原理：
    1. with语法
    2. new Function()
 */
let obj = {
  name: 'shenjp'
}
with(obj) { // 声明当前作用域下的this
  console.log(name);
}

let fn = new Function(`let str = 123; return str;`); // 可以解析字符串并执行
console.log(fn());
