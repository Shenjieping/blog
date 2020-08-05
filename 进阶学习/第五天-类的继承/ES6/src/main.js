// 装饰器
@log
@log1('1111')
class Animal {
  static a = 1; // es7语法，给类增加一个属性

  @readonly b = 1; // 不是给原型增加

  @before say() {
    console.log('say');
  }
}
let animal = new Animal();
console.log(Animal.a);
// 如何查看一个属性是实例上的还是原型上的属性
console.log(animal.hasOwnProperty('b'));

// 装饰器 @ 
// @ 可以装饰类，类中的属性和方法
function log(target) {
  // 如果写到类的上面，第一个参数就是当前的类
  // 可以在类上新增一些属性，可以多次装饰
  console.log(target);
}

function log1(value) {
  console.log('给修饰符函数的参数：', value);
  // 需要返回一个函数，供修饰符调用
  return function (target) {
    console.log('修饰函数：：', target);
  }
}

function readonly(proto, key, descriptor) {
  // 如果修饰的不是类，参数是类的原型
  // descriptor 属性描述器
  console.log('属性：', proto, key, descriptor)
  descriptor.writable = false;
}
// animal.b = 100; // Uncaught TypeError: Cannot assign to read only property 'b' of object

function before (proto, key, descriptor) {
  console.log('类的方法：：', proto, key, descriptor)
  let old = descriptor.value; // 先存起来
  descriptor.value = function() {
    console.log('before');
    old.call(proto);
  }
}
animal.say();