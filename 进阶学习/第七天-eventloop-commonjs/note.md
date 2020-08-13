# 回顾

## 1. 关于函数

- 什么是高阶函数
  
  把函数作为参数，或者返回值是函数

- 柯理化函数（函数更加具体，核心像bind，可以保留参数） =》 思考：反柯理化，让函数的调用范围扩大

  Object.prototype.toString.call();

- AOP(装饰器)  将函数进行包装（代理模式），before after  @装饰器  数组的方法劫持

  AOP（面向切面变成），主要的作用就是把一些跟核心业务逻辑模块无关的功能进行抽离出来，其实就是给原函数增加了一层，不用管函数内部的实现

- 发布订阅模式，promise 可以then多次，观察者模式（event on emit）

  一种一对多的关系，发布者和订阅者是否有关联，观察者模式基于发布订阅模式

## 2. promise

- promise 中链式调用如何中断
- promise.finally 原理
- promise有哪些优缺点
  - 优点：可以解决异步并发问题，promise.all， 链式调用
  - 缺点：还是基于回调，Promise无法终止，基于Promise封装的fetch 无法中断 xhr.abort()
- promise.race & promise.all 原理
- 如何中断promise -> abort方法
- generator & co
- async + await 语法糖

## 3. ES6

- let & const(1. 没有变量提升 2. 不会污染全局作用域 3. 不能重复声明 4. 拥有自己独立的作用域)
- symbol 第六种基本数据类型，独一无二

```js
// 元编程
let obj = {
  [Symbol.hasInstance]() { // 将原方法进行了改写
    return true;
  },
  [Symbol.toPromitive](type) {
    return 100; // 重写方法
  }
};
let a = 'a';

console.log(a instanceof obj); // 正常情况下是报错的
```
- sperad（展开运算符） 深拷贝 数据类型的判断
- set map(WeakMap) 去重（交集，并集，差集）
- defineProperty proxy reflect
- ES6中的模块化（静态导入、动态导入）import export

- ES6 中的类


## 浏览器事件环

- 进程（计算机分配任务和调度任务的最小单位，每个进程互不影响，而且可以协同工作）里面包含线程的，我们写代码的时候都是关注的js执行线程
- 流浪器事件环  主线程只有一个

