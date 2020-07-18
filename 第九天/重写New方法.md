## 编写 _new 方法实现内置的 new xxx 具备的功能

```js
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function() {
  console.log('wawawawa');
}
Dog.prototype.sayName = function() {
  console.log('my name is ' + this.name);
}

/**
 *
  */
function _new(Func, ...args) {
  /* 
    1. 创建一个实例对象，是一个对象，对象.__proto__ === 类.prototype
    2. 当做普通函数执行，this执行实例对象
    3. 看一下函数是否存在返回值，不存在或者返回的是基本数据类型，则返回当前实例，如果返回的是引用类型，则返回当前引用对象
   */
  // 1. 创建一个实例对象，是一个对象，对象.__proto__ === 类.prototype
  // let obj = {};
  // obj.__proto__ = Func.prototype; // __proto__ 在IE中不能使用
  /* 
    Object.create(xxx) 创建一个空对象，并且会把传入 xx 作为当前对象的原型链指向
   */
  let obj = Object.create(Func.prototype); // 创建 Func的空实例对象

  // 2. 当做普通函数执行，this指向实例对象
  let result = Func.call(obj, ...args);

  // 3. 看一下函数是否存在返回值，不存在或者返回的是基本数据类型，则返回当前实例，如果返回的是引用类型，则返回当前引用对象
  if (result !== null && /^(object|function)$/.test(typeof result)) {
    return result;
  }
  return obj;

  // 或者
  return result instanceof Object ? result : obj;
}

let sanmao = _new(Dog, '三毛');
sanmao.bark(); // wawawawa
sanmao.sayName(); // my name is 三毛
console.log(sanmao instanceof Dog); // true

```

```js
// Object.create 在低版本的浏览器中不兼容
// 重写一个Object.create 方法
// 创建某个类的空实例
Object.create = function create(prototype) {
  function Func() {};
  Func.prototype = prototype; // 原型的重定向
  return new Func();
}
```