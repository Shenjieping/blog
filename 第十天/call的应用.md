## call的实现

```js
Function.prototype.call = function(context, ...params) {
  // 在非严格模式下不传，传null,传undefined 都是window
  context = context || window;
  // 核心原理，给context设置为一个属性名（属性名尽可能保持唯一， 避免这里设置的属性覆盖对象中的结构，例如用 Symbol, 也可以创建一个时间撮），属性值一定是我们要执行的函数（this），处理完之后别忘记把给context设置的属性删除掉
  // 如果context是基本类型的值，是不能设置属性的，这里需要把基本类型的值，修改为引用类型的值
  let type = typeof context;
  if (!/^(object|function)$/.test(type)) {
    if (/^(symbol|bigint)$/.test(type)) {
      context = Object(context);
    } else {
      context = new context.constructor(context);
    }
  }
  let key = Symbol('key');
  context[key] = this;
  let result = context[key](...params);
  delete context[key]; // 用完之后删除
  return result; // 将执行的访问结果返回
}

let obj = {
  name: 'shenjp'
};
function func(x, y) {
  console.log(this, x, y);
}

func.call(obj, 10, 20);
```

```js
/* 
  创建一个值的两种方式：
    一、字面量的方式创建
    二、构造函数的方式创建
  对于引用类型的值来说，两种方式创建的是指没有区别。但是对于值类型，字面量创建的方式创建的是基本类型的值，构造函数创建的是对象类型的值，不管是基本类型的值，还是对象类型的值，都是所属类的实例，都可以调用原型上的方法
  区别就是：基本类型的值无法设置属性，对象类型的值可以设置属性
 */
let num1 = 1;
let obj1 = { a: 1 };
console.log(num1, obj1); // 1 {a: 1}
num1.a = 1;
console.log(num1.a); // undefined // 无法设置

let num2 = new Number(1);
let obj2 = new Object({ a: 1 });
console.log(num2, obj2); // Number {1} {a: 1}
num2.a = 1;
console.log(num2.a); // 2
```

## 阿里面试题

```js
function fn1() {
  console.log(1);
}
function fn2() {
  console.log(2);
}
fn1.call(fn2); // 1
fn1.call.call(fn2); // 2
Function.prototype.call(fn1); //
Function.prototype.call.call(fn1);// 1

/* 
fn1.call(fn2) 把call方法执行
  this => fn1
  context => fn2
  fn2[key] = fn1;
  fn2[key]()
  结果输出1，fn1 中的this指向fn2

fn1.call.call(fn2)
  fn1.call => call函数 最后一个call执行
  this => calss函数
  context => fn2
  fn2.xx = call函数
  fn2.xxx()
  让call函数执行，call函数中的this变成了fn2
  this => fn2
  context => undedined => window
  window.xx = fn2
  window.xx()
  结果输出2，fn2中的this指向window

Function.prototype.call(fn1)
  Function.prototype 是一个匿名空函数
  this => Function.prototype
  context => fn1
  fn1.xx = Function.prototype
  fn1.xx() => 空函数执行后，什么也不会输出

Function.prototype.call.call(fn1);
  Function.prototype.call 是一个call函数，执行的是最后一个call函数
  this => call函数
  context => fn1
  fn1.xxx => call函数
  fn1.xxx();
  让call函数执行，call中的this变为fn1
  第二次：this => fn1
  context => undefined => window
  window.xx = fn1
  window.xx()
  结束输出1，this指向window
 */
```