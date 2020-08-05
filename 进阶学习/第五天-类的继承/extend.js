// ES5 的继承
function Animal() {
  this.name = 'name';
}

Animal.prototype.say = function() {
  console.log('say');
}

function Tiger() {
  Animal.call(this); // 调用父类构造函数，改变this指向
}

// 1. 继承实例属性
/*
function Tiger() {
  Animal.call(this); // 调用父类构造函数，改变this指向
}
let tiger = new Tiger();
console.log(tiger.name);
*/

/* 
  每个函数（类）都有prototype，每个人都有__proto__ 指向所属类的原型
 */

/*
let anmial = new Animal();
console.log(anmial.__proto__ === Animal.prototype); // true
console.log(anmial.__proto__.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null，根节点
console.log(Object.__proto__ === Function.prototype); // true,对象的链指向函数的原型
console.log(Function.prototype.__proto__ === Object.prototype); // true
// __ptoto__ 查找属性和方法
console.log(Function.__proto__ === Function.prototype); // true
console.log(Function.__proto__ === Object.__proto__); //true

// constructor 定义在原型上，指向当前的构造函数
console.log(Animal.prototype.constructor); //Animal
*/

// Tiger.prototype = Animal.prototype; // 这个交混合，不叫继承
// 2. 继承公共属性
// Tiger.prototype.__proto__ = Animal.prototype; // 通过原型链继承公共属性
// Tiger.prototype = Object.create(Animal.prototype); // 和上面类似，但是原理不一样
/*
Tiger.prototype = create(Animal.prototype); // 手动实现create
function create(parentPrototype) {
  function Fn() {};
  Fn.prototype = parentPrototype;
  return new Fn();
}
*/
/* 
  IE 低版本游览器不支持 __proto__
  可以使用 Object.setPrototypeOf(Tiger.prototype, Animal.prototype)
 */

let anmial = new Animal();
let tiger = new Tiger();

console.log(tiger.say);

/* 
  ES6的继承，是利用 函数.call() 加上 Object.create 来实现的，也就是 extends 的原理
 */
