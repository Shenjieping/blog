// core 掌握node中的全局对象，global
// 全局对象：在文件中不用申明就可以直接使用的
/* 
  默认文件中的this不是global
  使用var声明的变量也不会挂载到global中
 */
/*
console.log(this === global)
var a = 1;
console.log(global.a); // undefined
*/
/* 
  process 进程对象
  Buffer 缓存区，内存
  clearInterval，clearTimeout，setInterval，setTimeout
  setImmediate，clearImmediate 是一个宏任务
 */
// console.log(Object.keys(global));
// console.dir(global, {showHidden: true})

// 1. process 代表当前运行的进程


/* 
  platform 平台 mac/window/linux...
  argv  用户执行node时传递的参数
  cwd 代表用户执行node时所在的目录 current working directory
  nextTick 下一队列 是一个微任务
  env 环境变量
 */


// console.log(process.platform); // mac -> darwin
// console.log(process.argv.slice(2)); // 放在数组中

// 方法1. 拿到获取的参数 node core.js -p 3000 -c webpack.js
/*
let res = process.argv.slice(2).reduce((mome, current, index, arr) => {
  if (current.startsWith('-')) {
    mome[current.replace(/-/g, '')] = arr[index + 1] || true;
  }
  return mome;
}, {});
console.log(res); // { p: '3000', c: 'webpack' }
*/

// 方法2. commander 命令行管家
/*
let program = require('commander');
program.version('1.0.0', '-v, --version');
program.parse(process.argv);
*/


// 2. env 当前运行时的环境变量
// console.log(process.env); // 不同的环境设置的方式不同，mac-> export  window->set
// cross-env 包，可以设置不同平台的环境变量


// 3. cwd 代表用户执行的目录
// console.log(process.cwd()); // 是一个绝对路径

// 4. nextTick 下一队列，给不同的方法都设置了不同的队列（执行结果和浏览器一致）

/* setTimeout(() => {
  console.log('timeout')
});

setImmediate(() => {
  console.log('立即')
});

// 这两个的执行顺序不确定，setTimeout 的默认时间是2-4ms
https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
 */

/* Promise.resolve().then(() => {
  console.log('then');
})

process.nextTick(() => {
  console.log('tick') // 更快
}) */

/* 
  默认会先执行主栈中的代码，执行后，会清空微任务，和浏览器一样，每次执行宏任务都会清空微任务，进入的eventLoop 开始循环，
  会先检测事件是否到达，如果没到达，会向下切换，走到poll阶段，如果用户有绑定 setImmediate 会执行setImmediate，
  当一轮执行后，会再次进入循环，如果时间还没到，就进入到poll，会在poll阶段进行等待，等待时间到达
 */

const fs = require('fs');
fs.readFile('node.js', 'utf-8', function() {
  setTimeout(() => {
    console.log('timeout');
  });
  setImmediate(() => {
    console.log('immediate');
  })
});
/* 
  根据事件环的的执行顺序，读写文件属于poll 阶段，poll执行完之后的下一阶段是先执行check阶段。所以此时的immediate一定会先执行
 */


/* 
  如果是node 10 之前的版本，浏览器是 1 个宏任务执行完就清空微任务，node中是清空完整个队列之后再清空微任务
 */

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  })
}, 0);
setTimeout(() => {
  console.log(1);
}, 0);
// 在新版本中node和浏览器一样，顺序是 2 3 1 ，老版本中就是 2 1 3


