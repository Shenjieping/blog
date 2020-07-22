1. JS中的数据类型
2. 如何检测数据类型
3. var let const 之间的区别
4. 箭头函数和普通函数的区别
5. == 和 === 的区别
6. 写出下面的答案，为什么
  ```js
  [] == false;
  ![] == false;
  ```
7. 写出下面的运行结果
  ```js
  var a = {n: 1};
  var b = a;
  a.x = a = {n: 2};
  console.log(a.x);
  console.log(b);
  ```
6. 写出下面的执行结果
  ```js
  let arr = ['1.6px', 2, '10px', 21, 11.22];
  arr = arr.map(parseInt);
  ```
7. 数组常用方法
8. 如何判断一个字符串是否是属于某个对象的属性，hasOwnProperty is 两个的区别
9. 谈谈你对闭包的理解，以及在项目中的应用
10. ES5的继承有哪些，和ES6的calss有什么区别
11. 编写queryUrlParams 方法, 至少两种方法
  ```js
  let url = 'http://www.baidu.com?lx=10&name=shenjp#app';
  console.log(url.queryUrlParams('lx')) // 10
  console.log(url.queryUrlParams('name')) // shenjp
  console.log(url.queryUrlParams('_hash')) // app
  ```
12. 编写一个函数实现下面的方法
  ```js
  let res = fn(1, 2)(3); // 6
  ```
11. vue 的响应式原理，vue-router 的原理，两种模式的区别
12. vue3了解吗。谈谈你对vue3的看法
13. 写一个 myNew 方法，实现 new 的功能
  ```js
  function Func(name) {
    this.name = name;
  }
  Dog.prototype.getName() {
    console.log(`my name is ${this.name}`);
  }
  function myNew() {
    // 实现你的代码
  }
  var fun = myNew(Dog, 'shenjp');
  fun.getName(); // my name is shenjp
  ```
14. 输出下面的运行结果
  ```js
  let obj = {
    2: 3,
    3: 4,
    length: 2, // 这里有没有是一个考点
    push: Array.prototype.push
  }
  obj.push(1);
  obj.push(2);
  console.log(obj);
  ```
15. 请用两种方式实现下面的代码
  ```js
  var a = ?;
  if (a == 1 && a == 2 && a == 3) {
    console.log('ok');
  }
  ```
16. 写出下面的执行结果
  ```js
  function Fn(n, m) {
    n = n || 0;
    m = m || 0;
    this.x = n;
    this.y = m;
    this.getX = function() {
      console.log(this.x);
    }
  }
  Fn.prototype.sum = function() {
    console.log(this.x + this.y);
  }
  Fn.prototype = {
    getX: function() {
      this.x += 1;
      console.log(this.x);
    },
    getY: function() {
      this.y += 1;
      console.log(this.y);
    }
  }
  let f1 = new Fn(10, 20);
  let f2 = new Fn;
  console.log(f1.getX === f2.getX);
  console.log(f1.getY === f2.getY);
  console.log(f1.__proto__.getY === Fn.prototype.getY);
  console.log(Fn.prototype.getX === f2.getX);
  console.log(f1.constructor);
  f1.getX();
  Fn.prototype.getX();
  f2.getY();
  Fn.prototype.getY();
  f1.sum();
  ```
17. 写出下面的结果
  ```js
  function fn1() {
    console.log(1);
  }
  function fn2() {
    console.log(2);
  }
  fn1.call(fn2);
  fn1.call.call(fn2);
  Function.prototype.call(fn1);
  Function.prototype.call.call(fn1);
  ```
18. 写出下面的执行结果

  ```js
  function Foo() {
    getName = function() {
      console.log(1);
    }
    return this;
  }
  Foo.getName = function() {
    console.log(2);
  }
  Foo.prototype.getName = function() {
    console.log(3);
  }
  var getName = function() {
    console.log(4);
  }
  function getName() {
    console.log(5);
  }
  Foo.getName();
  getName();
  Foo().getName();
  getName();
  new Foo.getName();
  new Foo().getName();
  new new Foo().getName();
  ```
