## Function.prototype

- call: `[function].call([context], params1, params2...)`，function 作为Function的内置的一个实例，可以基于__proto__找到Function.prototype的call方法，并且把找到的call方法执行，在call方法执行的时候，会把function执行，并且把函数的this指向为context，并且把params1, params2...分别传递给函数
- apply：`[function].apply([context], [params1, params2...])` 和call的作用一样，只不过传递给函数的参数，需要已数组的形式传递给apply
- bind：`[function].bind([context], params1, params2...)` 语法和call是一样的，但是作用和call/apply都不大一样，call/apply 是把函数立即执行，并且改变函数中的this指向，而bind是一个预处理的思想，基于bind只是预先把函数中的this指向context，把parmas参数值存储起来，但是函数并没用立即执行 

```js
const body = document.body;
let obj = {
  name: 'shenjp'
};
function func(x, y) {
  console.log(this, x, y);
}
func(10, 20); // window
// obj.func(); // 报错

func.call(obj, 10, 20); // obj, 10, 20
func.apply(obj, [10, 20]); // obj, 10, 20

func.call(); // 第一个参数不传，在非严格模式下，让this指向window，严格模式下，传什么就是什么，不传就是undefined
func.call(null, 10, 20); // 传null 非严格模式下是window，严格模式下是 null
function(11) // 非严格模式下是 Number(11); 会转为对象类型的值，严格模式下是 11

body.onclick = func; // 把func函数本身绑定给body的onclick事件行为，此时func并没用执行，只有触发body的click 事件，方法才会执行
body.onclick = func(10, 20); // 先把func执行，把方法执行的结果作为返回值绑定给body的click事件

// 把func函数绑定给body的click事件，要求当触发body的click后，执行func 但此时需要让func中的this改变为obj，并且给func传递10, 20
body.onclick = func.bind(obj, 10, 20);
// 在没有bind的情况下, 因为bind不兼容IE6~8
body.onclick = function() {
  func.call(obj, 10, 20);
}
```

## bind的原理

```js
const body = document.body;
let obj = {
  name: 'shenjp'
};
function func(x, y) {
  console.log(this, x, y);
}

Function.prototype.bind = function(context = window, ...params) {
  // this => func
  let _this = this;
  return function anonymouse(...inner) { // 返回一个匿名函数给事件绑定
    // this => body
    // _this.call(context, ...params, ...inner);
    _this.apply(context, [...params, ...inner])
  }
}

body.onclick = func.bind(obj, 10, 20);

// bind的内部机制就是利用闭包（柯理化函数思想）预先把需要执行的函数以及要改变的this，再以及后需要给函数传递的参数信息，都保存到不销毁的上下文中，后需要使用的时候直接拿来用，这就是经典的预先存储思想
```