// call 的实现
/* 
  1. 改变this指向
  2. 让函数执行
 */

function fn() {
  console.log(this);
}
function fn1() {
  console.log(100);
}
// fn.call.call.call.call(fn1); // 100

/* 
  fn.call 执行，继续找函数中的call方法。直到最后一个才会执行。在找的过程中call中的this会改变成fn1，最后执行的时候就是fn1执行了
  不管多少次 .call，就等于原型上的call方法
  call.call(fn1); 此时call中的this已经改变成了 fn1 
 */

Function.prototype.myCall = function(context, ...args) {
  context = context ? Object(context) : global;
  context.fn = this; // call 的特点就是将自己放到当前对象上，通过对象调用改变this
  let res = context.fn(...args);
  delete context.fn;
  return res;
}

Function.prototype.myApply = function(context, args) {
  context = context ? Object(context) : global;
  context.fn = this; // call 的特点就是将自己放到当前对象上，通过对象调用改变this
  let res = context.fn(...args);
  delete context.fn;
  return res;
}

// fn.myCall.myCall.myCall(fn1);

Function.prototype.myBind = function(context, ...args) {
  let _this = this;
  return function() {
    _this.apply(context);
  }
}

function fn2() {
  console.log(this);
}

let bindFn1 = fn2.bind(1);
let bindFn2 = bindFn1.bind(2); // 第一次执行bind 的时候，this已经保存起来的了。返回的是新的函数，当第二次bind的时候，this还是上一次的，所以多次bind只能指向第一次的函数

bindFn2(); // 多次bind 只能执行一次