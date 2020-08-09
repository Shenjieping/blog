// ejs 的使用
// 原理：with 语法， new Function
/* 
let obj = {
  name: 'shenjp'
};
with(obj) { // 声明一个当前作用域下的this
  console.log(name);
}

let fn = new Function(`let str = 123; return str;`); // 将字符串转为函数并可以执行
console.log(fn());
*/

let fs = require('fs');
let path = require('path');
let ejs = require('ejs');

let resolve = (dir) => {
  return path.resolve(__dirname, dir);
}

let str = fs.readFileSync(resolve('./ejs.html'), 'utf8');
// 实现ejs的替换功能
function render(str, renderObj) {
  /*
  return str.replace(/<%=([\s\S]+?)%>/g, (...args) => { // 简单替换
    return renderObj[args[1].trim()];
  })
  */
 /* 
  处理循环语法的思路：
    将html和js语法用字符串拼接起来
  */
  let head = 'let str = ""; with(name){\n\rstr = `';
  str = str.replace(/<%=([\s\S]+?)%>/g, (...args) => { // 简单替换
    return '${' + args[1] + '}';
  })
  let content = str.replace(/<%([\s\S]+?)%>/g, (...args) => {
    return '`\r\n' + args[1] + '\r\nstr += `';
  });
  let tail = '`\n\r}\n\rreturn str;'
  let res = head + content + tail;
  return new Function('name', res)(renderObj);
}

let renderStr = render(str, {name: [1, 2, 3, 4]});
console.log(renderStr); // 将模板中的变量替换


