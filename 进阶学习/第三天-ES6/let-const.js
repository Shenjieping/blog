/* 
  为什么要有let 和const
    var 缺陷
      1. 会污染全局变量（常见的作用域：window(全局)，function，with）
      2. 变量提升
      3. 可以重复定义
      4. var 不能声明常量
      5. var 默认不会产生作用域

    let优势
      1. 不会污染全局变量
      2. 不存在变量提升
      3. 在同一个作用域下不能被重复定义
 */


/* 
console.log(a);
var a = 1; */

/* 
let a = 10;
{
  // 暂时性死区
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 2;
}
*/