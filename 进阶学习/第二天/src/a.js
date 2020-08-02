/*
export let a = 1; // 表示把 a 导出
export let b = 2;
*/

let a = 1;
let b = 2;

export { // 这不是一个对象，意思就是导出一个列表，导出的是变量
  a,
  b
}

// 默认导出，
export default {a: 3, b: 4} // 他只是导出的值

/* 
  export 和 export default的区别
    1. export 导出的是变量，export default 导出的是具体的值
    2. export 可以导出多次，export default 只能导出一个值
 */