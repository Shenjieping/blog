/* 
  模块化解决的问题：
    命名冲突，之前是靠命名空间，采用自执行函数的方式
    解决代码的高内聚低耦合

  cmd => seajs  amd => require.js
  umd 统一模块

  node模块 commonjs规范  使用一个模块 require 给别人用 module.exports
  es6模块规范 esModule umd 使用模块 import，给别人用 export
 */

// 如果通过相对路劲引用，表示自定义的模块
// import 特点，可以变量提升，在定义之前可以直接使用，不能放在作用域下，只能放在顶层
// import * as obj from './a.js'
// import obj, {a, b} from './a.js'; // 默认的可以单独写，剩下的采用结构
import {a, b, default as obj} from './a.js'; // default是关键字，重命名使用 as

/*
// 这样引用会报错
{
  import { a } from './a.js'
}
*/

console.log(obj, a, b); // 每次拿到的是变量对应的值

/* 
  默认import语法叫静态语法，只能在顶层先声明，再使用
  require 是动态语法
  新的语法 import() 可以实现动态加载。可以拿来做懒加载，返回的是一个Promise
 */
// 点击按钮的时候，动态加载文件,需要配置插件 plugin-syntax-dynamic-import
let btn = document.createElement('button');
btn.innerHTML = 'click me'
btn.onclick = async function() {
  let reslut = await import('./x');
  console.log('...', reslut);
}

document.body.appendChild(btn);